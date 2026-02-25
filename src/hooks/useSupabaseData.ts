'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Category,
  Subcategory,
  Work,
  WorkImage,
  LocalizedCategory,
  LocalizedSubcategory,
  LocalizedWork,
  LocalizedWorkImage,
  WorksFilter,
  DataState
} from '@/types/supabase'

// Simple in-memory cache to prevent duplicate Supabase requests across components
const cache = new Map<string, { data: any; timestamp: number; promise?: Promise<any> }>();
const CACHE_TTL = 60_000; // 60 seconds

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  return null;
}

function setCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

// Dedup in-flight requests
function getInflight(key: string): Promise<any> | null {
  const entry = cache.get(key);
  if (entry?.promise) return entry.promise;
  return null;
}

function setInflight(key: string, promise: Promise<any>) {
  const entry = cache.get(key) || { data: null, timestamp: 0 };
  cache.set(key, { ...entry, promise });
}

function clearInflight(key: string) {
  const entry = cache.get(key);
  if (entry) {
    delete entry.promise;
  }
}

// Утилита локализации полей по текущей локали
const localizeField = (obj: any, baseKey: string, locale: 'ru' | 'ro') => {
  const localizedKey = `${baseKey}_${locale}`
  return obj[localizedKey] ?? obj[baseKey] ?? ''
}

const localizeData = (item: any, locale: 'ru' | 'ro') => {
  const result: any = { ...item }
  // Категории/подкатегории
  if ('name_ru' in item || 'name_ro' in item) {
    result.name = localizeField(item, 'name', locale)
  }
  if ('description_ru' in item || 'description_ro' in item) {
    result.description = localizeField(item, 'description', locale)
  }
  // Работы
  if ('title_ru' in item || 'title_ro' in item) {
    result.title = localizeField(item, 'title', locale)
  }
  if ('short_description_ru' in item || 'short_description_ro' in item) {
    result.short_description = localizeField(item, 'short_description', locale)
  }
  if ('alt_text_ru' in item || 'alt_text_ro' in item) {
    result.alt_text = localizeField(item, 'alt_text', locale)
  }
  return result
}

// Хук для получения категорий
export const useCategories = (locale: 'ru' | 'ro' = 'ru') => {
  const cacheKey = `categories_${locale}`;
  const cached = getCached<LocalizedCategory[]>(cacheKey);

  const [state, setState] = useState<DataState<LocalizedCategory[]>>({
    data: cached,
    isLoading: !cached,
    error: null
  })

  const fetchCategories = useCallback(async (force = false) => {
    if (!force) {
      const hit = getCached<LocalizedCategory[]>(cacheKey);
      if (hit) {
        setState({ data: hit, isLoading: false, error: null });
        return;
      }
    }

    // Dedup in-flight requests
    const inflight = getInflight(cacheKey);
    if (inflight) {
      const result = await inflight;
      setState({ data: result, isLoading: false, error: null });
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: !prev.data, error: null }))

      const promise = (async () => {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });
        if (error) throw error;
        return data?.map((category: Category) =>
          localizeData(category, locale) as LocalizedCategory
        ) || [];
      })();

      setInflight(cacheKey, promise);
      const localizedData = await promise;
      setCache(cacheKey, localizedData);
      clearInflight(cacheKey);

      setState({
        data: localizedData,
        isLoading: false,
        error: null
      })
    } catch (error) {
      clearInflight(cacheKey);
      setState(prev => ({
        data: prev.data,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Ошибка загрузки категорий'
      }))
    }
  }, [locale, cacheKey])

  useEffect(() => {
    if (!cached) fetchCategories();
  }, [fetchCategories, cached])

  return {
    ...state,
    refetch: () => fetchCategories(true)
  }
}

// Хук для получения подкатегорий
export const useSubcategories = (categoryId?: string, locale: 'ru' | 'ro' = 'ru') => {
  const [state, setState] = useState<DataState<LocalizedSubcategory[]>>({
    data: null,
    isLoading: true,
    error: null
  })

  const fetchSubcategories = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      let query = supabase
        .from('subcategories')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }

      const { data, error } = await query

      if (error) throw error

      const localizedData = data?.map((subcategory: Subcategory & { category: Category }) => ({
        ...localizeData(subcategory, locale),
        category: subcategory.category ? localizeData(subcategory.category, locale) as LocalizedCategory : undefined
      } as LocalizedSubcategory)) || []

      setState({
        data: localizedData,
        isLoading: false,
        error: null
      })
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Ошибка загрузки подкатегорий'
      })
    }
  }, [categoryId, locale])

  useEffect(() => {
    fetchSubcategories()
  }, [fetchSubcategories])

  return {
    ...state,
    refetch: fetchSubcategories
  }
}

// Хук для получения работ
export const useWorks = (filter: WorksFilter = {}, locale: 'ru' | 'ro' = 'ru') => {
  // Мемоизируем фильтр для предотвращения бесконечного цикла
  const memoizedFilter = useMemo(() => filter, [
    filter.categoryId,
    filter.subcategoryId,
    filter.isPublished,
    filter.isFeatured,
    filter.limit,
    filter.offset
  ])

  const cacheKey = `works_${locale}_${JSON.stringify(memoizedFilter)}`;
  const cached = getCached<LocalizedWork[]>(cacheKey);

  const [state, setState] = useState<DataState<LocalizedWork[]>>({
    data: cached,
    isLoading: !cached,
    error: null
  })

  const fetchWorks = useCallback(async (force = false) => {
    // Если явно задан лимит 0, возвращаем пустой результат без запроса
    if (memoizedFilter.limit === 0) {
      setState({ data: [], isLoading: false, error: null })
      return
    }

    if (!force) {
      const hit = getCached<LocalizedWork[]>(cacheKey);
      if (hit) {
        setState({ data: hit, isLoading: false, error: null });
        return;
      }
    }

    // Dedup in-flight requests
    const inflight = getInflight(cacheKey);
    if (inflight) {
      const result = await inflight;
      setState({ data: result, isLoading: false, error: null });
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: !prev.data, error: null }))

      const promise = (async () => {
        let query = supabase
          .from('works')
          .select(`
            *,
            category:categories(*),
            subcategory:subcategories(*),
            work_images(*)
          `)
          .eq('is_active', memoizedFilter.isPublished ?? true)
          .order('display_order', { ascending: true })

        if (memoizedFilter.categoryId) {
          query = query.eq('category_id', memoizedFilter.categoryId)
        }
        if (memoizedFilter.subcategoryId) {
          query = query.eq('subcategory_id', memoizedFilter.subcategoryId)
        }
        if (memoizedFilter.isFeatured !== undefined) {
          query = query.eq('is_featured', memoizedFilter.isFeatured)
        }
        if (memoizedFilter.limit !== undefined) {
          query = query.limit(memoizedFilter.limit)
        }
        if (memoizedFilter.offset !== undefined) {
          const start = memoizedFilter.offset
          const end = start + ((memoizedFilter.limit ?? 10) - 1)
          query = query.range(start, end)
        }

        const { data, error } = await query
        if (error) throw error

        return data?.map((work: Work & {
          category: Category,
          subcategory: Subcategory,
          work_images: WorkImage[]
        }) => ({
          ...localizeData(work, locale),
          category: work.category ? localizeData(work.category, locale) as LocalizedCategory : undefined,
          subcategory: work.subcategory ? localizeData(work.subcategory, locale) as LocalizedSubcategory : undefined,
          work_images: work.work_images?.map((image: WorkImage) =>
            localizeData(image, locale) as LocalizedWorkImage
          ) || []
        } as LocalizedWork)) || []
      })();

      setInflight(cacheKey, promise);
      const localizedData = await promise;
      setCache(cacheKey, localizedData);
      clearInflight(cacheKey);

      setState({
        data: localizedData,
        isLoading: false,
        error: null
      })
    } catch (error) {
      clearInflight(cacheKey);
      setState(prev => ({
        data: prev.data,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Ошибка загрузки работ'
      }))
    }
  }, [memoizedFilter, locale, cacheKey])

  useEffect(() => {
    if (!cached) fetchWorks();
  }, [fetchWorks, cached])

  return {
    ...state,
    refetch: () => fetchWorks(true)
  }
}

// Хук для получения избранных работ
export const useFeaturedWorks = (limit: number = 6, locale: 'ru' | 'ro' = 'ru') => {
  return useWorks({ 
    isFeatured: true, 
    isPublished: true, 
    limit 
  }, locale)
}

// Хук для получения работ по категории
export const useWorksByCategory = (categoryId: string, locale: 'ru' | 'ro' = 'ru') => {
  return useWorks({ 
    categoryId, 
    isPublished: true 
  }, locale)
}

// Хук для получения работ по подкатегории
export const useWorksBySubcategory = (subcategoryId: string, locale: 'ru' | 'ro' = 'ru') => {
  return useWorks({ 
    subcategoryId, 
    isPublished: true 
  }, locale)
}
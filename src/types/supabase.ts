// Типы для данных из Supabase
export interface Category {
  id: string
  name_ru: string
  name_ro: string
  slug: string
  description_ru?: string
  description_ro?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Subcategory {
  id: string
  category_id: string
  name_ru: string
  name_ro: string
  slug: string
  description_ru?: string
  description_ro?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
  // Связанные данные
  category?: Category
}

export interface Work {
  id: string
  category_id: string
  subcategory_id?: string
  title_ru: string
  title_ro: string
  slug: string
  description_ru?: string
  description_ro?: string
  short_description_ru?: string
  short_description_ro?: string
  main_image_url: string
  client_name?: string
  project_date?: string
  tags?: string[]
  is_featured: boolean
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
  // Связанные данные
  category?: Category
  subcategory?: Subcategory
  work_images?: WorkImage[]
}

export interface WorkImage {
  id: string
  work_id: string
  image_url: string
  alt_text_ru?: string
  alt_text_ro?: string
  sort_order: number
  created_at: string
  // Связанные данные
  work?: Work
}

// Типы для API ответов
export interface CategoriesResponse {
  data: Category[] | null
  error: any
}

export interface SubcategoriesResponse {
  data: Subcategory[] | null
  error: any
}

export interface WorksResponse {
  data: Work[] | null
  error: any
}

export interface WorkImagesResponse {
  data: WorkImage[] | null
  error: any
}

// Типы для фильтрации
export interface WorksFilter {
  categoryId?: string
  subcategoryId?: string
  isFeatured?: boolean
  isPublished?: boolean
  limit?: number
  offset?: number
}

// Типы для локализации
export type LocalizedText = {
  ru: string
  ro: string
}

// Утилитарные типы для работы с локализованными данными
export interface LocalizedCategory {
  id: string
  name: string
  slug: string
  description?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
  image_url?: string // Добавляем поле для изображения
}

export interface LocalizedSubcategory {
  id: string
  category_id: string
  name: string
  slug: string
  description?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
  category?: LocalizedCategory
}

export interface LocalizedWork {
  id: string
  category_id: string
  subcategory_id?: string
  title: string
  slug: string
  description?: string
  short_description?: string
  main_image_url: string
  client_name?: string
  project_date?: string
  tags?: string[]
  is_featured: boolean
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
  category?: LocalizedCategory
  subcategory?: LocalizedSubcategory
  work_images?: LocalizedWorkImage[]
}

export interface LocalizedWorkImage {
  id: string
  work_id: string
  image_url: string
  alt_text?: string
  sort_order: number
  created_at: string
  work?: LocalizedWork
}

// Типы для состояний загрузки
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface DataState<T> extends LoadingState {
  data: T | null
}
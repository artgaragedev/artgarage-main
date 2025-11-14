# Настройка Supabase для проекта Art Garage

## 1. Создание проекта в Supabase

1. Перейдите на [supabase.com](https://supabase.com/)
2. Нажмите "Start your project" и войдите в аккаунт (GitHub/Google)
3. Создайте новую организацию или выберите существующую
4. Нажмите "New Project"
5. Заполните данные проекта:
   - **Name**: `art-garage-adv`
   - **Database Password**: создайте надежный пароль (сохраните его!)
   - **Region**: выберите ближайший регион (например, Europe West)
6. Нажмите "Create new project"

## 2. Получение ключей API

После создания проекта:

1. Перейдите в раздел **Settings** → **API**
2. Скопируйте следующие значения:
   - **Project URL** (например: `https://your-project-id.supabase.co`)
   - **anon public** ключ (начинается с `eyJ...`)

## 3. Настройка переменных окружения

1. Скопируйте файл `.env.example` в `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Откройте `.env.local` и замените значения:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

## 4. Использование в коде

Supabase клиент уже настроен в `src/lib/supabase.ts`. Для использования:

```typescript
import { supabase } from '@/lib/supabase'

// Пример использования
const { data, error } = await supabase
  .from('your_table')
  .select('*')
```

## 5. Создание таблиц (опционально)

В Supabase Dashboard:

1. Перейдите в **Table Editor**
2. Нажмите "Create a new table"
3. Создайте необходимые таблицы для вашего проекта

Или используйте SQL Editor для выполнения SQL команд.

## 6. Настройка аутентификации (опционально)

Если планируете использовать аутентификацию:

1. Перейдите в **Authentication** → **Settings**
2. Настройте провайдеров (Email, Google, GitHub и т.д.)
3. Настройте URL для редиректов

## 7. Безопасность

⚠️ **Важно:**
- Никогда не коммитьте файл `.env.local` в Git
- Используйте Row Level Security (RLS) для защиты данных
- Регулярно ротируйте API ключи

## 8. Полезные ссылки

- [Документация Supabase](https://supabase.com/docs)
- [JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## Установленные пакеты

- `@supabase/supabase-js` - JavaScript клиент для Supabase
- `supabase` - CLI для разработки (dev dependency)
# Настройка Supabase для приема заявок

## 1. Создание таблиц в Supabase

Зайдите в SQL Editor вашего Supabase проекта и выполните следующий SQL скрипт:

```sql
-- Создание таблицы для заявок
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы для файлов заявок
CREATE TABLE order_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER,
  file_type VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов для оптимизации
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_files_order_id ON order_files(order_id);

-- Включаем Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_files ENABLE ROW LEVEL SECURITY;

-- Политика: разрешаем INSERT для всех (для формы заказа)
CREATE POLICY "Allow public insert" ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert" ON order_files
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Политика: SELECT только для authenticated пользователей (для админки)
CREATE POLICY "Allow authenticated select" ON orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated select" ON order_files
  FOR SELECT
  TO authenticated
  USING (true);
```

## 2. Создание Storage Bucket для файлов

1. Перейдите в раздел **Storage** в Supabase Dashboard
2. Нажмите **New bucket**
3. Введите название: `order-files`
4. Снимите галочку **Public bucket** (файлы должны быть приватными)
5. Нажмите **Create bucket**

### Настройка политик Storage

Перейдите в SQL Editor и выполните:

```sql
-- Политика: разрешаем загрузку файлов для всех
CREATE POLICY "Allow public upload" ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'order-files');

-- Политика: чтение файлов только для authenticated пользователей
CREATE POLICY "Allow authenticated read" ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'order-files');
```

## 3. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта и добавьте:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Где взять эти значения:
1. Откройте ваш проект в Supabase Dashboard
2. Перейдите в **Settings** → **API**
3. Скопируйте:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** ключ → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. Проверка работы

1. Перезапустите dev сервер: `npm run dev`
2. Откройте сайт и отправьте тестовую заявку через форму
3. Проверьте в Supabase Dashboard → Table Editor → orders, что заявка появилась

## 5. Просмотр заявок в Supabase

Для просмотра всех заявок:

1. Откройте **Table Editor** в Supabase Dashboard
2. Выберите таблицу **orders**
3. Здесь вы увидите все отправленные заявки

Для просмотра прикрепленных файлов:
1. Откройте **Storage** → **order-files**
2. Файлы организованы по папкам с ID заявки

## 6. Настройка уведомлений (опционально)

Для получения уведомлений о новых заявках на email, можно настроить Database Webhooks или использовать Supabase Edge Functions.

### Пример настройки Email уведомлений через Webhook:

1. Перейдите в **Database** → **Webhooks**
2. Создайте новый webhook:
   - **Table**: orders
   - **Events**: INSERT
   - **HTTP URL**: ваш endpoint для обработки (например, используя services как SendGrid, Resend)

Или вы можете использовать Edge Function для отправки email при создании заявки.

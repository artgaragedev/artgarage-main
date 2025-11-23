-- ПРАВИЛЬНАЯ настройка RLS политик для таблицы orders

-- Удаляем все существующие политики
DROP POLICY IF EXISTS "Allow public insert" ON orders;
DROP POLICY IF EXISTS "Allow authenticated select" ON orders;
DROP POLICY IF EXISTS "Allow anon insert" ON orders;
DROP POLICY IF EXISTS "Enable insert for anon users" ON orders;

-- Создаем политику для INSERT для анонимных пользователей (anon role)
-- Это ключевое отличие - используем anon вместо public
CREATE POLICY "Enable insert for anon users" ON orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Политика для SELECT (для просмотра заявок в админке)
CREATE POLICY "Enable read for authenticated users" ON orders
  FOR SELECT
  TO authenticated
  USING (true);

-- Убеждаемся что RLS включен
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- То же самое для order_files
DROP POLICY IF EXISTS "Allow public insert" ON order_files;
DROP POLICY IF EXISTS "Allow authenticated select" ON order_files;
DROP POLICY IF EXISTS "Enable insert for anon users" ON order_files;

CREATE POLICY "Enable insert for anon users" ON order_files
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users" ON order_files
  FOR SELECT
  TO authenticated
  USING (true);

ALTER TABLE order_files ENABLE ROW LEVEL SECURITY;

-- Проверяем политики
SELECT schemaname, tablename, policyname, roles, cmd 
FROM pg_policies 
WHERE tablename IN ('orders', 'order_files');

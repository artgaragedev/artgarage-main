-- Проверяем и создаем политики для таблицы orders

-- Сначала удаляем существующие политики если они есть
DROP POLICY IF EXISTS "Allow public insert" ON orders;
DROP POLICY IF EXISTS "Allow authenticated select" ON orders;

-- Создаем новую политику для INSERT (разрешаем всем)
CREATE POLICY "Allow public insert" ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Создаем политику для SELECT (только для authenticated пользователей)
CREATE POLICY "Allow authenticated select" ON orders
  FOR SELECT
  TO authenticated
  USING (true);

-- То же самое для order_files
DROP POLICY IF EXISTS "Allow public insert" ON order_files;
DROP POLICY IF EXISTS "Allow authenticated select" ON order_files;

CREATE POLICY "Allow public insert" ON order_files
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated select" ON order_files
  FOR SELECT
  TO authenticated
  USING (true);

-- Проверяем что RLS включен
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_files ENABLE ROW LEVEL SECURITY;

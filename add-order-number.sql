-- Добавляем поле для короткого номера заказа
ALTER TABLE orders ADD COLUMN order_number VARCHAR(10) UNIQUE;

-- Создаем последовательность для автоинкремента
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 10000;

-- Функция для генерации номера заказа (формат: 10001, 10002, и т.д.)
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS VARCHAR AS $$
BEGIN
  RETURN LPAD(nextval('order_number_seq')::TEXT, 5, '0');
END;
$$ LANGUAGE plpgsql;

-- Триггер для автоматической генерации номера заказа при создании
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Обновляем существующие записи (если есть)
UPDATE orders SET order_number = generate_order_number() WHERE order_number IS NULL;

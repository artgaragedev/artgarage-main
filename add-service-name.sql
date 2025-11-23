-- Добавляем поле service_name в таблицу orders
-- Это поле будет хранить информацию о том, с какой услуги была отправлена заявка

ALTER TABLE orders ADD COLUMN IF NOT EXISTS service_name TEXT;

-- Добавляем комментарий для документации
COMMENT ON COLUMN orders.service_name IS 'Название услуги, с которой была отправлена заявка';

-- Создаем таблицу для контактных форм
CREATE TABLE IF NOT EXISTS contact_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Добавляем индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS contact_forms_created_at_idx ON contact_forms(created_at DESC);
CREATE INDEX IF NOT EXISTS contact_forms_email_idx ON contact_forms(email);

-- Включаем Row Level Security
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

-- Политика: анонимные пользователи могут только вставлять данные
CREATE POLICY "Anyone can insert contact forms" ON contact_forms
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Политика: только аутентифицированные пользователи могут читать
CREATE POLICY "Authenticated users can read contact forms" ON contact_forms
  FOR SELECT
  TO authenticated
  USING (true);

-- Комментарии для документации
COMMENT ON TABLE contact_forms IS 'Таблица для хранения сообщений из контактной формы';
COMMENT ON COLUMN contact_forms.id IS 'Уникальный идентификатор сообщения';
COMMENT ON COLUMN contact_forms.name IS 'Имя отправителя';
COMMENT ON COLUMN contact_forms.email IS 'Email отправителя';
COMMENT ON COLUMN contact_forms.message IS 'Текст сообщения';
COMMENT ON COLUMN contact_forms.created_at IS 'Дата и время создания сообщения';

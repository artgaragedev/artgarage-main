-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_ru VARCHAR(255) NOT NULL,
    name_ro VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    image_url VARCHAR(500),
    description_ru TEXT,
    description_ro TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subcategories table
CREATE TABLE subcategories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name_ru VARCHAR(255) NOT NULL,
    name_ro VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description_ru TEXT,
    description_ro TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(category_id, slug)
);

-- Create works table
CREATE TABLE works (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    subcategory_id UUID REFERENCES subcategories(id) ON DELETE SET NULL,
    title_ru VARCHAR(255) NOT NULL,
    title_ro VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description_ru TEXT,
    description_ro TEXT,
    main_image_url VARCHAR(500),
    client_name VARCHAR(255),
    project_date DATE,
    project_url VARCHAR(500),
    tags TEXT[], -- Array of tags
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create work_images table for additional images
CREATE TABLE work_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text_ru VARCHAR(255),
    alt_text_ro VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_subcategories_category ON subcategories(category_id);
CREATE INDEX idx_subcategories_slug ON subcategories(category_id, slug);
CREATE INDEX idx_works_category ON works(category_id);
CREATE INDEX idx_works_subcategory ON works(subcategory_id);
CREATE INDEX idx_works_slug ON works(slug);
CREATE INDEX idx_works_featured ON works(is_featured);
CREATE INDEX idx_works_active ON works(is_active);
CREATE INDEX idx_work_images_work ON work_images(work_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subcategories_updated_at BEFORE UPDATE ON subcategories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_works_updated_at BEFORE UPDATE ON works FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert categories with data from CasesSection.tsx
INSERT INTO categories (name_ru, name_ro, slug, image_url, display_order) VALUES
('Наружная реклама', 'Publicitate exterioară', 'naruzhnaya-reklama', '/Services/outdoor-advertising.jpg', 1),
('Интерьерная реклама', 'Publicitate interioară', 'interiernaya-reklama', '/Services/interior-advertising.jpg', 2),
('POS материалы', 'Materiale POS', 'pos-materialy', '/Services/POSM-materialy.jpg', 3),
('Полиграфические материалы', 'Materiale poligrafice', 'poligraficheskie-materialy', '/Services/printing-materials.jpg', 4),
('Инсталляции', 'Instalații', 'installyacii', '/Services/installations.jpg', 5),
('Фотозона', 'Zona foto', 'fotozona', '/Services/photo-zone.jpg', 6),
('Экспо стенды', 'Standuri expo', 'ekspo-stendy', '/Services/expo-stands.jpg', 7),
('Корпоративные подарки', 'Cadouri corporative', 'korporativnye-podarki', '/Services/corporate-gifts.jpg', 8),
('Трофеи', 'Trofee', 'trofei', '/Services/trophies.jpg', 9),
('Указатели', 'Indicatoare', 'ukazateli', '/Services/signs.jpg', 10),
('Флаги', 'Steaguri', 'flagi', '/Services/flags.jpg', 11),
('Дизайн 2D/3D', 'Design 2D/3D', 'dizain-2d-3d', '/Services/milling-or-laser.jpg', 12);

-- Insert subcategories for "Наружная реклама"
INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Все', 'Toate', 'vse', 0 FROM categories WHERE slug = 'naruzhnaya-reklama';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Объемные буквы', 'Litere volumetrice', 'obemnye-bukvy', 1 FROM categories WHERE slug = 'naruzhnaya-reklama';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Псевдообъемные буквы', 'Litere pseudo-volumetrice', 'psevdoobemnye-bukvy', 2 FROM categories WHERE slug = 'naruzhnaya-reklama';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Lightbox', 'Lightbox', 'lightbox', 3 FROM categories WHERE slug = 'naruzhnaya-reklama';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Тотем', 'Totem', 'totem', 4 FROM categories WHERE slug = 'naruzhnaya-reklama';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Брендинг авто', 'Branding auto', 'brending-avto', 5 FROM categories WHERE slug = 'naruzhnaya-reklama';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Оклейка окон', 'Aplicare ferestre', 'okleika-okon', 6 FROM categories WHERE slug = 'naruzhnaya-reklama';

-- Insert subcategories for "Интерьерная реклама"
INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Все', 'Toate', 'vse', 0 FROM categories WHERE slug = 'interiernaya-reklama';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Объемные буквы', 'Litere volumetrice', 'obemnye-bukvy', 1 FROM categories WHERE slug = 'interiernaya-reklama';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Псевдообъемные буквы', 'Litere pseudo-volumetrice', 'psevdoobemnye-bukvy', 2 FROM categories WHERE slug = 'interiernaya-reklama';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Lightbox', 'Lightbox', 'lightbox', 3 FROM categories WHERE slug = 'interiernaya-reklama';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Оклейка окон', 'Aplicare ferestre', 'okleika-okon', 4 FROM categories WHERE slug = 'interiernaya-reklama';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Таблички', 'Plăcuțe', 'tablichki', 5 FROM categories WHERE slug = 'interiernaya-reklama';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Текстильный баннер', 'Banner textil', 'tekstilnyi-banner', 6 FROM categories WHERE slug = 'interiernaya-reklama';

-- Insert subcategories for "POS материалы"
INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Все', 'Toate', 'vse', 0 FROM categories WHERE slug = 'pos-materialy';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Брендированные аксессуары', 'Accesorii branduite', 'brendirovannye-aksessuary', 1 FROM categories WHERE slug = 'pos-materialy';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Информативные панно', 'Panouri informative', 'informativnye-panno', 2 FROM categories WHERE slug = 'pos-materialy';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Ростовая фигура', 'Figură în mărime naturală', 'rostovaya-figura', 3 FROM categories WHERE slug = 'pos-materialy';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Подставки / Холдеры', 'Suporturi / Holdere', 'podstavki-holdery', 4 FROM categories WHERE slug = 'pos-materialy';

-- Insert subcategories for "Полиграфические материалы"
INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Все', 'Toate', 'vse', 0 FROM categories WHERE slug = 'poligraficheskie-materialy';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Журналы, флаеры, брошюры', 'Reviste, flyere, broșuri', 'zhurnaly-flaery-broshyury', 1 FROM categories WHERE slug = 'poligraficheskie-materialy';

INSERT INTO subcategories (category_id, name_ru, name_ro, slug, display_order) 
SELECT id, 'Наклейки и стикеры', 'Autocolante și stickere', 'nakleiki-stikery', 2 FROM categories WHERE slug = 'poligraficheskie-materialy';
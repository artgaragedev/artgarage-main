-- Insert sample work: "Рекламная вывеска для ресторана"
-- This creates a complete work example with proper category and subcategory relationships

-- Insert the work into works table
INSERT INTO works (
    category_id,
    subcategory_id,
    title_ru,
    title_ro,
    slug,
    description_ru,
    description_ro,
    main_image_url,
    client_name,
    project_date,
    tags,
    is_featured,
    is_active,
    display_order
) 
SELECT 
    c.id as category_id,
    s.id as subcategory_id,
    'Рекламная вывеска для ресторана' as title_ru,
    'Semn publicitar pentru restaurant' as title_ro,
    'reklamnaya-vyveska-dlya-restorana' as slug,
    'Стильная объемная вывеска для ресторана, выполненная из высококачественных материалов. Светодиодная подсветка обеспечивает отличную видимость в темное время суток. Современный дизайн привлекает внимание посетителей и подчеркивает статус заведения.' as description_ru,
    'Semn volumetric elegant pentru restaurant, realizat din materiale de înaltă calitate. Iluminarea LED asigură o vizibilitate excelentă pe timp de noapte. Designul modern atrage atenția vizitatorilor și subliniază statusul localului.' as description_ro,
    '/Services/2W8A3685.jpg' as main_image_url,
    'Ресторан "Вкус жизни"' as client_name,
    '2024-01-15'::date as project_date,
    ARRAY['объемные буквы', 'LED подсветка', 'наружная реклама', 'ресторан', 'вывеска'] as tags,
    true as is_featured,
    true as is_active,
    1 as display_order
FROM categories c
JOIN subcategories s ON s.category_id = c.id
WHERE c.slug = 'naruzhnaya-reklama' 
AND s.slug = 'obemnye-bukvy';

-- Insert additional images for this work (optional)
INSERT INTO work_images (
    work_id,
    image_url,
    alt_text_ru,
    alt_text_ro,
    display_order
)
SELECT 
    w.id as work_id,
    '/Services/2W8A3685.jpg' as image_url,
    'Рекламная вывеска ресторана - вид спереди' as alt_text_ru,
    'Semn publicitar restaurant - vedere frontală' as alt_text_ro,
    1 as display_order
FROM works w
WHERE w.slug = 'reklamnaya-vyveska-dlya-restorana';

-- You can add more images by duplicating the above INSERT with different image URLs and display_order values
-- Example for additional images:
/*
INSERT INTO work_images (work_id, image_url, alt_text_ru, alt_text_ro, display_order)
SELECT w.id, '/Services/restaurant-sign-night.jpg', 'Вывеска в ночное время', 'Semn pe timp de noapte', 2
FROM works w WHERE w.slug = 'reklamnaya-vyveska-dlya-restorana';

INSERT INTO work_images (work_id, image_url, alt_text_ru, alt_text_ro, display_order)
SELECT w.id, '/Services/restaurant-sign-detail.jpg', 'Детали изготовления', 'Detalii de fabricație', 3
FROM works w WHERE w.slug = 'reklamnaya-vyveska-dlya-restorana';
*/
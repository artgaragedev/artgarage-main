-- Insert additional projects per request: LightBox, Pseudo volumetric letters,
-- Textile banner, Expo stands, Installations. Only titles (ru/ro), slug, display_order.

-- LightBox (Outdoor advertising)
WITH ctx_lightbox AS (
  SELECT c.id AS category_id, s.id AS subcategory_id
  FROM categories c
  JOIN subcategories s ON s.category_id = c.id
  WHERE c.slug = 'naruzhnaya-reklama' AND s.slug = 'lightbox'
)
INSERT INTO works (
  category_id,
  subcategory_id,
  title_ru,
  title_ro,
  slug,
  display_order
)
SELECT
  ctx_lightbox.category_id,
  ctx_lightbox.subcategory_id,
  v.title_ru,
  v.title_ro,
  v.slug,
  v.display_order
FROM ctx_lightbox
CROSS JOIN (
  VALUES
  ('Eba', 'Eba', 'lightbox-eba', 1),
  ('Flower Lab', 'Flower Lab', 'lightbox-flower-lab', 2),
  ('L-Textil', 'L-Textil', 'lightbox-l-textil', 3),
  ('President', 'President', 'lightbox-president', 4)
) AS v (
  title_ru,
  title_ro,
  slug,
  display_order
);

-- Pseudo volumetric letters (Outdoor advertising)
WITH ctx_pseudo AS (
  SELECT c.id AS category_id, s.id AS subcategory_id
  FROM categories c
  JOIN subcategories s ON s.category_id = c.id
  WHERE c.slug = 'naruzhnaya-reklama' AND s.slug = 'psevdoobemnye-bukvy'
)
INSERT INTO works (
  category_id,
  subcategory_id,
  title_ru,
  title_ro,
  slug,
  display_order
)
SELECT
  ctx_pseudo.category_id,
  ctx_pseudo.subcategory_id,
  v.title_ru,
  v.title_ro,
  v.slug,
  v.display_order
FROM ctx_pseudo
CROSS JOIN (
  VALUES
  ('Cricova', 'Cricova', 'psevdoobemnye-bukvy-cricova', 1),
  ('Invest Moldova', 'Invest Moldova', 'psevdoobemnye-bukvy-invest-moldova', 2),
  ('Fantastic English', 'Fantastic English', 'psevdoobemnye-bukvy-fantastic-english', 3),
  ('Moldinconbank', 'Moldinconbank', 'psevdoobemnye-bukvy-moldinconbank', 4),
  ('Ms Prod', 'Ms Prod', 'psevdoobemnye-bukvy-ms-prod', 5)
) AS v (
  title_ru,
  title_ro,
  slug,
  display_order
);

-- Textile banner (Interior advertising)
WITH ctx_textile AS (
  SELECT c.id AS category_id, s.id AS subcategory_id
  FROM categories c
  JOIN subcategories s ON s.category_id = c.id
  WHERE c.slug = 'interiernaya-reklama' AND s.slug = 'tekstilnyi-banner'
)
INSERT INTO works (
  category_id,
  subcategory_id,
  title_ru,
  title_ro,
  slug,
  display_order
)
SELECT
  ctx_textile.category_id,
  ctx_textile.subcategory_id,
  v.title_ru,
  v.title_ro,
  v.slug,
  v.display_order
FROM ctx_textile
CROSS JOIN (
  VALUES
  ('Herbalife', 'Herbalife', 'tekstilnyi-banner-herbalife', 1),
  ('MAIB', 'MAIB', 'tekstilnyi-banner-maib', 2),
  ('Oriflame', 'Oriflame', 'tekstilnyi-banner-oriflame', 3),
  ('Wine of Moldova', 'Wine of Moldova', 'tekstilnyi-banner-wine-of-moldova', 4)
) AS v (
  title_ru,
  title_ro,
  slug,
  display_order
);

-- Expo stands (Category only)
WITH ctx_expo AS (
  SELECT c.id AS category_id
  FROM categories c
  WHERE c.slug = 'ekspo-stendy'
)
INSERT INTO works (
  category_id,
  title_ru,
  title_ro,
  slug,
  display_order
)
SELECT
  ctx_expo.category_id,
  v.title_ru,
  v.title_ro,
  v.slug,
  v.display_order
FROM ctx_expo
CROSS JOIN (
  VALUES
  ('8Miliarde', '8Miliarde', 'expo-stands-8miliarde', 1),
  ('Banzai', 'Banzai', 'expo-stands-banzai', 2),
  ('Barbie XO', 'Barbie XO', 'expo-stands-barbie-xo', 3),
  ('Comitetul Olimpic', 'Comitetul Olimpic', 'expo-stands-comitetul-olimpic', 4),
  ('Cricova Mall', 'Cricova Mall', 'expo-stands-cricova-mall', 5),
  ('Evo', 'Evo', 'expo-stands-evo', 6),
  ('GMG Kaufland', 'GMG Kaufland', 'expo-stands-gmg-kaufland', 7),
  ('Hama Pharma', 'Hama Pharma', 'expo-stands-hama-pharma', 8),
  ('IBSA', 'IBSA', 'expo-stands-ibsa', 9),
  ('Kvint', 'Kvint', 'expo-stands-kvint', 10),
  ('Lenovo', 'Lenovo', 'expo-stands-lenovo', 11),
  ('Linella', 'Linella', 'expo-stands-linella', 12),
  ('Mikro Kapital', 'Mikro Kapital', 'expo-stands-mikro-kapital', 13),
  ('Satul German', 'Satul German', 'expo-stands-satul-german', 14)
) AS v (
  title_ru,
  title_ro,
  slug,
  display_order
);

-- Installations (Category only)
WITH ctx_inst AS (
  SELECT c.id AS category_id
  FROM categories c
  WHERE c.slug = 'installyacii'
)
INSERT INTO works (
  category_id,
  title_ru,
  title_ro,
  slug,
  display_order
)
SELECT
  ctx_inst.category_id,
  v.title_ru,
  v.title_ro,
  v.slug,
  v.display_order
FROM ctx_inst
CROSS JOIN (
  VALUES
  ('Bliss', 'Bliss', 'installyacii-bliss', 1),
  ('Cricova', 'Cricova', 'installyacii-cricova', 2),
  ('Maib', 'Maib', 'installyacii-maib', 3),
  ('Maib', 'Maib', 'installyacii-maib-2', 4)
) AS v (
  title_ru,
  title_ro,
  slug,
  display_order
);
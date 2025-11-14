-- Insert works with only titles (no descriptions), per request
WITH ctx AS (
  SELECT c.id AS category_id, s.id AS subcategory_id
  FROM categories c
  JOIN subcategories s ON s.category_id = c.id
  WHERE c.slug = 'naruzhnaya-reklama' AND s.slug = 'obemnye-bukvy'
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
  ctx.category_id,
  ctx.subcategory_id,
  v.title_ru,
  v.title_ro,
  v.slug,
  v.display_order
FROM ctx
CROSS JOIN (
  VALUES
  ('AIPA', 'AIPA', 'obemnye-bukvy-aipa', 1),
  ('Astra-K', 'Astra-K', 'obemnye-bukvy-astra-k', 2),
  ('Daac', 'Daac', 'obemnye-bukvy-daac', 3),
  ('Decoprim', 'Decoprim', 'obemnye-bukvy-decoprim', 4),
  ('Donaris', 'Donaris', 'obemnye-bukvy-donaris', 5),
  ('EBA', 'EBA', 'obemnye-bukvy-eba', 6),
  ('Edenred', 'Edenred', 'obemnye-bukvy-edenred', 7),
  ('Herbalife', 'Herbalife', 'obemnye-bukvy-herbalife', 8),
  ('Kaufland', 'Kaufland', 'obemnye-bukvy-kaufland', 9),
  ('MBW', 'MBW', 'obemnye-bukvy-mbw', 10),
  ('Medexcom', 'Medexcom', 'obemnye-bukvy-medexcom', 11),
  ('Plai', 'Plai', 'obemnye-bukvy-plai', 12),
  ('Preva', 'Preva', 'obemnye-bukvy-preva', 13),
  ('Smartdata', 'Smartdata', 'obemnye-bukvy-smartdata', 14)
) AS v (
  title_ru,
  title_ro,
  slug,
  display_order
);
-- Обновляем пути к изображениям категорий после переименования файлов
UPDATE categories SET image_url = '/Services/outdoor-advertising.jpg' WHERE slug = 'naruzhnaya-reklama';
UPDATE categories SET image_url = '/Services/interior-advertising.jpg' WHERE slug = 'interiernaya-reklama';
UPDATE categories SET image_url = '/Services/POSM-materialy.jpg' WHERE slug = 'pos-materialy';
UPDATE categories SET image_url = '/Services/printing-materials.jpg' WHERE slug = 'poligraficheskie-materialy';
UPDATE categories SET image_url = '/Services/installations.jpg' WHERE slug = 'installyacii';
UPDATE categories SET image_url = '/Services/photo-zone.jpg' WHERE slug = 'fotozona';
UPDATE categories SET image_url = '/Services/expo-stands.jpg' WHERE slug = 'ekspo-stendy';
UPDATE categories SET image_url = '/Services/corporate-gifts.jpg' WHERE slug = 'korporativnye-podarki';
UPDATE categories SET image_url = '/Services/trophies.jpg' WHERE slug = 'trofei';
UPDATE categories SET image_url = '/Services/signs.jpg' WHERE slug = 'ukazateli';
UPDATE categories SET image_url = '/Services/flags.jpg' WHERE slug = 'flagi';
UPDATE categories SET image_url = '/Services/milling-or-laser.jpg' WHERE slug = 'dizain-2d-3d';
-- Enable Row Level Security on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_images ENABLE ROW LEVEL SECURITY;

-- Create policies for categories table
-- Allow public read access to active categories
CREATE POLICY "Allow public read access to categories"
ON categories FOR SELECT
TO public
USING (is_active = true);

-- Allow authenticated users to read all categories
CREATE POLICY "Allow authenticated read access to all categories"
ON categories FOR SELECT
TO authenticated
USING (true);

-- Create policies for subcategories table
-- Allow public read access to active subcategories
CREATE POLICY "Allow public read access to subcategories"
ON subcategories FOR SELECT
TO public
USING (is_active = true);

-- Allow authenticated users to read all subcategories
CREATE POLICY "Allow authenticated read access to all subcategories"
ON subcategories FOR SELECT
TO authenticated
USING (true);

-- Create policies for works table
-- Allow public read access to active works
CREATE POLICY "Allow public read access to works"
ON works FOR SELECT
TO public
USING (is_active = true);

-- Allow authenticated users to read all works
CREATE POLICY "Allow authenticated read access to all works"
ON works FOR SELECT
TO authenticated
USING (true);

-- Create policies for work_images table
-- Allow public read access to work images
CREATE POLICY "Allow public read access to work_images"
ON work_images FOR SELECT
TO public
USING (true);

-- Allow authenticated users to read all work images
CREATE POLICY "Allow authenticated read access to all work_images"
ON work_images FOR SELECT
TO authenticated
USING (true);

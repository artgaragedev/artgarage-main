'use server';

import { supabaseAdmin } from '@/lib/supabase';

export async function fixImagePaths() {
  try {
    const updates = [
      { slug: 'naruzhnaya-reklama', image_url: '/Services/outdoor-advertising.jpg' },
      { slug: 'interiernaya-reklama', image_url: '/Services/interior-advertising.jpg' },
      { slug: 'pos-materialy', image_url: '/Services/POSM-materialy.jpg' },
      { slug: 'poligraficheskie-materialy', image_url: '/Services/printing-materials.jpg' },
      { slug: 'installyacii', image_url: '/Services/installations.jpg' },
      { slug: 'fotozona', image_url: '/Services/photo-zone.jpg' },
      { slug: 'ekspo-stendy', image_url: '/Services/expo-stands.jpg' },
      { slug: 'korporativnye-podarki', image_url: '/Services/corporate-gifts.jpg' },
      { slug: 'trofei', image_url: '/Services/trophies.jpg' },
      { slug: 'ukazateli', image_url: '/Services/signs.jpg' },
      { slug: 'flagi', image_url: '/Services/flags.jpg' },
      { slug: 'dizain-2d-3d', image_url: '/Services/milling-or-laser.jpg' }
    ];

    const results = [];

    for (const update of updates) {
      const { error, data } = await supabaseAdmin
        .from('categories')
        .update({ image_url: update.image_url })
        .eq('slug', update.slug)
        .select();

      if (error) {
        console.error(`Error updating ${update.slug}:`, error);
        results.push({ slug: update.slug, success: false, error: error.message });
      } else {
        console.log(`Updated ${update.slug} with new image path`);
        results.push({ slug: update.slug, success: true, data });
      }
    }

    return { success: true, results };
  } catch (error) {
    console.error('Error fixing image paths:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

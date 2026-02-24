import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Разрешаем загрузку изображений с Supabase Storage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).hostname : undefined

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure the workspace root is this project directory
    root: __dirname
  },
  // Настройки для правильной обработки кодировки
  serverExternalPackages: ['@supabase/supabase-js'],
  // Настройки изображений для внешних хостов
  images: {
    unoptimized: true,
    remotePatterns: supabaseHost ? [
      {
        protocol: 'https',
        hostname: supabaseHost,
        port: '',
        pathname: '/storage/v1/object/public/**'
      }
    ] : []
  },
  // Настройки для обработки UTF-8
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  }
};

export default withNextIntl(nextConfig);

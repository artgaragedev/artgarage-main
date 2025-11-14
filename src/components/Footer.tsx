'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  
  return (
    <footer className="bg-background border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h3 className="text-lg font-semibold">Art Garage</h3>
            <p className="text-sm text-muted-foreground max-w-md text-center md:text-left">
              {t('description')}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-2">
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <a href={`mailto:${t('email')}`} className="hover:text-foreground transition-colors">
                {t('email')}
              </a>
              <a href={`tel:${t('phone')}`} className="hover:text-foreground transition-colors">
                {t('phone')}
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Art Garage. {t('rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
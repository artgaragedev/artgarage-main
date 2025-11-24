'use client';

import { useEffect } from 'react';
import { fixImagePaths } from '@/app/actions/fix-database';

const DatabaseFix = () => {
  useEffect(() => {
    const runFix = async () => {
      const result = await fixImagePaths();

      if (result.success) {
        console.log('Database fix completed successfully');
        console.log('Results:', result.results);
      } else {
        console.error('Database fix failed:', result.error);
      }
    };

    // Выполняем исправление только один раз при загрузке
    runFix();
  }, []);

  // Этот компонент не рендерит ничего
  return null;
};

export default DatabaseFix;
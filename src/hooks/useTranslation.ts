// src/hooks/useTranslation.ts
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export const useTranslation = () => {
  const { currentLanguage, translations } = useSelector(
    (state: RootState) => state.i18n
  );

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[currentLanguage][key] || key;
    
    // Handle parameter replacement
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }
    
    return translation;
  };

  return {
    t,
    currentLanguage,
    isIndonesian: currentLanguage === 'id',
    isEnglish: currentLanguage === 'en',
  };
};
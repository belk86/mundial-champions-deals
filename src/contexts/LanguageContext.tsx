import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from '@/i18n';

type Language = 'en' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Initialize with saved preference or default
    const saved = localStorage.getItem('mundialGear-lang') as Language | null;
    if (saved && ['en', 'ar', 'fr'].includes(saved)) {
      return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Apply language settings on mount
  useEffect(() => {
    setLanguage(language);
  }, []);

  // Persist language preference
  useEffect(() => {
    localStorage.setItem('mundialGear-lang', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      isRTL: language === 'ar' 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from '@/i18n';

type Language = 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('mundialGear-lang') as Language | null;
    if (saved && ['en', 'es', 'fr'].includes(saved)) {
      return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    setLanguage(language);
  }, []);

  useEffect(() => {
    localStorage.setItem('mundialGear-lang', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
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

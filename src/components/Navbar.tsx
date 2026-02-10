import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';


const Navbar = () => {
  const { t } = useTranslation();
  const { language, setLanguage, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems = [
    { key: 'amazon', href: '#products', filter: 'amazon' },
    { key: 'aliexpress', href: '#products', filter: 'aliexpress' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, filter?: string) => {
    e.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
      // Trigger filter change via custom event
      if (filter) {
        window.dispatchEvent(new CustomEvent('filterProducts', { detail: { source: filter } }));
      }
    }
  };

  const languages = [
    { code: 'en' as const, label: 'English', displayCode: 'EN' },
    { code: 'ar' as const, label: 'العربية', displayCode: 'AR' },
    { code: 'fr' as const, label: 'Français', displayCode: 'FR' },
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-wc-navy/90 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - FanEdge text in Amazon Orange with neon glow */}
          <a href="#home" className="flex items-center">
            <span 
              className="text-xl sm:text-2xl md:text-3xl font-extrabold whitespace-nowrap"
              style={{
                color: '#FF9900',
                textShadow: `
                  0 0 8px rgba(255, 153, 0, 0.6),
                  0 0 16px rgba(255, 153, 0, 0.4),
                  0 0 32px rgba(255, 153, 0, 0.3),
                  0 0 48px rgba(255, 153, 0, 0.2)
                `,
              }}
            >
              FanEdge
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.filter)}
                className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium cursor-pointer"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-foreground/80 hover:text-primary hover:bg-secondary"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{currentLang?.displayCode}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </Button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} bg-card border border-border rounded-lg shadow-xl overflow-hidden min-w-[140px]`}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                        className={`w-full px-4 py-2 text-left hover:bg-secondary transition-colors flex items-center justify-between ${language === lang.code ? 'text-primary bg-secondary/50' : 'text-foreground'}`}
                      >
                        <span className="font-english">
                          {lang.label}
                        </span>
                        <span className="text-xs text-muted-foreground">{lang.displayCode}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:bg-secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => { handleNavClick(e, item.filter); setIsMenuOpen(false); }}
                    className="block py-2 px-4 text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer"
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

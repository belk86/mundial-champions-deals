import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import FanEdgeLogo from './FanEdgeLogo';

const FanEdgeNavbar = () => {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems = [
    { key: 'Home', href: '#home' },
    { key: 'Fans Gear', href: '#products' },
    { key: 'Travel Guide', href: '#travel' },
    { key: 'World Cup Schedule', href: '#schedule' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const languages = [
    { code: 'en' as const, label: 'English', displayCode: 'EN' },
    { code: 'ar' as const, label: 'العربية', displayCode: 'AR' },
    { code: 'es' as const, label: 'Español', displayCode: 'ES' },
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <FanEdgeLogo size="sm" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium cursor-pointer"
              >
                {item.key}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Join Now Button */}
            <Button
              className="hidden sm:flex bg-primary hover:bg-purple-dark text-primary-foreground font-semibold glow-purple-sm pulse-button-purple"
            >
              Join Now
            </Button>

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
                        <span className={lang.code === 'ar' ? 'font-arabic' : 'font-english'}>
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
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block py-2 px-4 text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer"
                  >
                    {item.key}
                  </a>
                ))}
                <Button
                  className="w-full mt-4 bg-primary hover:bg-purple-dark text-primary-foreground font-semibold glow-purple-sm"
                >
                  Join Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default FanEdgeNavbar;

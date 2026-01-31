import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, ShoppingBag, Plane, Calendar, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const MobileSidebar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: 'nav.home', href: '#home', icon: Home },
    { key: 'nav.fansGear', href: '#products', icon: ShoppingBag },
    { key: 'nav.travelGuide', href: '#travel', icon: Plane },
    { key: 'nav.schedule', href: '#schedule-section', icon: Calendar },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    if (href === '#home') {
      // Scroll to top for Home
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to specific section
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating Menu Button - Mobile Only */}
      <Button
        variant="default"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:hidden w-14 h-14 rounded-full bg-primary hover:bg-purple-dark shadow-xl"
        style={{ zIndex: 99999 }}
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              style={{ zIndex: 99999 }}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-72 bg-card border-l border-border md:hidden"
              style={{ zIndex: 99999 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-gold" />
                  <span className="font-bold text-foreground">FanEdge</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors text-left"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{t(item.key)}</span>
                  </button>
                ))}
              </nav>

              {/* World Cup 2026 Banner */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
                <div className="p-4 bg-gradient-to-br from-gold/10 to-gold/5 rounded-lg border border-gold/20 text-center">
                  <span className="text-2xl">🏆</span>
                  <p className="text-sm font-semibold text-gold mt-1">World Cup 2026</p>
                  <p className="text-xs text-muted-foreground">USA • Mexico • Canada</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSidebar;

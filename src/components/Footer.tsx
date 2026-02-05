import { useTranslation } from 'react-i18next';
import { Trophy, Mail, MapPin, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'products', href: '#products' },
    { key: 'amazon', href: '#amazon' },
    { key: 'aliexpress', href: '#aliexpress' },
  ];

  const supportLinks = [
    { key: 'faq', href: '#' },
    { key: 'shipping', href: '#' },
    { key: 'returns', href: '#' },
    { key: 'contact', href: '#' },
  ];

  const legalLinks = [
    { key: 'privacy', href: '#' },
    { key: 'terms', href: '#' },
  ];

  return (
    <footer className="bg-championship-black border-t border-border">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-gold" />
              <span className="text-xl font-bold text-gradient-gold">FanZone 26</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold/60" />
                <a href="mailto:belkm757@gmail.com" className="hover:text-gold transition-colors">
                  belkm757@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold/60" />
                <span>Tangier, Morocco</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gold/60" />
                <span>Owner: Med Belk</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors text-sm"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors text-sm"
                  >
                    {t(`footer.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-gold transition-colors text-sm"
                >
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-gold transition-colors text-sm"
                >
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-gold transition-colors text-sm"
                >
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              {t('footer.copyright')}
            </p>
            <p className="text-xs text-muted-foreground/60 text-center max-w-lg">
              {t('footer.affiliate')}
            </p>
          </div>
          
          {/* Amazon Disclaimer */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground/50 text-center max-w-3xl mx-auto leading-relaxed">
              <strong>Amazon Affiliate Disclaimer:</strong> MundialGear 2026 is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, we earn from qualifying purchases. Product prices and availability are subject to change. Any price and availability information displayed on Amazon at the time of purchase will apply.
            </p>
          </div>
          
          {/* System Status */}
          <div className="mt-6 pt-4 border-t border-border/50 text-center">
            <p className="text-xs text-green-400 font-medium flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Tasks Remaining: 0 - System Ready for Launch
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

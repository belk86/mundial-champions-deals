import { Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FanEdgeLogo from './FanEdgeLogo';

const FanEdgeFooter = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { labelKey: 'nav.home', href: '#home' },
    { labelKey: 'nav.fansGear', href: '#products' },
    { labelKey: 'nav.travelGuide', href: '#travel' },
    { labelKey: 'nav.schedule', href: '#schedule' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-background border-t border-border moroccan-pattern">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <FanEdgeLogo size="sm" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary/60" />
                <a href="mailto:medbelk@fanedge.com" className="hover:text-primary transition-colors">
                  medbelk@fanedge.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary/60" />
                <span>USA, Canada & Mexico</span>
              </div>
            </div>
          </div>

          {/* Quick Links - Translated */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Placeholder */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get exclusive deals and World Cup 2026 updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-amazon hover:bg-amazon-dark text-black rounded-lg font-medium text-sm transition-colors">
                {t('nav.joinNow')}
              </button>
            </div>
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
              <strong>Amazon Affiliate Disclaimer:</strong> FanEdge is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, we earn from qualifying purchases.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FanEdgeFooter;

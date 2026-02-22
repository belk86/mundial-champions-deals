import { useState } from 'react';
import { Mail, MapPin, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FanEdgeLogo from './FanEdgeLogo';
import { toast } from 'sonner';

const FanEdgeFooter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    try {
      await fetch('https://formspree.io/f/mgolngpj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setIsSubmitted(true);
      toast.success('Successfully subscribed! Welcome to FanEdge.');
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Fan Gear', href: '#products' },
    { label: 'Travel Guide', href: '#travel' },
    { label: 'Match Schedule', href: '#schedule' },
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

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
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

          {/* Newsletter Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get exclusive deals and World Cup 2026 updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amazon transition-all"
              />
              <button 
                type="submit"
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  isSubmitted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-amazon hover:bg-amazon-dark text-black'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    Success!
                  </>
                ) : (
                  'Join Now'
                )}
              </button>
            </form>
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

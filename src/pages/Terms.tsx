import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      
      <main className="container px-4 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Link to="/">
            <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-gold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-gold" />
            <h1 className="text-3xl md:text-4xl font-bold text-gradient-gold">
              Terms of Service
            </h1>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-8 space-y-6 text-muted-foreground">
            <p className="text-sm">Last updated: January 2025</p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using FanZone 26, you accept and agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Nature of Our Service</h2>
              <p>
                FanZone 26 is an affiliate marketing website that curates and promotes World Cup 2026 
                merchandise from third-party retailers including Amazon and AliExpress. We do not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Sell products directly</li>
                <li>Handle payments or transactions</li>
                <li>Ship or fulfill orders</li>
                <li>Set product prices</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Affiliate Relationship</h2>
              <p>
                We are a participant in the Amazon Services LLC Associates Program and AliExpress 
                Affiliate Program. When you click on product links and complete purchases on 
                third-party websites, we may earn advertising fees or commissions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Product Information</h2>
              <p>
                While we strive to provide accurate product information, prices and availability 
                are subject to change. The information displayed on Amazon or AliExpress at the 
                time of purchase will apply. We are not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Price changes after you click our links</li>
                <li>Product availability or stock levels</li>
                <li>Product quality or authenticity</li>
                <li>Shipping or delivery issues</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Purchases and Returns</h2>
              <p>
                All purchases are made directly through Amazon, AliExpress, or other third-party 
                retailers. Any issues with orders, returns, refunds, or customer service must be 
                handled directly with those retailers according to their respective policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Intellectual Property</h2>
              <p>
                Product images and descriptions may be provided by Amazon and AliExpress through 
                their affiliate programs. Trademarks and brand names belong to their respective owners.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Limitation of Liability</h2>
              <p>
                FanZone 26 and its owner, Med Belk, shall not be liable for any damages arising 
                from your use of our website or purchases made through our affiliate links.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Contact Information</h2>
              <p>
                For questions about these terms, contact us at:{' '}
                <a href="mailto:belkm757@gmail.com" className="text-gold hover:underline">
                  belkm757@gmail.com
                </a>
              </p>
              <p className="text-sm mt-2">
                Owner: Med Belk<br />
                Location: Tangier, Morocco
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;

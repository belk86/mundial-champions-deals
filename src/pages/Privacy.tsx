import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
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
            <Shield className="w-8 h-8 text-gold" />
            <h1 className="text-3xl md:text-4xl font-bold text-gradient-gold">
              Privacy Policy
            </h1>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-8 space-y-6 text-muted-foreground">
            <p className="text-sm">Last updated: January 2025</p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
              <p>
                FanZone 26 ("we," "our," or "us") operates as an affiliate marketing website 
                promoting World Cup 2026 merchandise through Amazon Associates and AliExpress 
                affiliate programs. This Privacy Policy explains how we collect, use, and 
                protect your information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Usage Data:</strong> Pages visited, products clicked, referral sources, and browser information</li>
                <li><strong>Cookies:</strong> We use cookies for analytics and to track affiliate referrals</li>
                <li><strong>Contact Information:</strong> If you contact us via email</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Affiliate Disclosure</h2>
              <p>
                FanZone 26 is a participant in the Amazon Services LLC Associates Program and 
                AliExpress Affiliate Program. When you click on product links and make purchases, 
                we may earn a commission at no additional cost to you. This helps support our 
                website and allows us to continue curating the best World Cup 2026 deals.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To improve our website and user experience</li>
                <li>To track affiliate conversions and commissions</li>
                <li>To respond to your inquiries</li>
                <li>To analyze website traffic and trends</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Third-Party Services</h2>
              <p>
                When you click affiliate links, you will be redirected to third-party websites 
                (Amazon, AliExpress) that have their own privacy policies. We encourage you to 
                review their policies before making purchases.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your information. However, 
                no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Contact Us</h2>
              <p>
                For any privacy-related questions, please contact us at:{' '}
                <a href="mailto:belkm757@gmail.com" className="text-gold hover:underline">
                  belkm757@gmail.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, MapPin, User, MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      
      <main className="container px-4 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Link to="/">
            <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-gold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-6">
            Contact Us
          </h1>
          
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Have questions about World Cup 2026 merchandise or affiliate products? 
              We're here to help! Reach out to us using the contact details below.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href="mailto:medbelk@fanedge.com" 
                    className="text-foreground hover:text-gold transition-colors font-medium"
                  >
                    medbelk@fanedge.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium">Global Support - USA Operations</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Owner</p>
                  <p className="text-foreground font-medium">Med Belk</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="flex items-start gap-3 p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <MessageSquare className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm text-purple-300 font-medium">Response Time</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    We typically respond to inquiries within 24-48 hours during business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

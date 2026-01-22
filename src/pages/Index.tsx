import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DailySecretDeal from '@/components/DailySecretDeal';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import TikaAdvisor from '@/components/TikaAdvisor';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <DailySecretDeal />
      <ProductGrid />
      <Footer />
      <ScrollToTop />
      <TikaAdvisor />
    </div>
  );
};

export default Index;

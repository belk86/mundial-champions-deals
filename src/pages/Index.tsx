import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DailySecretDeal from '@/components/DailySecretDeal';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <DailySecretDeal />
      <ProductGrid />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;

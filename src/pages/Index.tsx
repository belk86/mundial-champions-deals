import FanEdgeNavbar from '@/components/FanEdgeNavbar';
import FanEdgeHero from '@/components/FanEdgeHero';
import FanEdgeProductGrid from '@/components/FanEdgeProductGrid';
import TravelSection from '@/components/TravelSection';
import ScheduleSection from '@/components/ScheduleSection';
import FanEdgeFooter from '@/components/FanEdgeFooter';
import ScrollToTop from '@/components/ScrollToTop';
import TikaAdvisor from '@/components/TikaAdvisor';
import MobileSidebar from '@/components/MobileSidebar';

const Index = () => {
  return (
    <div id="home" className="min-h-screen bg-background moroccan-pattern text-foreground">
      <FanEdgeNavbar />
      <FanEdgeHero />
      <FanEdgeProductGrid />
      <TravelSection />
      <ScheduleSection />
      <FanEdgeFooter />
      <ScrollToTop />
      <TikaAdvisor />
      <MobileSidebar />
    </div>
  );
};

export default Index;

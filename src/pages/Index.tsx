import CountdownTimer from '@/components/CountdownTimer';
import FanEdgeNavbar from '@/components/FanEdgeNavbar';
import FanEdgeHero from '@/components/FanEdgeHero';
import FanEdgeProductGrid from '@/components/FanEdgeProductGrid';
import TravelSection from '@/components/TravelSection';
import ScheduleSection from '@/components/ScheduleSection';
import FanEdgeFooter from '@/components/FanEdgeFooter';
import ScrollToTop from '@/components/ScrollToTop';
import TikaAdvisor from '@/components/TikaAdvisor';

const Index = () => {
  return (
    <div className="min-h-screen bg-background moroccan-pattern">
      <CountdownTimer />
      <FanEdgeNavbar />
      <FanEdgeHero />
      <FanEdgeProductGrid />
      <TravelSection />
      <ScheduleSection />
      <FanEdgeFooter />
      <ScrollToTop />
      <TikaAdvisor />
    </div>
  );
};

export default Index;

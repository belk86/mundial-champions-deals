import { motion } from 'framer-motion';

const AnnouncementBar = () => {
  const marqueeText = "🔥 World Cup 2026 Limited Edition Gear | 🚚 Fast Global Shipping | 🌟 Verified by FanEdge";
  
  return (
    <div className="bg-gold text-primary-foreground py-2 overflow-hidden relative">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-16 text-sm font-semibold"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {/* Duplicate content for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-16">
              <span>{marqueeText}</span>
              <span className="text-primary-foreground/80">|</span>
              <span>🏆 Free Shipping Over $100</span>
              <span className="text-primary-foreground/80">|</span>
              <span>🌍 Ships to 50+ Countries</span>
              <span className="text-primary-foreground/80">|</span>
              <span>🔒 Secure Checkout</span>
              <span className="text-primary-foreground/80">|</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AnnouncementBar;

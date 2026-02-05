import { motion } from 'framer-motion';

interface FanEdgeLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const FanEdgeLogo = ({ size = 'md', showText = true }: FanEdgeLogoProps) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-base',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl',
  };

  const textSizes = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Futuristic Soccer Ball Icon with Neon Blue/Purple Gradient */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${sizeClasses[size]} rounded-xl flex items-center justify-center font-bold text-white relative overflow-hidden`}
        style={{
          background: 'linear-gradient(135deg, #4D9FFF 0%, #9B4DFF 50%, #00D4FF 100%)',
          boxShadow: `
            0 0 15px rgba(77, 159, 255, 0.6),
            0 0 30px rgba(155, 77, 255, 0.4),
            0 0 45px rgba(0, 212, 255, 0.3),
            inset 0 0 15px rgba(255, 255, 255, 0.2)
          `,
          border: '2px solid rgba(77, 159, 255, 0.6)',
        }}
      >
        {/* Hexagon pattern overlay for soccer ball effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='10,0 20,5 20,15 10,20 0,15 0,5' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '12px 12px',
          }}
        />
        <span className="relative z-10 font-extrabold tracking-tight drop-shadow-lg">FE</span>
      </motion.div>
      
      {showText && (
        <motion.span
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`${textSizes[size]} font-extrabold tracking-tight`}
          style={{
            background: 'linear-gradient(135deg, #4D9FFF 0%, #9B4DFF 50%, #00D4FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 8px rgba(77, 159, 255, 0.5)) drop-shadow(0 0 16px rgba(155, 77, 255, 0.3))',
          }}
        >
          FanEdge
        </motion.span>
      )}
    </div>
  );
};

export default FanEdgeLogo;

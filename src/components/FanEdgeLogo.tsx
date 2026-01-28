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
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-amazon via-amazon to-amazon-dark flex items-center justify-center font-bold text-black relative overflow-hidden`}
        style={{
          boxShadow: '0 0 15px rgba(255, 153, 0, 0.5), 0 0 30px rgba(255, 153, 0, 0.3)',
        }}
      >
        <span className="relative z-10 font-extrabold tracking-tight">FE</span>
      </motion.div>
      
      {showText && (
        <motion.span
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`${textSizes[size]} font-extrabold hidden xs:inline sm:inline`}
          style={{
            color: '#FF9900',
            textShadow: `
              0 0 8px rgba(255, 153, 0, 0.6),
              0 0 16px rgba(255, 153, 0, 0.4),
              0 0 32px rgba(255, 153, 0, 0.3),
              0 0 48px rgba(255, 153, 0, 0.2)
            `,
          }}
        >
          FanEdge
        </motion.span>
      )}
    </div>
  );
};

export default FanEdgeLogo;

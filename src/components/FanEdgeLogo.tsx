import { motion } from 'framer-motion';

interface FanEdgeLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const FanEdgeLogo = ({ size = 'md', showText = true }: FanEdgeLogoProps) => {
  const sizeClasses = {
    sm: 'w-9 h-9 text-sm',
    md: 'w-11 h-11 text-base',
    lg: 'w-16 h-16 text-xl',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex items-center gap-3">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-primary via-purple-neon to-purple-dark flex items-center justify-center font-bold text-white glow-purple-intense relative overflow-hidden`}
      >
        {/* Moroccan pattern overlay */}
        <div className="absolute inset-0 moroccan-pattern opacity-30" />
        <span className="relative z-10 font-extrabold tracking-tight">FE</span>
      </motion.div>
      
      {showText && (
        <motion.span
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`${textSizes[size]} font-extrabold`}
          style={{
            color: 'hsl(270, 100%, 70%)',
            textShadow: `
              0 0 5px hsl(270, 100%, 80%),
              0 0 10px hsl(270, 100%, 75%),
              0 0 20px hsl(270, 100%, 70%),
              0 0 40px hsl(270, 100%, 60%),
              0 0 60px hsl(270, 100%, 55%),
              0 0 80px hsl(270, 100%, 50%)
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

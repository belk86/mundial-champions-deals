import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-wc-navy flex items-center justify-center p-4 overflow-hidden relative">
      {/* Football field lines background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-white rounded-full" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-white" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10 max-w-lg"
      >
        {/* Animated Football */}
        <motion.div
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="text-8xl md:text-9xl mb-8"
        >
          ⚽
        </motion.div>

        {/* 404 with stadium styling */}
        <h1 className="text-7xl md:text-9xl font-black mb-4">
          <span className="text-gradient-gold">4</span>
          <span className="text-red-500">0</span>
          <span className="text-gradient-gold">4</span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          🚫 Out of Bounds!
        </h2>

        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Looks like this play went offside. The page you're looking for has been tackled out of existence.
        </p>

        {/* Whistle icon */}
        <div className="mb-8 flex items-center justify-center gap-2 text-gold">
          <span className="text-2xl">📣</span>
          <span className="text-sm font-medium uppercase tracking-wider">
            Referee's Decision: Page Not Found
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-gold hover:bg-gold-light text-primary-foreground font-semibold px-8"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-border text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Stadium crowd wave effect */}
        <motion.div
          className="mt-12 flex justify-center gap-1"
          initial="hidden"
          animate="visible"
        >
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-8 bg-gold/30 rounded-full"
              animate={{
                scaleY: [1, 1.5, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;

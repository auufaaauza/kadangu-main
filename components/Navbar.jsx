import React, { useState, useEffect } from 'react';
import { ShoppingCart, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Disable scroll animation on mobile to prevent bugs
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only apply scroll behavior on desktop
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobile]);

  const handleAction = (feature) => {
    toast({
      title: `${feature}`,
      description: `Fitur ${feature} akan segera hadir! 🚀`,
    });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="sticky top-3 z-50 mx-3 sm:mx-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-transparent backdrop-blur-xl rounded-2xl border border-slate-700/30 shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4">
            <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer" onClick={() => window.location.href = '/'}>
              <img
                src="/images/logo.png"
                alt="Kadangu logo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg shadow-md shadow-[hsl(var(--primary))]/30 ring-2 ring-[hsl(var(--border))] object-cover"
              />

              <div>
                {/* Mobile: Kadangu */}
                <h1 className="text-sm font-bold text-slate-800 dark:text-slate-200 sm:hidden">
                  <span className="text-[hsl(var(--primary))]">Kadangu</span>
                </h1>
                {/* Tablet & Desktop: Halo, Sobat Kadangu */}
                <h1 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200 hidden sm:block">
                  <span className="text-gray-600 dark:text-gray-400">Halo, Sobat </span>
                  <span className="text-[hsl(var(--primary))]">Kadangu</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <Button
                onClick={() => handleAction('Keranjang')}
                variant="ghost"
                size="icon"
                className="rounded-full text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--primary))] border border-border backdrop-blur-sm transition-colors duration-200 h-8 w-8 sm:h-9 sm:w-9"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                onClick={() => handleAction('Login')}
                className="rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-md shadow-[hsl(var(--primary))]/30 border border-[hsl(var(--primary))]/20 transition-colors duration-200 h-8 px-3 sm:h-9 sm:px-4 text-sm"
              >
                <LogIn className="w-4 h-4 mr-0 md:mr-1.5" />
                <span className="hidden md:inline">Masuk</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
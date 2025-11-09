import React, { useState, useEffect } from 'react';
import { ShoppingCart, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  const handleAction = (feature) => {
    toast({
      title: `🚧 Fitur ${feature} Belum Tersedia`,
      description: "Anda bisa request fitur ini di prompt berikutnya! 🚀",
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
      className="sticky top-6 z-50 mx-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-transparent backdrop-blur-xl rounded-2xl border border-slate-700/30 shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between h-20 px-6">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.href='/'}>
            <div className="w-12 h-12 bg-[hsl(var(--primary))] rounded-xl flex items-center justify-center shadow-lg shadow-[hsl(var(--primary))]/30 ring-2 ring-[hsl(var(--border))]">
              <span className="text-white font-bold text-2xl">K</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 hidden sm:block">
              <span className="text-[hsl(var(--primary))]">Kadangu</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleAction('Keranjang')}
              variant="ghost"
              size="icon"
              className="rounded-full text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--primary))] border border-[hsl(var(--border))] backdrop-blur-sm transition-colors duration-200"
            >
              <ShoppingCart className="w-6 h-6" />
            </Button>
             <Button
              onClick={() => handleAction('Login')}
              className="rounded-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white font-semibold shadow-lg shadow-[hsl(var(--primary))]/30 border border-[hsl(var(--primary))]/20 transition-colors duration-200"
            >
              <LogIn className="w-5 h-5 mr-0 md:mr-2" />
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
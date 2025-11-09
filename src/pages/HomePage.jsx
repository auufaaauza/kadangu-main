import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AutoCarousel from '@/components/sections/AutoCarousel';
import { heroBanners } from '@/data/banners';
import FeatureMenu from '@/components/FeatureMenu';
import MascotBanner from '@/components/sections/MascotBanner';
import FeaturedEvents from '@/components/FeaturedEvents';
import FeaturedArtists from '@/components/FeaturedArtists';
import NewsSection from '@/components/NewsSection';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';

const HomePage = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide FAB when scrolling down, show when scrolling up
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

  const handleFabClick = () => {
    toast({
      title: "🎵 Fitur musik belum tersedia",
      description: "Anda bisa request fitur ini di prompt berikutnya! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Kadangu - Platform Digital Seni Daerah Indonesia</title>
        <meta name="description" content="Kadangu adalah platform digital yang menghubungkan seniman daerah, penonton, dan penyelenggara acara seni. Jelajahi pertunjukan, beli tiket, dan dukung ekosistem seni Indonesia." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 pb-28 sm:pb-32">
        <Navbar />
        
        <main>
         <div className='container mx-auto px-4 mb-20 md:mb-24'>
  <AutoCarousel banners={heroBanners} />
</div>

          <div className="container mx-auto px-4">
            <FeatureMenu />
            <MascotBanner />
          </div>
          
          <FeaturedEvents />
          <FeaturedArtists />
          <NewsSection />
        </main>
        
        <BottomNav />
        <Footer />

        <motion.button
          onClick={handleFabClick}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 1, x: 0 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            x: isVisible ? 0 : 100,
            scale: isVisible ? 1 : 0.8
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed bottom-28 sm:bottom-32 right-4 z-30 w-12 h-12 sm:w-14 sm:h-14 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] rounded-full shadow-lg shadow-[hsl(var(--primary))]/30 flex items-center justify-center text-white border-2 border-white/20 transition-colors duration-300"
        >
          <Music className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </div>
    </>
  );
};

export default HomePage;
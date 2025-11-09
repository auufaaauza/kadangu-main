
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Ticket, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '@/components/Footer';
import ShowsFilter from '@/components/ShowsFilter';
import AutoCarousel from '@/components/sections/AutoCarousel'; // Import the carousel
import { Input } from '@/components/ui/input';

const showsData = [
  { id: 1, title: 'Monolog: Sepotong Senja untuk Pacarku', category: 'Teater', tag: 'NEW', image: 'Monolog: Sepotong Senja untuk Pacarku' },
  { id: 2, title: 'Wayang Kontemporer: Satria Arunika', category: 'Tradisi', tag: 'HOT', image: 'Wayang Kontemporer: Satria Arunika' },
  { id: 3, title: 'Konser Jazz Hujan', category: 'Musik', image: 'Konser Jazz Hujan' },
  { id: 4, title: 'Tari Bali: Cakramurti', category: 'Tari', image: 'Tari Bali: Cakramurti' },
  { id: 5, title: 'Pameran: Kanvas Kota', category: 'Seni Rupa', image: 'Pameran: Kanvas Kota' },
  { id: 6, title: 'Diskusi Buku Laut', category: 'Sastra', image: 'Diskusi Buku Laut' },
  { id: 7, title: 'Festival Film Pendek', category: 'Film', image: 'Festival Film Pendek' },
  { id: 8, title: 'Konser Melodi Nusantara', category: 'Musik', image: 'Konser Melodi Nusantara' }
];

const ShowsPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBuyTicket = (showId) => {
    navigate(`/shows/${showId}`);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % showsData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + showsData.length) % showsData.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Pertunjukan Seni - Kadangu</title>
        <meta name="description" content="Jelajahi beragam pertunjukan seni daerah di Kadangu. Temukan acara musik, tari, teater, dan lainnya." />
      </Helmet>
      <div className="w-full bg-gray-50">
        <div className="container mx-auto px-4 mt-6 md:mt-8">
          
          
          <AutoCarousel /> {/* Add the carousel here */}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative my-6"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari di Kadangu"
              className="w-full pl-12 pr-4 py-3 bg-white rounded-full shadow-sm border-gray-200 focus:ring-primary focus:border-primary"
            />
          </motion.div>
          
          <ShowsFilter />

          {/* Mobile & Tablet: Grid Layout */}
          <div className="lg:hidden">
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {showsData.map((show) => (
                <motion.div 
                  key={show.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="relative w-full aspect-[3/4]">
                    <img
                      alt={show.title}
                      src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {show.tag && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded">
                        {show.tag}
                      </div>
                    )}
                    <div className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-semibold text-gray-800 bg-white/90 backdrop-blur-sm rounded">
                      {show.category}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 text-white">
                      <h3 className="font-bold text-xs line-clamp-2 mb-1">
                        {show.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <button
                      onClick={() => handleBuyTicket(show.id)}
                      className="w-full bg-[hsl(var(--primary))] text-white font-bold text-[11px] py-2 rounded-lg flex items-center justify-center transition-colors hover:bg-[hsl(var(--primary))]/90"
                    >
                      <Ticket className="w-3 h-3 mr-1" />
                      Beli Tiket
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Desktop: 4 Cards Horizontal Carousel */}
          <div className="hidden lg:block relative mb-8">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-4"
                drag="x"
                dragConstraints={{ left: -((showsData.length - 4) * 25), right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    nextSlide();
                  } else if (swipe > 10000) {
                    prevSlide();
                  }
                }}
                animate={{
                  x: `calc(-${currentSlide * 25}% - ${currentSlide * 16}px)`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {showsData.map((show) => (
                  <div
                    key={show.id}
                    className="flex-shrink-0"
                    style={{ width: "calc(25% - 12px)" }}
                  >
                    <motion.div
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                      whileHover={{ y: -4 }}
                    >
                      <div className="relative w-full aspect-[3/4]">
                        <img
                          alt={show.title}
                          src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        {show.tag && (
                          <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold text-white bg-red-500 rounded-md">
                            {show.tag}
                          </div>
                        )}
                        <div className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold text-gray-800 bg-white/80 backdrop-blur-sm rounded-md">
                          {show.category}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="font-bold text-base line-clamp-2 mb-1">
                            {show.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <button
                          onClick={() => handleBuyTicket(show.id)}
                          className="w-full bg-[hsl(var(--primary))] text-white font-bold text-sm py-3 rounded-lg flex items-center justify-center transition-colors hover:bg-[hsl(var(--primary))]/90"
                        >
                          <Ticket className="w-4 h-4 mr-2" />
                          Beli Tiket
                        </button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows - Desktop Only */}
            <button
              onClick={prevSlide}
              className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-gray-50 rounded-full shadow-xl flex items-center justify-center z-10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-gray-50 rounded-full shadow-xl flex items-center justify-center z-10"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>
        
        <div className="mt-16 md:mt-20">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ShowsPage;

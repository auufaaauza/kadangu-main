
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Ticket } from 'lucide-react';
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

  const handleBuyTicket = (showId) => {
    navigate(`/shows/${showId}`);
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
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Pertunjukan Seni
          </motion.h1>
          
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

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {showsData.map((show) => (
              <motion.div 
                key={show.id} 
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col group overflow-hidden"
                variants={itemVariants}
              >
                <div className="relative overflow-hidden w-full aspect-square">
                  <img alt={show.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  {show.tag && (
                    <div className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-md">
                      {show.tag}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-gray-800 bg-white/80 backdrop-blur-sm rounded-md">
                      {show.category}
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-bold text-base text-gray-800 line-clamp-2 flex-grow">{show.title}</h3>
                  <button
                    onClick={() => handleBuyTicket(show.id)}
                    className="mt-3 w-full bg-[hsl(var(--primary))] text-white font-bold text-sm py-3 rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
                  >
                    <Ticket className="w-4 h-4 mr-2" />
                    Beli Tiket
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="mt-16 md:mt-20">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ShowsPage;

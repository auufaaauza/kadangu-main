import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const WishlistPage = () => {
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: "🚧 Fitur ini belum tersedia",
      description: "Anda bisa request fitur ini di prompt berikutnya! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Wishlist - Kadangu</title>
        <meta name="description" content="Simpan dan kelola pertunjukan seni favorit Anda di Kadangu." />
      </Helmet>
      
      <div className="min-h-screen pb-20 bg-gray-50">
        <Navbar />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Wishlist Saya</h1>
          
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Wishlist Kosong</h3>
            <p className="text-gray-500 mb-6">Mulai tambahkan pertunjukan favorit Anda!</p>
            <button
              onClick={handleAction}
              className="px-6 py-3 bg-[#2a7163] text-white rounded-lg hover:bg-[#235a4f] transition-colors"
            >
              Jelajahi Pertunjukan
            </button>
          </div>
        </motion.div>
        
        <BottomNav />
      </div>
    </>
  );
};

export default WishlistPage;
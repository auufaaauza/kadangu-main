import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Wishlist - Kadangu</title>
        <meta name="description" content="Simpan dan kelola pertunjukan seni favorit Anda di Kadangu." />
      </Helmet>
      
      <div className="w-full bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Wishlist Saya</h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <Heart className="w-24 h-24 text-pink-200 mx-auto" />
                <Sparkles className="w-8 h-8 text-pink-400 absolute -top-2 -right-2" />
              </div>
            </motion.div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Wishlist Anda Masih Kosong</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Mulai simpan pertunjukan seni favorit Anda! Klik ikon hati pada pertunjukan yang Anda sukai untuk menambahkannya ke wishlist.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => navigate('/shows')}
                size="lg"
                className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white font-semibold rounded-full shadow-lg"
              >
                Jelajahi Pertunjukan
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => navigate('/')}
                size="lg"
                variant="outline"
                className="rounded-full font-semibold"
              >
                Kembali ke Beranda
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                💡 <span className="font-semibold">Tips:</span> Fitur wishlist membantu Anda melacak pertunjukan yang ingin Anda tonton nanti!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default WishlistPage;
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ExplorePage = () => {
  const { toast } = useToast();

  const handleSearch = () => {
    toast({
      title: "🚧 Fitur pencarian belum tersedia",
      description: "Anda bisa request fitur ini di prompt berikutnya! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Jelajah - Kadangu</title>
        <meta name="description" content="Jelajahi berbagai pertunjukan seni, seniman, dan acara budaya di seluruh Indonesia melalui Kadangu." />
      </Helmet>
      
      <div className="min-h-screen pb-20 bg-gray-50">
        <Navbar />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Jelajahi Seni Indonesia</h1>
          
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari pertunjukan, seniman, atau acara..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2a7163] transition-all"
                onFocus={handleSearch}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={handleSearch}
              >
                <img alt={`Pertunjukan seni ${item}`} className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1572603896433-ca828a17e329" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Pertunjukan Seni #{item}</h3>
                  <p className="text-gray-600 text-sm mb-3">Deskripsi singkat tentang pertunjukan seni yang menarik</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#2a7163] font-semibold">Rp 50.000</span>
                    <span className="text-sm text-gray-500">15 Des 2025</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <BottomNav />
      </div>
    </>
  );
};

export default ExplorePage;
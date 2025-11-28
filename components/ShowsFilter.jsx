import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { MoreHorizontal, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const allCategories = [
  'Semua', 'Musik', 'Tari', 'Teater', 'Seni Rupa', 'Sastra & Literatur', 'Film & Audio Visual', 'Seni Tradisi & Budaya'
];

// 3 kategori utama yang ditampilkan (selain Semua)
const mainCategories = ['Semua', 'Musik', 'Tari', 'Teater'];
// Sisanya masuk ke popup
const otherCategories = allCategories.filter(cat => !mainCategories.includes(cat));

const ShowsFilter = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { toast } = useToast();

  const handleFilterClick = (category) => {
    setActiveCategory(category);
    toast({
      title: `🚧 Filter untuk "${category}" belum aktif`,
      description: "Fitur ini akan segera tersedia. Anda bisa request di prompt berikutnya! 🚀",
    });
  };

  return (
    <>
      <div className="py-4 mb-8">
        <div className="relative">
          <div className="flex space-x-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {/* Kategori Utama */}
            {mainCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleFilterClick(category)}
                className={`relative px-5 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${
                  activeCategory === category
                    ? 'text-white'
                    : 'text-gray-600 bg-white hover:bg-gray-100'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-[hsl(var(--primary))] rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
            
            {/* Tombol Lainnya */}
            <motion.button
              onClick={() => setIsPopupOpen(true)}
              className="relative px-5 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap text-gray-600 bg-white hover:bg-gray-100 flex items-center">
              <div className="w-3 h-3" />
              <span>Lainnya</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Popup Dialog untuk Kategori Lainnya */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-bold">Kategori Lainnya</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-4 max-h-[60vh] overflow-y-auto">
            {otherCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  handleFilterClick(category);
                  setIsPopupOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors text-left ${
                  activeCategory === category
                    ? 'bg-[hsl(var(--primary))] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShowsFilter;
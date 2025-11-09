import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const categories = [
  'Semua', 'Musik', 'Tari', 'Teater', 'Seni Rupa', 'Sastra & Literatur', 'Film & Audio Visual', 'Seni Tradisi & Budaya'
];

const ShowsFilter = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const { toast } = useToast();

  const handleFilterClick = (category) => {
    setActiveCategory(category);
    toast({
      title: `🚧 Filter untuk "${category}" belum aktif`,
      description: "Fitur ini akan segera tersedia. Anda bisa request di prompt berikutnya! 🚀",
    });
  };

  return (
    <div className="py-4 mb-8">
      <div className="relative">
        <div className="flex space-x-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {categories.map((category) => (
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
        </div>
      </div>
    </div>
  );
};

export default ShowsFilter;
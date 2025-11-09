
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Ticket, Users, Newspaper, Music, Drama, Palette, MoreHorizontal, BookOpen, Film, Landmark, HeartHandshake as Handshake, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const MainFeatureItem = ({ feature, onClick, isMoreButton = false }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center cursor-pointer group"
    onClick={onClick}
  >
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isMoreButton ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}>
      <feature.icon className={`w-8 h-8 ${feature.color} transition-all transform group-hover:scale-110`} />
    </div>
    <p className="text-sm font-semibold text-gray-800 mt-3 px-1 text-center">{feature.name}</p>
  </motion.div>
);

const FeatureMenu = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const mainFeatures = [
    { name: 'Pertunjukan', icon: Ticket, color: 'text-blue-500', path: '/shows' },
    { name: 'Seniman', icon: Users, color: 'text-purple-500' },
    { name: 'Berita', icon: Newspaper, color: 'text-orange-500', path: '/news' }, // Aktifkan path untuk Berita
    { name: 'Musik', icon: Music, color: 'text-red-500' },
    { name: 'Tari', icon: Drama, color: 'text-pink-500', path: '/dance' },
    { name: 'Teater', icon: Users, color: 'text-indigo-500' },
    { name: 'Seni Rupa', icon: Palette, color: 'text-yellow-500' },
  ];

  const otherFeatures = [
    { name: 'Sastra', icon: BookOpen, color: 'text-green-500' },
    { name: 'Film', icon: Film, color: 'text-cyan-500' },
    { name: 'Budaya', icon: Landmark, color: 'text-amber-500' },
    { name: 'Workshop', icon: Handshake, color: 'text-teal-500' },
  ];

  const handleFeatureClick = (feature) => {
    if (feature.path) {
      navigate(feature.path);
    } else {
      toast({
        title: `🚧 Fitur ${feature.name} belum tersedia`,
        description: "Anda bisa request fitur ini di prompt berikutnya! 🚀",
      });
    }
  };
  
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-12"
      >
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-x-2 gap-y-6 text-center">
          {mainFeatures.map((feature, index) => (
            <MainFeatureItem key={index} feature={feature} onClick={() => handleFeatureClick(feature)} />
          ))}
          <MainFeatureItem 
            feature={{ 
              name: isExpanded ? 'Tutup' : 'Lainnya', 
              icon: isExpanded ? X : MoreHorizontal, 
              color: 'text-gray-500' // Neutral color for the More/Close button
            }} 
            onClick={toggleExpand}
            isMoreButton={true}
          />
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: '24px' }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="border-t-2 border-dashed pt-6"
            >
              <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-x-2 gap-y-6 text-center">
                {otherFeatures.map((feature, index) => (
                  <MainFeatureItem key={index} feature={feature} onClick={() => handleFeatureClick(feature)} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
  );
};

export default FeatureMenu;

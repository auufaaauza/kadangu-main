import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Users } from 'lucide-react';

const FeaturedArtists = () => {
  const { toast } = useToast();

  const artists = [
    { name: 'Sanggar Tari Mekar', category: 'Tari Tradisional', followers: '2.5K', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop' },
    { name: 'Komunitas Teater Muda', category: 'Teater', followers: '1.8K', image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&auto=format&fit=crop' },
    { name: 'Pelukis Nusantara', category: 'Seni Rupa', followers: '3.2K', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop' },
    { name: 'Gamelan Pusaka', category: 'Musik Tradisional', followers: '1.5K', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop' },
  ];

  const handleArtistClick = () => {
    toast({
      title: "🚧 Fitur ini belum tersedia",
      description: "Anda bisa request fitur ini di prompt berikutnya! 🚀",
    });
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Seniman & Komunitas Pilihan
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
            Kenali lebih dekat para seniman dan komunitas seni yang menjadi tulang punggung kreativitas budaya Indonesia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              onClick={handleArtistClick}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg text-center overflow-hidden group cursor-pointer"
            >
              <div className="relative">
                <img alt={artist.name} className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" src={artist.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <h3 className="font-bold text-lg sm:text-xl text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{artist.name}</h3>
                  <p className="text-xs sm:text-sm text-white/80">{artist.category}</p>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-white">
                <div className="flex items-center justify-center text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-[hsl(var(--primary))]" /> {/* Changed to primary color */}
                  <span className="text-xs sm:text-sm font-semibold">{artist.followers} Pengikut</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
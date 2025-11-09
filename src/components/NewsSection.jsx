import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NewsSection = () => {
  const { toast } = useToast();

  const news = [
    {
      title: 'Festival Seni Budaya Nusantara Kembali Digelar',
      excerpt: 'Setelah dua tahun vakum, festival seni budaya terbesar di Indonesia kembali hadir dengan konsep hybrid...',
      date: '2 hari yang lalu',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop'
    },
    {
      title: 'Seniman Muda Indonesia Raih Penghargaan Internasional',
      excerpt: 'Prestasi membanggakan dari seniman muda Indonesia di kancah internasional dalam bidang seni digital...',
      date: '3 hari yang lalu',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop'
    },
    {
      title: 'Workshop Seni Rupa Gratis untuk Pelajar',
      excerpt: 'Program pelatihan seni rupa gratis dibuka untuk pelajar di seluruh Indonesia untuk menumbuhkan bakat...',
      date: '5 hari yang lalu',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop'
    },
  ];

  const handleNewsClick = () => {
    toast({
      title: "🚧 Fitur ini belum tersedia",
      description: "Anda bisa request fitur ini di prompt berikutnya! 🚀",
    });
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Berita & Artikel Terkini
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
            Ikuti perkembangan terbaru dari dunia seni dan budaya Indonesia, dari panggung hingga belakang layar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {news.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              onClick={handleNewsClick}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
            >
              <div className="overflow-hidden">
                <img alt={item.title} className="w-full h-48 sm:h-52 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500" src={item.image} />
              </div>
              <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                <div className="flex items-center text-gray-500 text-xs mb-3">
                  <Clock className="w-4 h-4 mr-2 text-[hsl(var(--primary))]" /> {/* Changed to primary color */}
                  <span className="font-medium">{item.date}</span>
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-3 text-gray-900 line-clamp-2 flex-grow">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">{item.excerpt}</p>
                <div className="mt-auto">
                  <span className="font-semibold text-xs sm:text-sm text-[hsl(var(--primary))] flex items-center group-hover:text-[hsl(var(--accent))] transition-colors"> {/* Changed hover to accent */}
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
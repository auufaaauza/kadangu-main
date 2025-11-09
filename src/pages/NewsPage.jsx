
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Send, ArrowRight, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NewsCarousel from '@/components/NewsCarousel';
import { allNews, featuredNewsItems } from '@/data/news';

const categories = ['Semua', 'Liputan Acara', 'Profil Talent', 'Kegiatan Komunitas', 'Artikel Budaya'];

const NewsPage = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const handleReadMore = () => {
    toast({
      title: "🚧 Halaman detail berita belum ada!",
    });
  };

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'Semua') {
      return allNews;
    }
    return allNews.filter(news => news.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <Helmet>
        <title>Berita Kadangu - Denyut Kreativitas Garut</title>
        <meta name="description" content="Jelajahi berita terbaru, liputan acara, profil talenta, dan artikel budaya yang membentuk narasi kreatif Garut. Dipersembahkan oleh Kadangu." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <main className="flex-grow container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[hsl(var(--foreground))] leading-tight">
              <Newspaper className="inline-block w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[hsl(var(--primary))] mr-2 sm:mr-3" />
              Ruang Berita Kadangu
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Kumpulan cerita, inspirasi, dan kabar terkini dari panggung kreativitas Garut.
            </p>
          </motion.div>

          <NewsCarousel newsItems={featuredNewsItems} />

          <section className="mt-12 sm:mt-16 md:mt-20 lg:mt-28 xl:mt-32">
            <div className="mb-6 sm:mb-8 md:mb-10">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[hsl(var(--foreground))] mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0"><Tag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-0 sm:mr-2 md:mr-3 text-[hsl(var(--primary))]"/>Kategori Berita</h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-3 sm:px-4 md:px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 shadow-sm",
                      selectedCategory === category
                        ? "bg-[hsl(var(--primary))] text-white shadow-lg scale-105"
                        : "bg-white text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:scale-105"
                    )}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              <AnimatePresence>
                {filteredNews.map((news, index) => (
                  <motion.div
                    key={`${news.title}-${index}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden group flex flex-col cursor-pointer"
                    onClick={handleReadMore}
                  >
                    <div className="overflow-hidden h-40 sm:h-44 md:h-48">
                      <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={news.alt} src={news.imgSrc} />
                    </div>
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                      <span className="text-xs font-bold text-[hsl(var(--primary))] bg-[hsl(var(--secondary))]/20 py-1 px-3 rounded-full self-start mb-3">{news.category}</span>
                      <h3 className="text-base sm:text-lg font-bold text-[hsl(var(--foreground))] leading-snug mb-2 flex-grow group-hover:text-[hsl(var(--primary))] transition-colors">{news.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{news.excerpt}</p>
                      <div className="mt-auto font-semibold text-xs sm:text-sm text-[hsl(var(--primary))] flex items-center group-hover:translate-x-1 transition-transform">
                        Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
             {filteredNews.length === 0 && (
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center col-span-full py-8 sm:py-12 md:py-16"
                 >
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg">Tidak ada berita dalam kategori ini.</p>
                 </motion.div>
            )}
          </section>
          
          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 bg-[hsl(var(--primary))] text-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 text-center shadow-2xl max-w-5xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4">Punya Cerita untuk Dibagikan?</h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4">
              Komunitasmu punya acara seru? Atau ada kisah inspiratif dari pegiat seni yang perlu diangkat? Kirimkan rilis pers atau idemu kepada kami!
            </p>
            <Button
              onClick={handleReadMore}
              size="lg"
              className="bg-white text-[hsl(var(--primary))] font-bold rounded-full shadow-lg hover:bg-[hsl(var(--muted))] hover:scale-105 transition-all transform duration-300 px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-xs sm:text-sm md:text-base"
            >
              Kirim Rilis Berita <Send className="ml-2 w-5 h-5" />
            </Button>
          </motion.section>
        </main>

        <BottomNav />
        <Footer />
      </div>
    </>
  );
};

export default NewsPage;

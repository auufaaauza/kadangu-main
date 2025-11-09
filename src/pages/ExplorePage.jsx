import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, MapPin, Music, Theater, Palette, Camera, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ExplorePage = () => {
  const { toast } = useToast();

  const categories = [
    { name: 'Musik', icon: Music, color: 'from-purple-500 to-pink-500', count: '50+ Acara' },
    { name: 'Tari', icon: Theater, color: 'from-blue-500 to-cyan-500', count: '30+ Acara' },
    { name: 'Seni Rupa', icon: Palette, color: 'from-orange-500 to-red-500', count: '20+ Pameran' },
    { name: 'Fotografi', icon: Camera, color: 'from-green-500 to-teal-500', count: '15+ Workshop' },
    { name: 'Teater', icon: Sparkles, color: 'from-yellow-500 to-orange-500', count: '25+ Pertunjukan' },
  ];

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
      
      <div className="w-full bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Jelajahi Seni Indonesia</h1>
          
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari pertunjukan, seniman, atau lokasi..."
                className="w-full pl-12 pr-4 py-6 text-lg rounded-full shadow-sm"
              />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Kategori Seni</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                      <p className="text-xs text-gray-500">{category.count}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl shadow-lg p-8 md:p-12 text-center text-white">
            <MapPin className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Fitur Eksplorasi Lengkap Segera Hadir!</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Kami sedang mengembangkan fitur pencarian canggih, filter berdasarkan lokasi, harga, dan tanggal, serta rekomendasi personal untuk Anda.
            </p>
          </div>
        </motion.div>
        
      </div>
    </>
  );
};

export default ExplorePage;
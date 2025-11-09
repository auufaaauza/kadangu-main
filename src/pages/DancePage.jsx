
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TalentCarousel from '@/components/TalentCarousel';
import AutoCarousel from '@/components/sections/AutoCarousel'; // Import the carousel

const DancePage = () => {
  const talents = [
    {
      name: "Sanggar Larasati",
      category: "Tari Tradisi",
      origin: "Garut Kota",
      description: "Menjaga keaslian gerak tari klasik Sunda, Larasati membawa keanggunan warisan budaya ke atas panggung modern.",
      imageDescription: "Penari Sunda dengan kostum tradisional yang anggun",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLXpy-AImZ2i4N2b4D6eJ3f9q-sV_c5aYj"
    },
    {
      name: "Gia & The Movers",
      category: "Tari Kontemporer",
      origin: "Komunitas Tari Urban",
      description: "Gia memadukan narasi personal dengan gerak tubuh yang ekspresif, menciptakan pertunjukan yang menyentuh dan tak terlupakan.",
      imageDescription: "Penari kontemporer dengan gerakan ekspresif di sebuah studio",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLXpy-AImZ2i4N2b4D6eJ3f9q-sV_c5aYj"
    },
    {
      name: "Revolt Crew",
      category: "Tari Modern",
      origin: "Cikajang Dance Community",
      description: "Energi, kekompakan, dan beat yang menghentak. Revolt Crew adalah definisi dari panggung yang bergelora dan penuh semangat.",
      imageDescription: "Grup penari hip-hop di tengah gerakan yang energik",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLXpy-AImZ2i4N2b4D6eJ3f9q-sV_c5aYj"
    },
    {
      name: "Cahya Kirana",
      category: "Tari Kreasi",
      origin: "Leles",
      description: "Seorang penari tunggal yang menceritakan kembali dongeng-dongeng Sunda melalui koreografi baru yang segar dan imajinatif.",
      imageDescription: "Penari tunggal dengan kostum tari kreasi yang cerah",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLXpy-AImZ2i4N2b4D6eJ3f9q-sV_c5aYj"
    },
    {
      name: "Euphoria Dance",
      category: "Tari Modern",
      origin: "Garut Pop Culture",
      description: "Membawa demam Hallyu ke Garut dengan presisi dan semangat idola. Penampilan mereka selalu memukau para penggemar.",
      imageDescription: "Grup dance cover K-Pop dengan pose akhir yang kompak",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLXpy-AImZ2i4N2b4D6eJ3f9q-sV_c5aYj"
    },
    {
      name: "Lingkung Seni Puspita",
      category: "Tari Tradisi",
      origin: "Wanaraja",
      description: "Berdedikasi melestarikan tari rakyat Garut, penampilan mereka adalah perayaan otentik dari kehidupan dan tradisi lokal.",
      imageDescription: "Sekelompok penari tari rakyat Sunda di alam terbuka",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLXpy-AImZ2i4N2b4D6eJ3f9q-sV_c5aYj"
    },
     {
      name: "Soulution Dance",
      category: "Tari Kontemporer",
      origin: "Garut Art Space",
      description: "Kelompok tari yang mengeksplorasi isu sosial melalui gerak tubuh yang provokatif dan visual yang kuat.",
      imageDescription: "Siluet penari kontemporer di depan latar senja",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLXpy-AImZ2i4N2b4D6eJ3f9q-sV_c5aYj"
    },
    {
      name: "Legacy Jaipong",
      category: "Tari Kreasi",
      origin: "Pusat Kesenian Garut",
      description: "Mengambil inspirasi dari jaipongan, grup ini memberikan sentuhan modern yang energik dan penuh warna.",
      imageDescription: "Penari Jaipong kreasi dengan kostum berwarna-warni",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLXpy-AImZ2i4N2b4D6eJ3f9q-sV_c5aYj"
    }
  ];

  const categories = ["Semua", "Tari Tradisi", "Tari Kreasi", "Tari Kontemporer", "Tari Modern"];

  const { toast } = useToast();

  const handleMainCTA = () => {
     toast({
      title: "Mari Tumbuh Bersama!",
      description: "Kami tidak sabar mendengar dari Anda! Fitur kontak sedang disiapkan. 🚀",
    });
  }

  return (
    <>
      <Helmet>
        <title>Panggung Tari Kadangu - Gerak Adalah Bahasa Daerah Kita</title>
        <meta name="description" content="Jelajahi dunia seni tari Garut bersama Kadangu. Temukan talenta terkurasi, ruang kolaborasi, dan panggung untuk setiap gerakanmu." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pb-20">
        <Navbar />
        
        <AutoCarousel />

        <main className="container mx-auto px-4 mt-12 md:mt-16">
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
                <Users className="text-pink-500" /> Talent Tari Kadangu
              </h2>
              <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                Inilah para penari dan grup terkurasi dari Garut yang siap berkolaborasi dan memeriahkan acaramu. Mereka adalah wajah dari energi kreatif daerah kita.
              </p>
            </div>

            <Tabs defaultValue="Semua" className="w-full">
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 mx-auto max-w-2xl bg-gray-200/80 backdrop-blur-sm">
                {categories.map(category => (
                  <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map(category => (
                <TabsContent key={category} value={category} className="mt-8">
                  <TalentCarousel 
                    talents={category === "Semua" ? talents : talents.filter(t => t.category === category)}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            className="mt-24 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl font-bold">Jadilah Bagian dari Gerakan Ini</h2>
            <p className="mt-4 max-w-2xl mx-auto">Apakah Anda seorang penari, sanggar, atau event organizer yang mencari talenta terbaik? Kadangu adalah rumahmu. Mari kita ciptakan panggung yang lebih besar bersama.</p>
            <Button
              onClick={handleMainCTA}
              size="lg"
              className="mt-8 bg-white text-pink-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all"
            >
              Hubungi Kami Sekarang <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-xs mt-4 opacity-80">Ingin tampil bersama Kadangu? Klik tombol di atas.</p>
          </motion.section>
        </main>

        <BottomNav />
        <Footer />
      </div>
    </>
  );
};

export default DancePage;

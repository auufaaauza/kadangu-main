import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Users, ChevronRight, ChevronDown, Filter } from "lucide-react";
import Footer from "@/components/Footer";
import AutoCarousel from "@/components/sections/AutoCarousel";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import TalentCarousel from "@/components/TalentCarousel";
import CategoryFilterModal from "@/components/CategoryFilterModal";
import { danceTalents, danceCategories } from "@/data/dance";

const DancePage = () => {
  const { toast } = useToast();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");

  const displayedCategories = danceCategories.slice(0, 4);
  const hiddenCategories = danceCategories.slice(4);

  const filteredTalents =
    activeCategory === "Semua"
      ? danceTalents
      : danceTalents.filter((t) => t.category === activeCategory);

  const handleMainCTA = () => {
    toast({
      title: "Mari Tumbuh Bersama!",
      description: "Kami tidak sabar mendengar dari Anda! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Panggung Tari Kadangu - Gerak Adalah Bahasa Daerah Kita</title>
        <meta
          name="description"
          content="Jelajahi dunia seni tari Garut bersama Kadangu. Temukan talenta terkurasi dan ruang kolaborasi untuk setiap gerakanmu."
        />
      </Helmet>

      <div className="w-full bg-gray-50">
        <AutoCarousel />

        <div className="container mx-auto px-4 mt-8 md:mt-12">
          <section className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <Users className="text-pink-500" /> Talent Tari Kadangu
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Inilah para penari dan grup terkurasi dari Garut yang siap berkolaborasi.
            </p>

          {/* Desktop & Tab Category */}
<div className="hidden sm:flex flex-wrap justify-center gap-3 mt-6">
  {displayedCategories.map((cat) => (
    <Button
      key={cat}
      variant={activeCategory === cat ? "categoryActive" : "category"}
      onClick={() => setActiveCategory(cat)}
    >
      {cat}
    </Button>
  ))}

  {hiddenCategories.length > 0 && (
    <Button
      variant="category"
      onClick={() => setFilterOpen(true)}
      className="flex items-center"
    >
      Lainnya
    </Button>
  )}
</div>

{/* Mobile Filter */}
<div className="sm:hidden mt-6 flex justify-center">
  <Button
    variant="category"
    onClick={() => setFilterOpen(true)}
    className="flex items-center"
  >
    <Filter className="w-4 h-4 mr-2" />
    Pilih Kategori: <span className="font-semibold ml-1">{activeCategory}</span>
  </Button>
</div>

          </section>

          <TalentCarousel talents={filteredTalents} />

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            className="mt-16 md:mt-20 mb-12 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-2xl p-6 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Jadilah Bagian dari Gerakan Ini</h2>
            <p className="mt-4 text-sm md:text-base max-w-2xl mx-auto">
              Apakah Anda seorang penari, sanggar, atau event organizer yang mencari talenta terbaik? Kadangu adalah rumahmu.
            </p>
            <Button
              onClick={handleMainCTA}
              size="lg"
              className="mt-6 md:mt-8 bg-white text-pink-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all"
            >
              Hubungi Kami Sekarang <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.section>
        </div>

        <Footer />
        
        <CategoryFilterModal
          open={filterOpen}
          setOpen={setFilterOpen}
          categories={danceCategories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>
    </>
  );
};

export default DancePage;

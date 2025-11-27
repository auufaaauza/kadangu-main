import React from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Users, Instagram, Music2, Youtube } from "lucide-react";

import { TALENT_DATA } from "@/data/talentData";
import { TALENT_PLATFORMS, TALENT_NICHES } from "@/data/talentMeta";

const FeaturedArtists = () => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "🚧 Fitur belum tersedia",
      description: "Halaman detail akan segera hadir! 🚀",
    });
  };

  // Ambil HANYA 4 talent teratas (atau random)
  const artists = TALENT_DATA.slice(0, 4);

  // Ambil followers dari platform utama talent
  const getFollowers = (talent) => {
    if (talent.followers.instagram) return `${talent.followers.instagram.toLocaleString()} IG`;
    if (talent.followers.tiktok) return `${talent.followers.tiktok.toLocaleString()} TikTok`;
    if (talent.followers.youtube) return `${talent.followers.youtube.toLocaleString()} YT`;
    return "0";
  };

  const PlatformIcon = {
    instagram: <Instagram className="w-4 h-4 text-pink-600" />,
    tiktok: <Music2 className="w-4 h-4 text-black" />,
    youtube: <Youtube className="w-4 h-4 text-red-600" />,
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Talent Pilihan Minggu Ini
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
            Kreator terbaik yang siap memeriahkan event, kolaborasi brand, dan produksi kreatif di Garut.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={handleClick}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  alt={artist.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  src={artist.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Artist name */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-lg sm:text-xl text-white drop-shadow">
                    {artist.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80">
                    {TALENT_NICHES[artist.niche]}
                  </p>
                </div>
              </div>

              {/* FOLLOWERS */}
              <div className="p-3 sm:p-4 bg-white">
                <div className="flex items-center justify-center text-gray-700 gap-2">
                  {PlatformIcon[artist.category]}

                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-semibold">
                    {getFollowers(artist)} Followers
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

export default FeaturedArtists;

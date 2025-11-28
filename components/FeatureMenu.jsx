import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  Ticket,
  Users,
  Newspaper,
  Music,
  Drama,
  Palette,
  MoreHorizontal,
  BookOpen,
  Film,
  Landmark,
  HeartHandshake as Handshake,
  X,
  UserCheck
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MainFeatureItem = ({ feature, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center cursor-pointer group select-none"
    onClick={onClick}
  >
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gray-100 hover:bg-gray-200 shadow-md transition-all duration-300">
      <feature.icon
        className={`w-7 h-7 sm:w-8 sm:h-8 ${feature.color} transition-transform duration-300 group-hover:scale-110`}
      />
    </div>
    <p className="text-xs sm:text-sm font-medium text-gray-800 mt-2 text-center leading-tight">
      {feature.name}
    </p>
  </motion.div>
);

const FeatureMenu = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const mainFeatures = [
    { name: "Pertunjukan", icon: Ticket, color: "text-blue-500", path: "/shows" },
    { name: "Berita", icon: Newspaper, color: "text-orange-500", path: "/news" },
    { name: "Musik", icon: Music, color: "text-red-500", path: "/music" },
    { name: "Tari", icon: Drama, color: "text-pink-500", path: "/dance" },
    { name: "Teater", icon: Users, color: "text-indigo-500", path: "/theater" },
    { name: "Seni Rupa", icon: Palette, color: "text-yellow-500", path: "/art" },
    { name: "Sastra", icon: BookOpen, color: "text-green-500", path: "/literature" },
  ];

  const otherFeatures = [
    { name: "Film", icon: Film, color: "text-cyan-500", path: "/film" },
    { name: "Budaya", icon: Landmark, color: "text-amber-500", path: "/culture" },
    { name: "Workshop", icon: Handshake, color: "text-teal-500", path: "/workshop" },
    { name: "Talent", icon: UserCheck, color: "text-grey-500", path: "/talent" },
  ];

  const allFeatures = [...mainFeatures, ...otherFeatures];

  const handleFeatureClick = (feature) => {
    if (feature.path) {
      setIsPopupOpen(false);
      router.push(feature.path);
    } else {
      toast({
        title: ` Fitur ${feature.name} belum tersedia`,
        description: "Tunggu Update dari tim Kadangu nanti yaa! ",
      });
    }
  };

  return (
    <>
      {/* ===== Menu Utama ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-6 mb-12"
      >
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-x-2 gap-y-5 sm:gap-y-6 text-center">
          {mainFeatures.map((feature, index) => (
            <MainFeatureItem
              key={index}
              feature={feature}
              onClick={() => handleFeatureClick(feature)}
            />
          ))}

          {/* Tombol Lainnya */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPopupOpen(true)}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gray-100 hover:bg-gray-200 shadow-md transition-all">
              <MoreHorizontal className="w-7 h-7 sm:w-8 sm:h-8 text-gray-500" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-800 mt-2 text-center">
              Lainnya
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ===== Popup Semua Fitur ===== */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-2"
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="
                bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]
                p-5 sm:p-7 md:p-10 relative text-center
                w-[92%] sm:w-[85%] md:w-[70%] lg:max-w-3xl
                max-h-[90vh] overflow-y-auto
                flex flex-col items-center
              "
            >
              {/* Tombol Tutup */}
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Judul */}
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-6 sm:mb-8">
                Semua Menu Kadangu
              </h2>

              {/* Semua Fitur */}
              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-3
                  md:grid-cols-4
                  lg:grid-cols-5
                  gap-6 sm:gap-8 md:gap-10
                  place-items-center
                  w-full
                "
              >
                {allFeatures.map((feature, index) => (
                  <MainFeatureItem
                    key={index}
                    feature={feature}
                    onClick={() => handleFeatureClick(feature)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeatureMenu;

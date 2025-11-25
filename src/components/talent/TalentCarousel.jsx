import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TalentCarousel = ({ talents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % talents.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [talents.length]);

  return (
    <>
      {/* Desktop Grid */}
      <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 gap-6">
        {talents.map((t, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="font-bold text-lg">{t.name}</h3>
                <p className="text-sm opacity-90">{t.category}</p>
                <p className="text-xs opacity-70">{t.origin}</p>
              </div>
            </div>
            <div className="p-4 text-sm text-gray-700 line-clamp-3">{t.description}</div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Auto-slide */}
      <div className="sm:hidden relative w-full overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out gap-5 px-4"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {talents.map((t, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <motion.div
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="font-bold text-lg">{t.name}</h3>
                    <p className="text-sm opacity-90">{t.category}</p>
                    <p className="text-xs opacity-70">{t.origin}</p>
                  </div>
                </div>
                <div className="p-4 text-sm text-gray-700 line-clamp-3">{t.description}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TalentCarousel;

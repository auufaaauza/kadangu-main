import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MascotBanner = ({ onButtonClick }) => {
  const handleAction = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="relative bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/90 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 my-8 sm:my-12 overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 sm:w-52 sm:h-52 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-16 -left-16 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center text-center gap-4 sm:gap-6">
        {/* Mascot - Centered and Larger */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            type: "spring",
            stiffness: 100,
          }}
          className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40"
        >
          <img
            src="https://horizons-cdn.hostinger.com/6c65f439-2539-431a-974c-9b9cc7084308/62f8a799932bfaf5bab63bb0ad7ac543.png"
            alt="Kadangu Mascot"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Text Content - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-white max-w-2xl"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Kadangu — Ruang Tumbuh Seni & Seniman Lokal
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
            Kami menghubungkan seniman, penonton, komunitas, dan panggung. Seni
            bukan sekadar tontonan — ini adalah perjalanan, pengalaman, dan
            identitas budaya.
          </p>
        </motion.div>

        {/* Button - Centered */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Button
            onClick={handleAction}
            size="lg"
            className="bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]/90 hover:scale-105 font-bold group rounded-full text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-xl transition-all duration-300"
          >
            Mulai Sekarang
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MascotBanner;

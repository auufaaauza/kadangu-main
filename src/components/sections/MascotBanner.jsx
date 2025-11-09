import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight } from 'lucide-react';

const MascotBanner = () => {
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: "🚧 Fitur ini belum tersedia",
      description: "Anda bisa request fitur ini di prompt berikutnya! 🚀",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="relative bg-[hsl(var(--primary))] rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 my-8 sm:my-12 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 50 }}
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0"
        >
          <img
            src="https://horizons-cdn.hostinger.com/6c65f439-2539-431a-974c-9b9cc7084308/62f8a799932bfaf5bab63bb0ad7ac543.png"
            alt="Kadangu Mascot"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </motion.div>

        <div className="text-center sm:text-left text-white flex-grow">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
            Kadangu — Ruang Tumbuh Seni & Seniman Lokal
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/80 mt-1 sm:mt-2">
            Kami menghubungkan seniman, penonton, komunitas, dan panggung. Seni bukan sekadar tontonan — ini adalah perjalanan, pengalaman, dan identitas budaya.
          </p>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex-shrink-0"
        >
          <Button
            onClick={handleAction}
            size="lg"
            className="bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] font-bold group rounded-full text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
          >
            Mulai
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
      <div className="absolute -bottom-8 sm:-bottom-12 -right-8 sm:-right-12 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full opacity-50"></div>
      <div className="absolute top-0 -left-12 sm:-left-16 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full opacity-30"></div>
    </motion.div>
  );
};

export default MascotBanner;
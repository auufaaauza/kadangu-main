
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

const TalentCard = ({ talent }) => {
  const { toast } = useToast();

  const handleContactClick = () => {
    toast({
      title: "🚀 Siap Berkolaborasi!",
      description: "Fitur Hubungi Kami akan segera hadir untuk menghubungkan Anda dengan talenta luar biasa ini.",
    });
  };

  return (
    <div className="embla__slide embla__slide--talent">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden flex flex-col group h-full"
      >
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative h-64 cursor-pointer overflow-hidden">
              <img
                alt={talent.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
               src="https://images.unsplash.com/photo-1573107571566-426fad25031b" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                 <span className="text-xs font-semibold bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full">{talent.category}</span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-0 bg-black border-0 rounded-lg overflow-hidden">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={talent.videoUrl}
                title={`Karya ${talent.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800">{talent.name}</h3>
          <p className="text-sm font-medium text-gray-500 mt-1">{talent.origin}</p>
          <p className="text-gray-600 text-sm leading-relaxed mt-3 flex-grow">{talent.description}</p>
          <Button
            onClick={handleContactClick}
            className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            Hubungi untuk Kolaborasi
          </Button>
        </div>
      </motion.div>
    </div>
  );
};


const TalentCarousel = ({ talents }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!talents || talents.length === 0) {
    return (
        <div className="text-center py-16 text-gray-500">
            <p>Belum ada talenta di kategori ini.</p>
            <p className="text-sm">Jadilah yang pertama!</p>
        </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-7xl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-2">
          {talents.map((talent) => (
            <TalentCard key={talent.name} talent={talent} />
          ))}
        </div>
      </div>
       {talents.length > 4 && (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 z-10 h-12 w-12 rounded-full bg-white/80 shadow-md hover:bg-white hidden lg:inline-flex"
                onClick={scrollPrev}
            >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-10 h-12 w-12 rounded-full bg-white/80 shadow-md hover:bg-white hidden lg:inline-flex"
                onClick={scrollNext}
            >
                <ChevronRight className="h-6 w-6 text-gray-800" />
            </Button>
        </>
       )}
    </div>
  );
};

export default TalentCarousel;

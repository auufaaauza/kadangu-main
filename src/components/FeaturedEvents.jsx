import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ticket, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedEvents = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1); // Start from 1 for infinite scroll
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const autoSlideRef = useRef(null);

  const events = [
    {
      id: 1,
      title: 'Monolog: Sepotong Senja untuk Pacarku',
      category: 'Teater',
      date: '15 NOVEMBER 2025',
      image: 'A dramatic stage performance with a single actor under a spotlight'
    },
    {
      id: 2,
      title: 'Pagelaran Tari Saman Gayo',
      category: 'Tari',
      date: '22 NOVEMBER 2025',
      image: 'https://images.unsplash.com/photo-1597873839242-a7d3a7a9f731?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Konser Melodi Nusantara',
      category: 'Musik',
      date: '28 NOVEMBER 2025',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Pameran Lukisan "Wajah..."',
      category: 'Seni Rupa',
      date: '05 DESEMBER 2025',
      image: 'https://images.unsplash.com/photo-1547891654-e66ed711b931?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'Malam Puisi & Sastra',
      category: 'Sastra',
      date: '12 DESEMBER 2025',
      image: 'https://images.unsplash.com/photo-1455541502498-63b845575013?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'Pemutaran Film Indie',
      category: 'Film',
      date: '19 DESEMBER 2025',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop'
    },
    {
      id: 7,
      title: 'Festival Jazz Nusantara',
      category: 'Musik',
      date: '26 DESEMBER 2025',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 8,
      title: 'Pertunjukan Wayang Kulit',
      category: 'Budaya',
      date: '02 JANUARI 2026',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop'
    },
  ];

  const handleAction = (eventId) => {
    navigate(`/shows/${eventId}`);
  };

  const totalSlides = Math.ceil(events.length / 2);
  
  // Create infinite slides array
  const createInfiniteSlides = () => {
    const slides = [];
    // Add last slide at the beginning for infinite scroll
    slides.push(totalSlides - 1);
    // Add all original slides
    for (let i = 0; i < totalSlides; i++) {
      slides.push(i);
    }
    // Add first slide at the end for infinite scroll
    slides.push(0);
    return slides;
  };

  const infiniteSlides = createInfiniteSlides();

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
  };

  // Auto-slide functionality
  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        nextSlide();
      }
    }, 3000); // Auto slide every 3 seconds
  };

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  // Handle infinite scroll reset
  useEffect(() => {
    if (currentSlide === infiniteSlides.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(1);
      }, 300);
    } else if (currentSlide === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(infiniteSlides.length - 2);
      }, 300);
    } else {
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [currentSlide, infiniteSlides.length]);

  // Auto-slide effect
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [isPaused, isTransitioning]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAutoSlide();
  }, []);

  const buttonVariants = {
    rest: { y: 0, scale: 1 },
    hover: { y: -4, scale: 1.05 },
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-left mb-8 sm:mb-12 px-4 gap-4 sm:gap-0"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Pertunjukan Unggulan
          </h2>
          <Button
            onClick={() => navigate('/shows')}
            className="bg-primary/10 text-primary hover:bg-primary/20 font-bold text-sm sm:text-base px-4 sm:px-6"
          >
            Lihat Semua
          </Button>
        </motion.div>

        {/* Desktop and Tablet Grid (4 columns) */}
        <div className="hidden sm:grid sm:grid-cols-4 gap-4 sm:gap-6 px-4">
          {events.slice(0, 4).map((event) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col group h-full overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative overflow-hidden w-full aspect-[2/3] flex-grow">
                <img alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1509930854872-0f61005b282e" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-0 left-0 p-3 sm:p-4 text-white">
                  <span className="text-xs bg-black/30 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold">{event.category}</span>
                </div>
                <div className="absolute bottom-0 left-0 p-3 sm:p-4 text-white">
                  <h3 className="font-bold text-lg sm:text-xl drop-shadow-lg line-clamp-2">{event.title}</h3>
                  <p className="text-xs sm:text-sm font-medium text-white/80 mt-1">{event.date}</p>
                </div>
              </div>
              <motion.button
                onClick={() => handleAction(event.id)}
                className="w-full bg-[hsl(var(--primary))] text-white font-bold text-sm sm:text-base py-4 sm:py-5 flex items-center justify-center cursor-pointer"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <motion.span>
                  <Ticket className="w-5 h-5 mr-2 inline-block" />
                  BELI TIKET
                </motion.span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel (2 slides visible) */}
        <div 
          className="sm:hidden relative px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="overflow-hidden" ref={carouselRef}>
            <div 
              className={`flex gap-3 ${isTransitioning ? 'transition-transform duration-300 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {infiniteSlides.map((slideIndex, index) => (
                <div key={`slide-${index}`} className="w-full flex-shrink-0 grid grid-cols-2 gap-3">
                  {events.slice(slideIndex * 2, slideIndex * 2 + 2).map((event) => (
                    <motion.div
                      key={`${event.id}-${index}`}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col group h-full overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative overflow-hidden w-full aspect-[3/4] flex-grow">
                        <img alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1509930854872-0f61005b282e" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute top-0 left-0 p-2 text-white">
                          <span className="text-xs bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full font-semibold">{event.category}</span>
                        </div>
                        <div className="absolute bottom-0 left-0 p-2 text-white">
                          <h3 className="font-bold text-sm drop-shadow-lg line-clamp-2">{event.title}</h3>
                          <p className="text-xs font-medium text-white/80 mt-1">{event.date}</p>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => handleAction(event.id)}
                        className="w-full bg-[hsl(var(--primary))] text-white font-bold text-xs py-3 flex items-center justify-center cursor-pointer"
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <motion.span>
                          <Ticket className="w-4 h-4 mr-1 inline-block" />
                          BELI TIKET
                        </motion.span>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation */}
          <button
            onClick={() => {
              prevSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => {
              nextSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
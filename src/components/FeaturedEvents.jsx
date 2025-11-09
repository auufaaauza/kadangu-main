import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedEvents = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoSlideRef = useRef(null);

  const events = [
    {
      id: 1,
      title: "Monolog: Sepotong Senja untuk Pacarku",
      category: "Teater",
      date: "15 NOVEMBER 2025",
      image:
        "https://images.unsplash.com/photo-1515169067865-5387ec356754?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Pagelaran Tari Saman Gayo",
      category: "Tari",
      date: "22 NOVEMBER 2025",
      image:
        "https://images.unsplash.com/photo-1597873839242-a7d3a7a9f731?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Konser Melodi Nusantara",
      category: "Musik",
      date: "28 NOVEMBER 2025",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 4,
      title: 'Pameran Lukisan "Wajah Indonesia"',
      category: "Seni Rupa",
      date: "05 DESEMBER 2025",
      image:
        "https://images.unsplash.com/photo-1547891654-e66ed711b931?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Malam Puisi & Sastra",
      category: "Sastra",
      date: "12 DESEMBER 2025",
      image:
        "https://images.unsplash.com/photo-1455541502498-63b845575013?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Pemutaran Film Indie Garut",
      category: "Film",
      date: "19 DESEMBER 2025",
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    },
    {
      id: 7,
      title: "Festival Jazz Nusantara",
      category: "Musik",
      date: "26 DESEMBER 2025",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 8,
      title: "Pertunjukan Wayang Kulit",
      category: "Budaya",
      date: "02 JANUARI 2026",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const totalSlides = events.length;

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    autoSlideRef.current = setInterval(nextSlide, 4000);
    return () => clearInterval(autoSlideRef.current);
  }, []);

  const buttonVariants = {
    rest: { y: 0, scale: 1 },
    hover: { y: -3, scale: 1.05 },
  };

  const handleAction = (id) => navigate(`/shows/${id}`);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 px-4 gap-4"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Pertunjukan Unggulan
          </h2>
          <Button
            onClick={() => navigate("/shows")}
            className="bg-primary/10 text-primary hover:bg-primary/20 font-bold text-sm sm:text-base px-4 sm:px-6"
          >
            Lihat Semua
          </Button>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-4 gap-4 sm:gap-6 px-4">
          {events.slice(0, 8).map((event) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full aspect-[2/3] overflow-hidden">
                <img
                  alt={event.title}
                  src={event.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-0 left-0 p-3 text-white">
                  <span className="text-xs bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full font-semibold">
                    {event.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-bold text-lg sm:text-xl drop-shadow-lg line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-white/80 mt-1">
                    {event.date}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => handleAction(event.id)}
                className="w-full bg-[hsl(var(--primary))] text-white font-bold text-sm sm:text-base py-4 sm:py-5 flex items-center justify-center"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
              >
                <Ticket className="w-5 h-5 mr-2" /> BELI TIKET
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Mobile Auto Carousel */}
        <div className="sm:hidden relative px-6">
          <div className="overflow-hidden rounded-2xl">
            <div
              className={`flex transition-transform duration-700 ease-in-out`}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="w-full flex-shrink-0 px-1"
                  style={{
                    flexBasis: "100%",
                  }}
                >
                  <motion.div
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative w-full aspect-[4/5] overflow-hidden">
                      <img
                        alt={event.title}
                        src={event.image}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute top-0 left-0 p-3 text-white">
                        <span className="text-xs bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full font-semibold">
                          {event.category}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-bold text-base drop-shadow-lg line-clamp-2">
                          {event.title}
                        </h3>
                        <p className="text-xs font-medium text-white/80 mt-1">
                          {event.date}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => handleAction(event.id)}
                      className="w-full bg-[hsl(var(--primary))] text-white font-bold text-sm py-4 flex items-center justify-center"
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                    >
                      <Ticket className="w-4 h-4 mr-1" /> BELI TIKET
                    </motion.button>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;

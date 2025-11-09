import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Ticket, ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedEvents = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Pertunjukan Unggulan
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4 mb-4">
            Jelajahi berbagai pertunjukan seni dan budaya terbaik dari seluruh Indonesia. 
            Temukan pengalaman tak terlupakan bersama seniman lokal berbakat.
          </p>
          <button
            onClick={() => navigate("/shows")}
            className="bg-primary/10 text-primary hover:bg-primary/20 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors inline-block"
          >
            Lihat Semua Pertunjukan
          </button>
        </div>

        {/* Mobile & Tablet: Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {events.map((event) => (
                <div key={event.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative w-full aspect-[16/9]">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                          {event.category}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">
                          {event.title}
                        </h3>
                        <p className="text-sm text-white/90">{event.date}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <button
                        onClick={() => navigate(`/shows/${event.id}`)}
                        className="w-full bg-primary text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                      >
                        <Ticket className="w-5 h-5" />
                        BELI TIKET
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: 3 Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative w-full aspect-[2/3]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-primary text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                    {event.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-base mb-1.5 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-xs text-white/90">{event.date}</p>
                </div>
              </div>
              <div className="p-4">
                <button
                  onClick={() => navigate(`/shows/${event.id}`)}
                  className="w-full bg-primary text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <Ticket className="w-4 h-4" />
                  BELI TIKET
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;

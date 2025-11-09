import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BannerSlide = ({ banner, index, total, isActive }) => {
  const [loading, setLoading] = useState(true);
  const imageRef = useRef(null);

  const handleClick = () => {
    if (banner.route) window.location.href = banner.route;
    else if (banner.href) window.open(banner.href, "_blank");
  };

  // Parallax zoom effect saat slide aktif
  useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current;
      
      if (isActive) {
        // Reset ke scale normal terlebih dahulu
        img.style.transform = 'scale(1)';
        img.style.transition = 'transform 300ms ease-out';
        
        // Animate zoom dengan smooth transition setelah delay
        const animateZoom = () => {
          img.style.transition = 'transform 4800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          img.style.transform = 'scale(1.08)';
        };
        
        // Delay untuk smooth entrance
        const timer = setTimeout(animateZoom, 200);
        
        return () => {
          clearTimeout(timer);
        };
      } else {
        // Reset untuk slide yang tidak aktif
        img.style.transition = 'transform 400ms ease-out';
        img.style.transform = 'scale(1)';
      }
    }
  }, [isActive]);

  return (
    <div
      className="relative w-full group cursor-pointer transition-transform duration-500"
      onClick={handleClick}
    >
      <div className="relative w-full overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
          {loading && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl md:rounded-2xl" />
          )}
          <img
            ref={imageRef}
            src={banner.image}
            alt={banner.title}
            className={`w-full h-full object-cover transition-opacity duration-500 banner-image ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setLoading(false)}
            loading={index < 3 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 md:p-4">
          <p className="text-white text-sm md:text-base font-semibold line-clamp-2 drop-shadow-md">
            {banner.title}
          </p>
          {banner.category && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
              {banner.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Banner = ({ banners = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // Fallback data jika banners tidak ada atau kosong
  const defaultBanners = [
    {
      image: 'https://images.unsplash.com/photo-1541515929569-17715236c398?q=80&w=2070&auto=format&fit=crop',
      title: 'Yuk, Solo Travel!',
      category: 'Wisata Seni',
    },
    {
      image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop',
      title: 'Wisata Garut',
      category: 'Lebih Gampang, Lebih Murah',
    },
    {
      image: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?q=80&w=1992&auto=format&fit=crop',
      title: 'Let\'s Go!',
      category: 'With Kadangu',
    },
  ];

  const displayBanners = banners.length > 0 ? banners : defaultBanners;

  // Handle slide change untuk parallax effect
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="w-full bg-transparent relative">
        <div className="w-full max-w-[1580px] mx-auto px-4 pt-6 md:pt-8">
        {/* Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 group">
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors" />
        </div>
        <div className="swiper-button-next-custom absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 group">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors" />
        </div>

        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          allowTouchMove={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          speed={800}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full banner-swiper"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 12 },
            480: { slidesPerView: 1.2, spaceBetween: 14 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 2.5, spaceBetween: 18 },
            1024: { slidesPerView: 3, spaceBetween: 22 },
            1280: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {displayBanners.map((banner, i) => (
            <SwiperSlide key={i}>
              <BannerSlide 
                banner={banner} 
                index={i} 
                total={displayBanners.length}
                isActive={i === activeIndex}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
    </div>
  );
};

export default Banner;

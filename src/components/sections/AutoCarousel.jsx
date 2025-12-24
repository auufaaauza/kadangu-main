import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const BannerSlide = ({ banner, isCenter }) => {
  const [loading, setLoading] = useState(true);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  // Efek scale container & highlight tengah
  useEffect(() => {
    if (!imageRef.current || !overlayRef.current || !containerRef.current)
      return;
    const img = imageRef.current;
    const overlay = overlayRef.current;
    const container = containerRef.current;

    if (isCenter) {
      container.style.transform = "scale(1.03)";
      container.style.opacity = "1";
      container.style.transition =
        "transform 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 600ms ease";

      img.style.transition = "transform 4s ease-out, filter 1s ease-out";
      img.style.transform = "scale(1.05)";
      img.style.filter = "brightness(1.05) contrast(1.1)";
      overlay.style.background = "rgba(0,0,0,0)";
      container.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
    } else {
      container.style.transform = "scale(0.96)";
      container.style.opacity = "0.7";
      container.style.transition =
        "transform 800ms ease-out, opacity 600ms ease";
      img.style.transition = "transform 1s ease-out, filter 0.8s ease-out";
      img.style.transform = "scale(1)";
      img.style.filter = "brightness(0.75) contrast(0.9)";
      overlay.style.background =
        "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.45))";
      container.style.boxShadow = "0 12px 20px rgba(0,0,0,0.06)";
    }
  }, [isCenter]);

  // Parallax motion kiri-kanan halus untuk slide tengah
  useEffect(() => {
    if (!imageRef.current) return;
    const img = imageRef.current;
    let anim;
    if (isCenter) {
      let pos = 0;
      const animate = () => {
        pos += 0.04;
        const offset = Math.sin(pos) * 6; // 6px kiri-kanan
        img.style.transform = `scale(1.05) translateX(${offset}px)`;
        anim = requestAnimationFrame(animate);
      };
      anim = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(anim);
  }, [isCenter]);

  return (
    <div
      ref={containerRef}
      className="relative w-full transition-transform duration-700 ease-out cursor-pointer select-none overflow-visible"
      onClick={() => {
        if (banner.route) window.location.href = banner.route;
        else if (banner.href) window.open(banner.href, "_blank");
      }}
      style={{
        willChange: "transform, opacity",
        borderRadius: "1rem",
      }}
    >
      <div
        className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-transparent"
        style={{
          WebkitMaskImage:
            "radial-gradient(white 99%, rgba(255,255,255,0.5) 100%)",
          maskImage: "radial-gradient(white 99%, rgba(255,255,255,0.5) 100%)",
          transition: "box-shadow 0.8s ease",
        }}
      >
        {loading && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}

        <img
          ref={imageRef}
          src={banner.image}
          alt={banner.title}
          onLoad={() => setLoading(false)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          draggable={false}
        />

        {/* Overlay lembut */}
        <div
          ref={overlayRef}
          className="absolute inset-0 transition-all duration-700 pointer-events-none"
        />

        {/* Text content */}
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
  const [apiBanners, setApiBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:8000/api"
          }/banners`
        );
        const data = await response.json();

        if (data.success && data.data.length > 0) {
          // Map API data to banner format
          const mappedBanners = data.data.map((banner) => ({
            image: banner.image,
            title: banner.title,
            href: banner.link,
            category: null, // Optional: add category field to backend if needed
          }));
          setApiBanners(mappedBanners);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Fallback banners
  const defaultBanners = [
    {
      image:
        "https://images.unsplash.com/photo-1541515929569-17715236c398?q=80&w=2070&auto=format&fit=crop",
      title: "Yuk, Solo Travel!",
      category: "Wisata Seni",
    },
    {
      image:
        "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop",
      title: "Wisata Garut",
      category: "Lebih Gampang, Lebih Murah",
    },
    {
      image:
        "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?q=80&w=1992&auto=format&fit=crop",
      title: "Let's Go!",
      category: "With Kadangu",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2069&auto=format&fit=crop",
      title: "Pentas Teater",
      category: "Kisah Penuh Makna",
    },
  ];

  // Use API banners if available, otherwise use default
  const displayBanners = apiBanners.length > 0 ? apiBanners : defaultBanners;

  return (
    <div className="relative w-full bg-transparent">
      <div className="w-full max-w-[1580px] mx-auto pt-6 md:pt-8 relative overflow-x-hidden">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={1200}
          loop={displayBanners.length >= 3}
          loopAdditionalSlides={displayBanners.length >= 3 ? 2 : 0}
          centeredSlides
          slidesPerView={3}
          slidesPerGroup={1}
          spaceBetween={28}
          centeredSlidesBounds
          className="banner-swiper overflow-visible px-2 sm:px-4 lg:px-6 py-8"
          breakpoints={{
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 16,
              centeredSlides: true,
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 20,
              centeredSlides: true,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 1,
              spaceBetween: 30,
              centeredSlides: true,
            },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {displayBanners.map((banner, i) => (
            <SwiperSlide key={i} className="overflow-visible">
              <BannerSlide banner={banner} isCenter={i === activeIndex} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;

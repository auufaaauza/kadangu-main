import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiCall } from "@/lib/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay } from "swiper/modules";

import "swiper/css";

const TopTalents = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopTalents = async () => {
      try {
        const response = await apiCall("/talents/top-rated");
        setCategories(response || []);
      } catch (error) {
        console.error("Error fetching top talents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTalents();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading talents...</div>;
  }

  if (!categories.length) return null;

  return (
    <section className="relative py-10 mb-12 bg-gradient-to-b from-gray-50 to-white rounded-3xl overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-10 text-gray-900">
          Talenta Pilihan <span className="text-purple-600">Terbaik</span>
        </h2>

        <div className="space-y-20">
          {categories.map((category) => (
            <div key={category.id} className="relative">
              {/* Category title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-1 bg-purple-600 rounded-full" />
                <h3 className="text-lg font-bold text-gray-800">
                  {category.nama}
                </h3>
              </div>

              <Swiper
                modules={[Parallax, Autoplay]}
                speed={1200}
                parallax={{ enabled: true }}
                watchSlidesProgress
                grabCursor
                loop
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                spaceBetween={24}
                className="!overflow-visible"
                breakpoints={{
                  0: { slidesPerView: 1.2, spaceBetween: 16 },
                  768: { slidesPerView: 2.2, spaceBetween: 20 },
                  1024: { slidesPerView: 3.2, spaceBetween: 24 },
                }}
              >
                {category.talents.map((talent) => (
                  <SwiperSlide key={talent.id} className="max-w-[280px]">
                    <Link
                      to={`/talent/${talent.id}`}
                      className="group relative block h-[380px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                    >
                      {/* 🖼️ Background (slowest) */}
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${
                            talent.photo
                              ? `http://localhost:8000/storage/${talent.photo}`
                              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  talent.name
                                )}&background=random`
                          })`,
                        }}
                        data-swiper-parallax="-30%"
                        data-swiper-parallax-scale="1.2"
                      />

                      {/* 🌫️ Overlay (medium) */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                        data-swiper-parallax="-15%"
                      />

                      {/* ✨ Content (fastest) */}
                      <div
                        className="absolute inset-0 p-5 flex flex-col justify-end text-white"
                        data-swiper-parallax="-200"
                      >
                        {/* Rating */}
                        <div
                          className="absolute top-4 right-4"
                          data-swiper-parallax="-100"
                        >
                          <div className="bg-white/20 backdrop-blur border border-white/30 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <svg
                              className="w-3.5 h-3.5 text-yellow-400 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs font-bold">
                              {talent.rating || "N/A"}
                            </span>
                          </div>
                        </div>

                        {/* Text */}
                        <span className="inline-block w-fit px-2 py-0.5 bg-purple-600/90 rounded text-[10px] font-bold uppercase mb-2">
                          {talent.genre}
                        </span>

                        <h3 className="text-xl font-bold leading-tight mb-1">
                          {talent.name}
                        </h3>

                        <p className="text-xs text-gray-300 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {talent.bio}
                        </p>

                        {/* Price */}
                        <div className="flex items-center justify-between border-t border-white/20 pt-3">
                          <div>
                            <p className="text-[10px] uppercase text-gray-400">
                              Mulai dari
                            </p>
                            <p className="text-base font-bold text-purple-300">
                              Rp{" "}
                              {new Intl.NumberFormat("id-ID").format(
                                talent.base_price
                              )}
                            </p>
                          </div>

                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-purple-600 transition">
                            →
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopTalents;

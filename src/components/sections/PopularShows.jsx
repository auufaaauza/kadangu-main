import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiCall } from "@/lib/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay } from "swiper/modules";

import "swiper/css";

const PopularShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await apiCall(
          "/pertunjukan?sort_by=created_at&sort_order=desc&per_page=6"
        );
        setShows(response.data || []);
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading shows...</div>;
  }

  if (!shows.length) return null;

  return (
    <section className="relative py-10 mb-12 overflow-hidden">
      {/* Background blob */}
      <div className="absolute -top-20 -left-32 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-20 -right-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">
          Pertunjukan{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Terbaru
          </span>
        </h2>

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
          className="!overflow-visible py-6"
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 16 },
            768: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.2, spaceBetween: 24 },
          }}
        >
          {shows.map((show) => (
            <SwiperSlide key={show.id} className="max-w-[320px]">
              <Link
                to={`/pertunjukan/${show.id}`}
                className="group relative block h-[420px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                {/* 🖼️ Background Image (slowest) */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(http://localhost:8000/storage/${show.banner})`,
                  }}
                  data-swiper-parallax="-30%"
                  data-swiper-parallax-scale="1.25"
                />

                {/* 🌫️ Overlay (medium) */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                  data-swiper-parallax="-15%"
                />

                {/* ✨ Content (fastest) */}
                <div
                  className="absolute inset-0 p-6 flex flex-col justify-end text-white"
                  data-swiper-parallax="-200"
                >
                  {/* Artist */}
                  <span className="mb-3 inline-block text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 w-fit">
                    {show.artist_group?.nama || "Seni Pertunjukan"}
                  </span>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-purple-300 text-sm mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(show.tanggal_pertunjukan).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2">
                    {show.judul}
                  </h3>

                  {/* Location */}
                  <p className="text-sm text-gray-300 truncate mb-4">
                    {show.lokasi}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <p className="text-[10px] uppercase text-gray-400">
                        Mulai dari
                      </p>
                      <span className="text-lg font-bold">
                        Rp {new Intl.NumberFormat("id-ID").format(show.harga)}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center group-hover:scale-110 transition">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularShows;

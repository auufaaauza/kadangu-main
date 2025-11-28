import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useToast } from "@/components/ui/use-toast";
import "swiper/css"; // ⚡ cukup import ini saja, tanpa pagination

const NewsCarousel = ({ newsItems }) => {
  const { toast } = useToast();

  const handleReadMore = () => {
    toast({
      title: "🚧 Halaman detail berita belum ada!",
    });
  };

  return (
    <div className="px-4 py-6">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="rounded-2xl"
      >
        {newsItems?.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col cursor-pointer group"
              onClick={handleReadMore}
            >
              <img
                src={item.imgSrc}
                alt={item.alt}
                className="rounded-xl w-full h-48 object-cover mb-3 group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-sm text-[hsl(var(--primary))] bg-[hsl(var(--secondary))]/20 py-1 px-3 rounded-full self-start font-semibold mb-2">
                {item.category}
              </span>
              <h3 className="font-bold text-lg mb-2 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm flex-grow">{item.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                <span>Oleh {item.author}</span>
                <span>{item.date}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsCarousel;

import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Heart, Users, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TheaterCategoryBadge } from "@/components/theater/TheaterCategoryBadge";

export function TheaterCard({ show }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div>
      <div className="group h-full rounded-2xl bg-white dark:bg-card overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex flex-col">

        {/* IMAGE */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
          <img
            src={show.image}
            alt={show.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Favorite button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-white transition"
          >
            <Heart
              size={20}
              className={cn(
                "transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-slate-700"
              )}
            />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-4 flex flex-col">

          <h3 className="text-xl font-heading font-bold mb-1">
            {show.name}
          </h3>

          <div className="flex gap-2 flex-wrap mb-3">
            <TheaterCategoryBadge category={show.category} />

            <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold">
              {show.duration}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
            {show.description}
          </p>

          <div className="space-y-2 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{show.members} Pemain</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{show.location}</span>
            </div>
          </div>

          <RouterLink to={`/theater/detail/${show.id}`} className="mt-auto">
            <Button className="w-full">Lihat Detail</Button>
          </RouterLink>
        </div>
      </div>
    </div>
  );
}

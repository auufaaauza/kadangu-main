import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Heart, Users, MapPin, Music, Play } from "lucide-react";
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "./CategoryBadge";
import { VideoModal } from "./VideoModal";

export function ArtistCard({ artist }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div>
      <div className="group h-full rounded-2xl bg-white dark:bg-card overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex flex-col">
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <button
            onClick={() => setShowVideo(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300"
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 p-3 rounded-full">
              <Play size={24} className="text-primary fill-primary" />
            </div>
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur p-2 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors"
          >
            <Heart
              size={20}
              className={cn(
                "transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-slate-600 dark:text-slate-300"
              )}
            />
          </button>
        </div>

        <div className="flex-1 p-4 flex flex-col">
          <div className="mb-2">
            <h3 className="text-xl font-heading font-bold text-foreground mb-1">
              {artist.name}
            </h3>
            <div className="flex gap-2 flex-wrap mb-2">
              <CategoryBadge category={artist.category} />
              <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold">
                {artist.genre}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 flex-1">{artist.description}</p>

          <div className="space-y-2 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{artist.members} anggota</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{artist.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Music size={16} />
              <span className="font-semibold text-primary">{artist.price}</span>
            </div>
          </div>

          <RouterLink to={`/music/booking/${artist.id}`}>
            <Button className="w-full" size="default">
              Pesan Sekarang
            </Button>
          </RouterLink>
        </div>
      </div>

      <VideoModal artist={artist} isOpen={showVideo} onClose={() => setShowVideo(false)} />
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Instagram, Youtube, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TalentCategoryBadge } from "@/components/talent/TalentCategoryBadge";
import { TalentNicheBadge } from "@/components/talent/TalentNicheBadge";
import { cn } from "@/lib/utils";

export function TalentCard({ talent }) {
  const [love, setLove] = useState(false);

  return (
    <div className="
      group rounded-2xl overflow-hidden shadow-md hover:shadow-xl 
      hover:-translate-y-1 transition bg-card 
      border border-border
    ">
      
      {/* IMAGE */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={talent.image}
          alt={talent.name}
          className="w-full h-full object-cover transition group-hover:scale-110"
        />

        {/* Favorite Button */}
        <button
          className="
            absolute top-2 right-2 bg-white/90 p-2 
            rounded-full shadow hover:bg-white transition
          "
          onClick={() => setLove(!love)}
        >
          <Heart
            size={18}
            className={cn(
              love ? "text-red-500 fill-red-500" : "text-gray-600"
            )}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 flex flex-col">

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-2">
          <TalentCategoryBadge category={talent.category} small />
          <TalentNicheBadge niche={talent.niche} small />
        </div>

        {/* NAME */}
        <h3 className="text-lg font-bold leading-tight">{talent.name}</h3>
        <p className="text-xs text-muted-foreground -mt-1 mb-2 capitalize">
          {talent.category}
        </p>

        {/* DESCRIPTION */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {talent.description}
        </p>

        {/* LOCATION */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <MapPin size={14} />
          Garut
        </div>

        {/* FOLLOWERS */}
        <div className="text-xs space-y-1 mb-3">
          {talent.followers.instagram && (
            <div className="flex items-center gap-2">
              <Instagram size={14} className="text-pink-600" />
              Instagram: <strong>{talent.followers.instagram.toLocaleString()}</strong>
            </div>
          )}

          {talent.followers.tiktok && (
            <div className="flex items-center gap-2">
              <Music size={14} className="text-black" />
              TikTok: <strong>{talent.followers.tiktok.toLocaleString()}</strong>
            </div>
          )}

          {talent.followers.youtube && (
            <div className="flex items-center gap-2">
              <Youtube size={14} className="text-red-600" />
              YouTube: <strong>{talent.followers.youtube.toLocaleString()}</strong>
            </div>
          )}
        </div>

        {/* BUTTON */}
        <Link to={`/talent/detail/${talent.id}`} className="mt-auto">
          <Button className="w-full py-2.5 text-sm rounded-xl">
            Lihat Detail
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Heart, Users, MapPin, Star } from "lucide-react";
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { BookingTalentDialog } from "@/components/talent/BookingTalentDialog";

export function TalentCard({ talent, type = "talent" }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <div className="group h-full rounded-2xl bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex flex-col border border-gray-100">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img
            src={talent.image}
            alt={talent.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <Heart
              size={20}
              className={cn(
                "transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              )}
            />
          </button>

          {/* Rating Badge */}
          {talent.rating && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-900">{talent.rating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {talent.name}
            </h3>
            <div className="flex gap-2 flex-wrap mb-2">
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">
                {talent.genre}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">
            {talent.description}
          </p>

          {/* Info */}
          <div className="space-y-2 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-teal-600" />
              <span>{talent.members} anggota</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-teal-600" />
              <span>{talent.location}</span>
            </div>
            {talent.totalBookings && (
              <div className="flex items-center gap-2">
                <Star size={16} className="text-teal-600" />
                <span>{talent.totalBookings}+ booking</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-teal-600 text-base">{talent.price}</span>
            </div>
          </div>

          {/* Button */}
          <Button
            onClick={() => setShowBooking(true)}
            className="w-full bg-teal-600 hover:bg-teal-800 text-white"
            size="default"
          >
            Booking Sekarang
          </Button>
        </div>
      </div>

      {/* Booking Dialog */}
      <BookingTalentDialog
        open={showBooking}
        onOpenChange={setShowBooking}
        talentName={talent.name}
        talentCategory={talent.genre}
        talentNiche={talent.specialties?.join(", ") || talent.category}
      />
    </>
  );
}

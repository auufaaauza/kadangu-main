import { X, MapPin } from "lucide-react";

export function VideoModal({ artist, isOpen, onClose }) {
  if (!isOpen || !artist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-card rounded-2xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-slate-800/90 p-2 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors"
        >
          <X size={24} className="text-slate-600 dark:text-slate-300" />
        </button>
        <div className="relative w-full pb-[56.25%] bg-slate-900">
          <iframe
            src={artist.videoUrl}
            title={`${artist.name} - Video`}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
            {artist.name}
          </h3>
          <p className="text-muted-foreground mb-4">{artist.genre}</p>
          <div className="flex items-center gap-2 text-foreground mb-4">
            <MapPin size={18} className="text-primary" />
            <span className="font-semibold">{artist.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

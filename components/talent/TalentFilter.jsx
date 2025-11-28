import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function TalentFilter({ platform, setPlatform, niche, setNiche, niches }) {
  const platforms = ["instagram", "tiktok", "youtube"];
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const closePopup = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setOpen(false);
    }, 300); // durasi animasi
  };

  return (
    <>
      {/* === MOBILE FILTER BUTTON (UPGRADE) === */}
      <div className="sm:hidden w-full max-w-2xl mx-auto mb-6 px-4">
        <button
          onClick={() => setOpen(true)}
          className="
            w-full py-3 rounded-xl font-semibold
            bg-primary text-primary-foreground
            shadow-lg shadow-primary/20 transition-all
            active:scale-[0.97] duration-300
            flex items-center justify-center gap-2
          "
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 5h18M6 12h12M10 19h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Filter Talent
        </button>
      </div>

      {/* === DESKTOP FILTER === */}
      <div className="hidden sm:block mb-10 w-full max-w-2xl mx-auto">
        {/* PLATFORM */}
        <div className="mb-4">
          <div className="text-sm font-semibold text-muted-foreground mb-2 ml-1">Platform</div>
          <div className="flex gap-2 flex-wrap justify-center">
            <Button
              variant={!platform ? "default" : "outline"}
              className="rounded-full text-xs px-4 py-2"
              onClick={() => setPlatform(null)}
            >
              Semua Platform
            </Button>

            {platforms.map((p) => (
              <Button
                key={p}
                variant={platform === p ? "default" : "outline"}
                className="rounded-full capitalize text-xs px-4 py-2"
                onClick={() => setPlatform(p)}
              >
                {p}
              </Button>
            ))}
          </div>
        </div>

        {/* NICHE */}
        <div>
          <div className="text-sm font-semibold text-muted-foreground mb-2 ml-1">Niche</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Button
              variant={!niche ? "default" : "outline"}
              className="rounded-full text-xs px-4 py-2"
              onClick={() => setNiche(null)}
            >
              Semua Niche
            </Button>

            {Array.isArray(niches) &&
              niches.map((n) => (
                <Button
                  key={n}
                  variant={niche === n ? "default" : "outline"}
                  className="rounded-full capitalize text-xs px-4 py-2"
                  onClick={() => setNiche(n)}
                >
                  {n}
                </Button>
              ))}
          </div>
        </div>
      </div>

      {/* === MOBILE POPUP (BOTTOM SHEET) === */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:hidden">

          {/* OVERLAY */}
          <div
            className={`
              absolute inset-0 backdrop-blur-sm
              ${closing ? "animate-fadeOut" : "animate-fadeIn"}
              bg-black/40
            `}
            onClick={closePopup}
          ></div>

          {/* SHEET */}
          <div
            className={`
              relative w-full bg-white rounded-t-3xl p-6 shadow-xl
              ${closing ? "animate-slideDown" : "animate-slideUp"}
            `}
          >
            {/* DRAG HANDLE */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Filter Talent</h3>
              <button onClick={closePopup}>
                <X size={22} />
              </button>
            </div>

            {/* PLATFORM */}
            <div className="mb-6">
              <p className="font-semibold mb-2 text-gray-700">Platform</p>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!platform ? "default" : "outline"}
                  className="rounded-full text-xs px-4 py-2"
                  onClick={() => setPlatform(null)}
                >
                  Semua Platform
                </Button>

                {platforms.map((p) => (
                  <Button
                    key={p}
                    variant={platform === p ? "default" : "outline"}
                    className="rounded-full capitalize text-xs px-4 py-2"
                    onClick={() => setPlatform(p)}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>

            {/* NICHE */}
            <div className="mb-6">
              <p className="font-semibold mb-2 text-gray-700">Kategori Konten</p>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={!niche ? "default" : "outline"}
                  className="rounded-full text-xs px-4 py-2"
                  onClick={() => setNiche(null)}
                >
                  Semua Kategori
                </Button>

                {niches.map((n) => (
                  <Button
                    key={n}
                    variant={niche === n ? "default" : "outline"}
                    className="rounded-full capitalize text-xs px-4 py-2"
                    onClick={() => setNiche(n)}
                  >
                    {n}
                  </Button>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPlatform(null);
                  setNiche(null);
                }}
              >
                Reset
              </Button>

              <Button className="w-full" onClick={closePopup}>
                Terapkan
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

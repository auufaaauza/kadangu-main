import { useState } from "react";
import { HeartHandshake as Handshake } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WORKSHOP_FACILITATORS } from "@/data/workshopData";
import { ArtistCard } from "@/components/music/ArtistCard";

export function WorkshopPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredArtists = selectedCategory
    ? WORKSHOP_FACILITATORS.filter((a) => a.category === selectedCategory)
    : WORKSHOP_FACILITATORS;

  const categories = ["creative", "craft", "performance"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Handshake className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 leading-tight">
            Temukan & Pesan
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Fasilitator Workshop Terbaik
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Platform digital terpercaya untuk menemukan dan memesan fasilitator workshop profesional. 
            Dari workshop kreatif hingga kerajinan, kami punya semua yang Anda butuhkan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Jelajahi Workshop</Button>
            <Button size="lg" variant="outline" className="border-primary text-primary">Cara Kerja</Button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-card py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-2">40+</div>
              <p className="text-muted-foreground">Fasilitator Tersedia</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-accent mb-2">250+</div>
              <p className="text-muted-foreground">Workshop Selesai</p>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-secondary mb-2">100%</div>
              <p className="text-muted-foreground">Pelanggan Puas</p>
            </div>
          </div>
        </div>
      </div>

      <section id="artists" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">Fasilitator Workshop Unggulan</h2>
            <p className="text-lg text-muted-foreground mb-8">Pilih dari koleksi fasilitator workshop terbaik kami</p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => setSelectedCategory(null)}
                variant={selectedCategory === null ? "default" : "outline"}
                className={selectedCategory === null ? "" : "border-border"}
              >
                Semua
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className={selectedCategory === cat ? "" : "border-border"}
                >
                  {cat === "creative" ? "Kreatif" : cat === "craft" ? "Kerajinan" : "Pertunjukan"}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary to-accent py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">Siap untuk Memesan?</h2>
          <p className="text-lg mb-8 opacity-90">Hubungi kami untuk paket khusus dan diskon untuk acara besar Anda</p>
          <Button size="lg" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary">Mulai Sekarang</Button>
        </div>
      </section>
    </div>
  );
}

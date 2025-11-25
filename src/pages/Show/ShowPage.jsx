import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHOWS_ARTISTS } from "@/data/showsData";
import { categoryLabels } from "@/components/show/CategoryBadge";
import { ShowCard } from "@/components/show/ShowCard";

export function ShowPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const FilteredShow = selectedCategory
    ? SHOWS_ARTISTS.filter((s) => s.category === selectedCategory)
    : SHOWS_ARTISTS;

  const categories = ["variety", "magic","comedy","acrobatic"]

  return (
    <div className="min-h-screen bg-background text-foreground">

      <section id="artists" className="pt-6 pb-12 sm:pt-8 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">Pertunjukkan</h2>
            <p className="text-lg text-muted-foreground mb-8">Pilih Pertunjukkan yang terbaik dari kami</p>

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
                  {categoryLabels[cat] ?? cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FilteredShow.map((show) => (
              <ShowCard key={show.id} show={show} />
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

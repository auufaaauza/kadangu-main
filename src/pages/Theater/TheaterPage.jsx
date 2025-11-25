import { useState } from "react";
import { Button } from "@/components/ui/button";
import { THEATER_DATA } from "@/data/theaterData";
import { TheaterCard } from "@/components/theater/TheaterCard";

export default function TheaterPage() {
  const [category, setCategory] = useState(null);

  const categories = Array.from(new Set(THEATER_DATA.map((d) => d.category)));

  const filtered = category
    ? THEATER_DATA.filter((d) => d.category === category)
    : THEATER_DATA;

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">

      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 blur-3xl rounded-full opacity-40"></div>
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-accent/10 blur-3xl rounded-full opacity-40"></div>

      <section className="relative pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Teater & Drama</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Nikmati pertunjukan drama, monolog, komedi panggung, dan teater tradisional Garut.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              onClick={() => setCategory(null)}
              variant={category === null ? "default" : "outline"}
              className={`rounded-full px-5 py-2 ${category === null && "shadow-md scale-[1.04]"}`}
            >
              Semua
            </Button>

            {categories.map((c) => (
              <Button
                key={c}
                onClick={() => setCategory(c === category ? null : c)}
                variant={category === c ? "default" : "outline"}
                className={`rounded-full px-5 py-2 ${category === c && "shadow-md scale-[1.04]"}`}
              >
                {c}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((show, index) => (
              <div
                key={show.id}
                className="animate-in zoom-in duration-500"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <TheaterCard show={show} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-16 text-muted-foreground text-lg">Tidak ada data teater.</div>
          )}
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DANCE_DATA } from "@/data/danceData";
import { DanceCard } from "@/components/dance/DanceCard";

export default function DancePage() {
  const [category, setCategory] = useState(null);

  const categories = Array.from(new Set(DANCE_DATA.map((d) => d.category)));

  const filtered = category
    ? DANCE_DATA.filter((d) => d.category === category)
    : DANCE_DATA;

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">

      {/* SUBTLE BACKGROUND ELEMENTS */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 blur-3xl rounded-full opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-accent/10 blur-3xl rounded-full opacity-40 pointer-events-none"></div>

      <section className="relative pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700">

          {/* TITLE */}
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4 tracking-tight">
            Pertunjukan Tari
          </h1>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Eksplorasi penampilan tari tradisional, modern, K-Pop dance cover, hingga street performance dengan kualitas terbaik.
          </p>

          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">

            <Button
              onClick={() => setCategory(null)}
              variant={category === null ? "default" : "outline"}
              className={`
                rounded-full px-5 py-2 transition-all
                ${category === null ? "shadow-md scale-[1.04]" : ""}
              `}
            >
              Semua
            </Button>

            {categories.map((c) => (
              <Button
                key={c}
                onClick={() => setCategory(category === c ? null : c)}
                variant={category === c ? "default" : "outline"}
                className={`
                  rounded-full px-5 py-2 transition-all
                  ${category === c ? "shadow-md scale-[1.04]" : ""}
                `}
              >
                {c}
              </Button>
            ))}
          </div>

          {/* GRID OF CARDS */}
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8
              animate-in fade-in-50 duration-700
            "
          >
            {filtered.map((dance, index) => (
              <div
                key={dance.id}
                className="animate-in zoom-in duration-500"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <DanceCard dance={dance} />
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filtered.length === 0 && (
            <div className="mt-16 text-muted-foreground text-lg animate-in fade-in duration-500">
              Tidak ada pertunjukan untuk kategori ini.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

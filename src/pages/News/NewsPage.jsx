import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NEWS_DATA } from "@/data/newsData";
import { NewsCard } from "@/components/news/NewsCard";
import { Search } from "lucide-react";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Ambil kategori unik dari NEWS_DATA
  const categories = Array.from(
    new Set(NEWS_DATA.map((n) => n.category))
  ).filter(Boolean);

  // FILTER BERDASARKAN SEARCH + CATEGORY
  const filteredNews = NEWS_DATA.filter((news) => {
    const matchCategory =
      !selectedCategory || news.category === selectedCategory;

    const q = searchQuery.toLowerCase();

    const matchSearch =
      news.title.toLowerCase().includes(q) ||
      news.content.toLowerCase().includes(q) ||
      news.author.toLowerCase().includes(q) ||
      news.category.toLowerCase().includes(q);

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* SECTION NEWS LIST */}
      <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Berita & Artikel
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Informasi terbaru seputar seni, budaya, hiburan, dan komunitas kreatif.
            </p>

            {/* === SEARCH BAR === */}
            <div className="max-w-md mx-auto mb-8 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="text"
                placeholder="Cari berita, kategori, penulis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl"
              />
            </div>

            {/* CATEGORY FILTER */}
            <div className="flex flex-wrap justify-center gap-3">
              {/* ALL */}
              <Button
                onClick={() => setSelectedCategory(null)}
                variant={selectedCategory === null ? "default" : "outline"}
                className={selectedCategory === null ? "" : "border-border"}
              >
                Semua
              </Button>

              {/* EACH CATEGORY */}
              {categories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className={selectedCategory === cat ? "" : "border-border"}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* GRID NEWS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredNews.length === 0 && (
            <div className="text-center text-muted-foreground mt-10 text-lg">
              Tidak ada berita yang cocok dengan pencarian.
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-primary to-accent py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            Punya berita atau press release?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Kirimkan kepada kami untuk diterbitkan di portal berita Nempo.
          </p>
          <Button
            size="lg"
            className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary"
          >
            Kirim Berita
          </Button>
        </div>
      </section>

    </div>
  );
}

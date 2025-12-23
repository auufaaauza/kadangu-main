import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  Search,
  Filter,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchNews } from "@/lib/api";

const NewsPage = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Event", "Prestasi", "Workshop", "Budaya"];

  // Fetch news from API
  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchNews({
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          search: searchQuery || undefined,
        });

        const newsData = (response.data || response).map((item, index) => ({
          id: item.id,
          title: item.judul,
          excerpt: item.konten
            ? item.konten.substring(0, 150) + "..."
            : "Baca selengkapnya...",
          image: item.gambar
            ? `http://localhost:8000/storage/${item.gambar}`
            : "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
          category: item.kategori?.nama || "Berita",
          author: "Admin Kadangu",
          date: item.created_at || new Date().toISOString(),
          readTime: "5 min",
          featured: index === 0, // First item is featured
        }));

        setNews(newsData);
      } catch (err) {
        console.error("Error loading news:", err);
        setError("Gagal memuat berita. Silakan coba lagi.");
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [selectedCategory, searchQuery]);

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredNews = filteredNews.find((item) => item.featured);
  const regularNews = filteredNews.filter((item) => !item.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Berita Seni & Budaya
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Ikuti perkembangan terkini seputar seni dan budaya Indonesia
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-white border border-border hover:border-primary"
                }`}
              >
                {category === "all" ? "Semua" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Memuat berita...</p>
          </div>
        ) : (
          <>
            {/* Featured News */}
            {featuredNews && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold">Berita Utama</h2>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-full">
                      <img
                        src={featuredNews.image}
                        alt={featuredNews.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                          {featuredNews.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                          {featuredNews.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 line-clamp-3">
                          {featuredNews.excerpt}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{featuredNews.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(featuredNews.date).toLocaleDateString(
                                "id-ID"
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{featuredNews.readTime}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => navigate(`/news/${featuredNews.id}`)}
                          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 group"
                        >
                          Baca Selengkapnya
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Regular News Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Berita Terbaru</h2>

              {regularNews.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularNews.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group cursor-pointer"
                      onClick={() => navigate(`/news/${item.id}`)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-secondary text-foreground px-3 py-1 rounded-full text-xs font-medium">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold mb-2 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {item.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(item.date).toLocaleDateString("id-ID")}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{item.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl">
                  <p className="text-muted-foreground">
                    Tidak ada berita ditemukan
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsPage;

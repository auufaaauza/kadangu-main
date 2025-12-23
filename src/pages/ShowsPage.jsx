import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  ArrowRight,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchShows } from "@/lib/api";
import { formatRupiah } from "@/lib/currency";

const ShowsPage = () => {
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["all", "Musik", "Tari", "Teater", "Seni Rupa", "Sastra"];

  // Fetch shows from API
  useEffect(() => {
    const loadShows = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchShows({
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          search: searchQuery || undefined,
        });

        const showsData = (response.data || response).map((show) => ({
          id: show.id,
          title: show.judul,
          category: show.seniman?.nama || "Seni",
          image: show.gambar
            ? `http://localhost:8000/storage/${show.gambar}`
            : "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
          date: show.tanggal_pertunjukan,
          time: new Date(show.tanggal_pertunjukan).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          location: show.lokasi,
          price: show.ticket_categories?.[0]?.price || show.harga || 100000,
          quota: 200,
          sold: 0,
          rating: 4.8,
          description: show.deskripsi || "Pertunjukan seni budaya",
        }));

        setShows(showsData);
      } catch (err) {
        console.error("Error loading shows:", err);
        setError("Gagal memuat data pertunjukan. Silakan coba lagi.");
        setShows([]);
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, [selectedCategory, searchQuery]);

  const filteredShows = shows.filter((show) => {
    const matchesSearch =
      show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      show.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || show.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pertunjukan Seni
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Jelajahi berbagai pertunjukan seni dan budaya Indonesia
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Cari pertunjukan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-white border border-border rounded-xl hover:border-primary transition-colors flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-white rounded-xl p-6 border border-border"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filter Pertunjukan</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Kategori
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === category
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {category === "all" ? "Semua" : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Shows Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Memuat pertunjukan...</p>
          </div>
        ) : filteredShows.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer"
                onClick={() => navigate(`/shows/${show.id}`)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={show.image}
                    alt={show.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                      {show.category}
                    </span>
                  </div>
                  {show.rating && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{show.rating}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {show.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {show.description}
                  </p>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(show.date).toLocaleDateString("id-ID")} •{" "}
                        {show.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{show.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>
                        {show.sold}/{show.quota} tiket terjual
                      </span>
                    </div>
                  </div>

                  {/* Price & Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Mulai dari
                      </p>
                      <p className="text-xl font-bold text-primary">
                        {formatRupiah(show.price)}
                      </p>
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1 group/btn">
                      Beli
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl">
            <p className="text-muted-foreground">
              Tidak ada pertunjukan ditemukan
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowsPage;

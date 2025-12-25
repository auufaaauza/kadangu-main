import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Star,
  MapPin,
  ArrowRight,
  X,
  CheckCircle,
  Users,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchTalents } from "@/lib/api";
import { formatRupiah } from "@/lib/currency";

const CategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");

  const pathname = location.pathname.replace("/", "");
  const category = pathname || "music";

  // Category configs - All using teal-600 theme
  const categoryConfig = {
    music: {
      title: "Musik",
      subtitle: "Temukan musisi dan band untuk acara Anda",
      gradient: "from-teal-600 to-teal-700",
    },
    dance: {
      title: "Tari",
      subtitle: "Penari dan grup tari profesional",
      gradient: "from-teal-600 to-teal-700",
    },
    theater: {
      title: "Teater",
      subtitle: "Grup teater dan aktor profesional",

      gradient: "from-teal-600 to-teal-700",
    },
    art: {
      title: "Seni Rupa",
      subtitle: "Seniman dan pelukis berbakat",

      gradient: "from-teal-600 to-teal-700",
    },
    literature: {
      title: "Sastra",
      subtitle: "Penulis dan penyair profesional",

      gradient: "from-teal-600 to-teal-700",
    },
    film: {
      title: "Film",
      subtitle: "Filmmaker dan videografer",

      gradient: "from-teal-600 to-teal-700",
    },
    culture: {
      title: "Budaya",
      subtitle: "Pelestari budaya dan tradisi",

      gradient: "from-teal-600 to-teal-700",
    },
    workshop: {
      title: "Workshop",
      subtitle: "Instruktur dan fasilitator workshop",

      gradient: "from-teal-600 to-teal-700",
    },
  };

  const currentCategory = categoryConfig[category] || categoryConfig.music;

  useEffect(() => {
    const loadTalents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchTalents();

        const allTalents = (response.data || response || []).map((talent) => ({
          id: talent.id,
          name: talent.name,
          genre: talent.genre,
          category: talent.category,
          image: talent.photo
            ? `http://localhost:8000/storage/${talent.photo}`
            : "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
          location: talent.location || "Indonesia",
          basePrice: talent.base_price || 0,
          rating: talent.rating || 4.8,
          reviewCount: talent.review_count || 0,
          verified: talent.status === "active",
          packages: talent.packages?.length || 0,
          description:
            talent.bio || talent.service_description || "Talent profesional",
        }));

        // Filter by category - flexible matching
        const filtered = allTalents.filter((talent) => {
          // Category matching - check multiple fields with partial match
          const talentCategory = (talent.category || "").toLowerCase().trim();
          const talentGenre = (talent.genre || "").toLowerCase().trim();
          const pageCategory = currentCategory.title.toLowerCase().trim();

          // Match if category OR genre contains the page category (or vice versa)
          const matchesCategory =
            talentCategory === pageCategory ||
            talentGenre === pageCategory ||
            talentCategory.includes(pageCategory) ||
            talentGenre.includes(pageCategory) ||
            pageCategory.includes(talentCategory) ||
            pageCategory.includes(talentGenre);

          const matchesSearch =
            !searchQuery ||
            talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            talent.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase());

          const matchesGenre =
            selectedGenre === "all" || talent.genre === selectedGenre;

          return matchesCategory && matchesSearch && matchesGenre;
        });

        // If no talents match, show all talents
        if (filtered.length === 0 && allTalents.length > 0) {
          setTalents(allTalents);
        } else {
          setTalents(filtered);
        }
      } catch (err) {
        console.error("Error loading talents:", err);
        setError("Gagal memuat data. Silakan coba lagi.");
        setTalents([]);
      } finally {
        setLoading(false);
      }
    };

    loadTalents();
  }, [category, searchQuery, selectedGenre]);

  const genres = ["all", "Solo", "Band", "Grup", "Orkestra", "Tradisional"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero - Simpler, More Natural */}
      <div
        className={`bg-gradient-to-br ${currentCategory.gradient} text-white py-16 md:py-20 px-4`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-5xl md:text-6xl mb-4 inline-block">
            {currentCategory.icon}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {currentCategory.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {currentCategory.subtitle}
          </p>

          {talents.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {talents.length} Talent Tersedia
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder={`Cari ${currentCategory.title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 ${
                showFilters
                  ? "bg-primary text-white"
                  : "bg-card border border-border hover:border-primary"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-4 bg-card rounded-xl border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Genre</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        selectedGenre === genre
                          ? "bg-primary text-white"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {genre === "all" ? "Semua" : genre}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!loading && talents.length > 0 && (
          <p className="mb-4 text-sm text-muted-foreground">
            Ditemukan {talents.length} talent
          </p>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-xl p-4 animate-pulse">
                <div className="w-full h-48 bg-muted rounded-lg mb-3"></div>
                <div className="h-5 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && talents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-7xl mb-4">{currentCategory.icon}</div>
            <h3 className="text-2xl font-bold mb-2">Belum Ada Talent</h3>
            <p className="text-muted-foreground mb-6">
              Talent {currentCategory.title} akan segera hadir
            </p>
            <button
              onClick={() => navigate("/browse")}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
            >
              Jelajahi Kategori Lain
            </button>
          </div>
        )}

        {/* Talent Grid */}
        {!loading && !error && talents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/talent/${talent.id}`)}
              >
                <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary hover:shadow-lg transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={talent.image}
                      alt={talent.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    {talent.verified && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 text-sm">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{talent.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({talent.reviewCount})
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {talent.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      {talent.location}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {talent.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Mulai dari
                        </div>
                        <div className="font-bold text-primary">
                          {formatRupiah(talent.basePrice)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {talent.packages} Paket
                      </div>
                    </div>

                    <button className="w-full mt-3 py-2.5 bg-primary text-white rounded-lg font-semibold hover:shadow-md transition-shadow flex items-center justify-center gap-2">
                      Lihat Detail
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

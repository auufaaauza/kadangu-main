import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Star,
  MapPin,
  DollarSign,
  ArrowRight,
  X,
  CheckCircle,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchTalents } from "@/lib/api";

const CategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");

  // Extract category from pathname
  const pathname = location.pathname.replace("/", "");
  const category = pathname || "music";

  // Category configurations
  const categoryConfig = {
    music: {
      title: "Musik",
      subtitle: "Temukan musisi dan band untuk acara Anda",
      icon: "🎵",
      color: "text-red-500",
      bgColor: "bg-red-500",
    },
    dance: {
      title: "Tari",
      subtitle: "Penari dan grup tari profesional",
      icon: "💃",
      color: "text-pink-500",
      bgColor: "bg-pink-500",
    },
    theater: {
      title: "Teater",
      subtitle: "Grup teater dan aktor profesional",
      icon: "🎭",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500",
    },
    art: {
      title: "Seni Rupa",
      subtitle: "Seniman visual dan pelukis",
      icon: "🎨",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500",
    },
    literature: {
      title: "Sastra",
      subtitle: "Penulis dan penyair",
      icon: "📚",
      color: "text-green-500",
      bgColor: "bg-green-500",
    },
    film: {
      title: "Film",
      subtitle: "Filmmaker dan videografer",
      icon: "🎬",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500",
    },
    culture: {
      title: "Budaya",
      subtitle: "Pelestari budaya tradisional",
      icon: "🏛️",
      color: "text-amber-500",
      bgColor: "bg-amber-500",
    },
    workshop: {
      title: "Workshop",
      subtitle: "Instruktur dan fasilitator workshop",
      icon: "🤝",
      color: "text-teal-500",
      bgColor: "bg-teal-500",
    },
  };

  const currentCategory = categoryConfig[category] || categoryConfig.music;

  // Fetch talents from API
  useEffect(() => {
    const loadTalents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchTalents({
          category: currentCategory.title,
          genre: selectedGenre !== "all" ? selectedGenre : undefined,
          search: searchQuery || undefined,
        });

        const talentsData = (response.data || response).map((talent) => ({
          id: talent.id,
          name: talent.name,
          genre: talent.genre,
          image: talent.photo
            ? `http://localhost:8000/storage/${talent.photo}`
            : "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
          location: talent.seniman?.nama || "Indonesia",
          basePrice: talent.base_price,
          rating: 4.8,
          reviewCount: 0,
          verified: talent.status === "active",
          packages: talent.packages?.length || 0,
          description:
            talent.bio || talent.service_description || "Talent profesional",
        }));

        setTalents(talentsData);
      } catch (err) {
        console.error("Error loading talents:", err);
        setError("Gagal memuat data talent. Silakan coba lagi.");
        setTalents([]);
      } finally {
        setLoading(false);
      }
    };

    loadTalents();
  }, [category, selectedGenre, searchQuery, currentCategory.title]);

  const genres = ["all", "Tradisional", "Modern", "Klasik", "Kontemporer"];

  const filteredTalents = talents.filter((talent) => {
    const matchesSearch =
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" || talent.genre === selectedGenre;
    return matchesSearch && matchesGenre;
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
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">{currentCategory.icon}</span>
              <h1 className="text-4xl md:text-5xl font-bold">
                {currentCategory.title}
              </h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl">
              {currentCategory.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder={`Cari ${currentCategory.title.toLowerCase()}...`}
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
            className="mb-8 bg-white rounded-xl p-6 border border-border"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filter Genre</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedGenre === genre
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {genre === "all" ? "Semua Genre" : genre}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Talents Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Memuat talent...</p>
          </div>
        ) : filteredTalents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer"
                onClick={() => navigate(`/talent/${talent.id}`)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={talent.image}
                    alt={talent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-secondary text-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {talent.genre}
                    </span>
                  </div>
                  {talent.verified && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full">
                      <CheckCircle className="w-5 h-5 text-primary fill-primary" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {talent.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-sm">
                        {talent.rating}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({talent.reviewCount} ulasan)
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {talent.description}
                  </p>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{talent.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>{talent.packages} paket tersedia</span>
                    </div>
                  </div>

                  {/* Price & Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Mulai dari
                      </p>
                      <p className="text-xl font-bold text-primary">
                        Rp {(talent.basePrice / 1000000).toFixed(1)}jt
                      </p>
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1 group/btn">
                      Lihat
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl">
            <p className="text-muted-foreground">Tidak ada talent ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

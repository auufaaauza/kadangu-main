import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Ticket,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchTalents, fetchShows } from "@/lib/api";
import { formatRupiah } from "@/lib/currency";

const BrowsePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mainFilter, setMainFilter] = useState("booking"); // "booking" or "tiket"
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  // Genre options
  const genres = [
    "all",
    "Musik",
    "Tari",
    "Teater",
    "Seni Rupa",
    "Sastra",
    "Film",
    "Budaya",
    "Workshop",
  ];

  // Fetch data from API
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (mainFilter === "booking") {
          // Fetch talents
          const response = await fetchTalents({
            genre: selectedGenre !== "all" ? selectedGenre : undefined,
            search: searchQuery || undefined,
          });

          // Transform API response to match our component structure
          const talents = (response.data || response).map((talent) => ({
            id: talent.id,
            type: "talent",
            name: talent.name,
            genre: talent.genre,
            image: talent.photo
              ? `http://localhost:8000/storage/${talent.photo}`
              : "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
            location: talent.seniman?.nama || "Indonesia",
            basePrice: talent.base_price,
            rating: 4.8, // You can add rating to backend later
            reviewCount: 0,
            verified: talent.status === "active",
            packages: talent.packages?.length || 0,
            description:
              talent.bio || talent.service_description || "Talent profesional",
          }));

          setItems(talents);
        } else {
          // Fetch shows
          const response = await fetchShows({
            category: selectedGenre !== "all" ? selectedGenre : undefined,
            search: searchQuery || undefined,
          });

          // Transform API response
          const shows = (response.data || response).map((show) => ({
            id: show.id,
            type: "show",
            title: show.judul,
            genre: show.seniman?.nama || "Seni",
            image: show.gambar
              ? `http://localhost:8000/storage/${show.gambar}`
              : "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
            date: show.tanggal_pertunjukan,
            time: new Date(show.tanggal_pertunjukan).toLocaleTimeString(
              "id-ID",
              { hour: "2-digit", minute: "2-digit" }
            ),
            location: show.lokasi,
            price: show.ticket_categories?.[0]?.price || show.harga || 100000,
            quota: 200, // You can add this to backend
            sold: 0,
            rating: 4.8,
            description: show.deskripsi || "Pertunjukan seni budaya",
          }));

          setItems(shows);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Gagal memuat data. Silakan coba lagi.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [mainFilter, selectedGenre, searchQuery]);

  // Filter items (client-side filtering for search)
  const filteredItems = items.filter((item) => {
    const searchText = item.name || item.title || "";
    const matchesSearch =
      searchText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" || item.genre === selectedGenre;
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Jelajahi Seni & Budaya
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Temukan pertunjukan dan talent seni budaya Indonesia
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Filter - Tiket vs Booking */}
        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => {
                setMainFilter("booking");
                setSelectedGenre("all");
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                mainFilter === "booking"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white border border-border hover:border-primary"
              }`}
            >
              <UserCheck className="w-5 h-5" />
              Booking Talent
            </button>
            <button
              onClick={() => {
                setMainFilter("tiket");
                setSelectedGenre("all");
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                mainFilter === "tiket"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white border border-border hover:border-primary"
              }`}
            >
              <Ticket className="w-5 h-5" />
              Tiket Pertunjukan
            </button>
          </div>
        </div>

        {/* Search & Genre Filter */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder={`Cari ${
                mainFilter === "booking" ? "talent" : "pertunjukan"
              }...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Genre Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-sm text-muted-foreground">
                Filter Genre:
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedGenre === genre
                      ? "bg-accent text-white"
                      : "bg-white border border-border hover:border-accent"
                  }`}
                >
                  {genre === "all" ? "Semua Genre" : genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Results */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-muted-foreground">Memuat...</p>
            </motion.div>
          ) : filteredItems.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-4 text-sm text-muted-foreground">
                Menampilkan {filteredItems.length}{" "}
                {mainFilter === "booking" ? "talent" : "pertunjukan"}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer"
                    onClick={() =>
                      navigate(
                        item.type === "talent"
                          ? `/talent/${item.id}`
                          : `/shows/${item.id}`
                      )
                    }
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name || item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-secondary text-foreground px-3 py-1 rounded-full text-xs font-medium">
                          {item.genre}
                        </span>
                      </div>
                      {item.verified && (
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full">
                          <CheckCircle className="w-5 h-5 text-primary fill-primary" />
                        </div>
                      )}
                      {item.rating && !item.verified && (
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {item.rating}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {item.name || item.title}
                      </h3>

                      {item.type === "talent" && item.reviewCount > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-sm">
                              {item.rating}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({item.reviewCount} ulasan)
                          </span>
                        </div>
                      )}

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Info */}
                      <div className="space-y-2 mb-4">
                        {item.type === "talent" ? (
                          <>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <DollarSign className="w-4 h-4" />
                              <span>{item.packages} paket tersedia</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(item.date).toLocaleDateString(
                                  "id-ID"
                                )}{" "}
                                • {item.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span className="line-clamp-1">
                                {item.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="w-4 h-4" />
                              <span>
                                {item.sold}/{item.quota} tiket terjual
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Price & Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Mulai dari
                          </p>
                          <p className="text-xl font-bold text-primary">
                            {item.type === "talent"
                              ? formatRupiah(item.basePrice, true)
                              : formatRupiah(item.price)}
                          </p>
                        </div>
                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1 group/btn">
                          {item.type === "talent" ? "Lihat" : "Beli"}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-white rounded-xl"
            >
              <p className="text-muted-foreground">
                Tidak ada {mainFilter === "booking" ? "talent" : "pertunjukan"}{" "}
                ditemukan
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrowsePage;

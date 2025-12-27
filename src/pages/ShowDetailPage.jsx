import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Clock,
  Users,
  Share2,
  Heart,
  Ticket,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchShowById } from "@/lib/api";
import { formatRupiah } from "@/lib/currency";
import { addToWishlist, removeFromWishlist, checkWishlist } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const ShowDetailPage = () => {
  const navigate = useNavigate();
  const { showId } = useParams();
  const { isAuthenticated } = useAuth();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const loadShow = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchShowById(showId);
        const showData = response.data || response;

        setShow({
          id: showData.id,
          title: showData.judul,
          category:
            showData.artist_group?.nama || showData.artistGroup?.nama || "Seni",
          image: showData.gambar
            ? `http://localhost:8000/storage/${showData.gambar}`
            : "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
          date: showData.tanggal_pertunjukan,
          time: new Date(showData.tanggal_pertunjukan).toLocaleTimeString(
            "id-ID",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          location: showData.lokasi,
          description: showData.deskripsi || "Pertunjukan seni budaya",
          ticketCategories: (showData.ticket_categories || []).map((cat) => ({
            id: cat.id,
            name: cat.nama,
            description: cat.deskripsi,
            price: parseFloat(cat.harga),
            quota: cat.kuota,
            sold: cat.kuota - cat.kuota_tersisa,
          })),
          quota: showData.kuota || 0,
          sold: showData.kuota - showData.kuota_tersisa || 0,
          rating: showData.rating || 4.5,
        });
      } catch (err) {
        console.error("Error loading show:", err);
        setError("Gagal memuat data pertunjukan. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    if (showId) {
      loadShow();
    }
  }, [showId]);

  // Handle buy ticket with login check
  const handleBuyTicket = () => {
    if (!isAuthenticated) {
      alert('Anda harus login terlebih dahulu untuk membeli tiket!');
      navigate('/login', { state: { from: `/shows/${show.id}/book` } });
      return;
    }
    navigate(`/shows/${show.id}/book`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error || "Pertunjukan tidak ditemukan"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const lowestPrice =
    show.ticketCategories.length > 0
      ? Math.min(...show.ticketCategories.map((cat) => cat.price))
      : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="absolute top-8 right-8 flex gap-3">
          <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="max-w-7xl mx-auto">
            <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium mb-3 inline-block">
              {show.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {show.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(show.date).toLocaleDateString("id-ID")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{show.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{show.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{show.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-4">Tentang Pertunjukan</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {show.description}
              </p>
            </motion.div>

            {/* Ticket Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-6">Kategori Tiket</h2>

              {show.ticketCategories && show.ticketCategories.length > 0 ? (
                <div className="space-y-4">
                  {show.ticketCategories.map((category) => (
                    <div
                      key={category.id}
                      className="p-5 rounded-lg border-2 border-border hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {category.description ||
                              "Tiket untuk pertunjukan ini"}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Users className="w-4 h-4" />
                              <span>
                                {category.quota - (category.sold || 0)} tersisa
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-2xl font-bold text-primary">
                            {formatRupiah(category.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Informasi tiket belum tersedia
                </p>
              )}
            </motion.div>

            {/* Ticket Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-4">Ketersediaan Tiket</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Kuota</span>
                  <span className="font-medium">{show.quota} tiket</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Terjual</span>
                  <span className="font-medium">{show.sold} tiket</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tersisa</span>
                  <span className="font-medium text-primary">
                    {show.quota - show.sold} tiket
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(show.sold / show.quota) * 100}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg sticky top-8"
            >
              <h3 className="font-bold text-xl mb-4">Beli Tiket</h3>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tanggal</span>
                  <span className="font-medium">
                    {new Date(show.date).toLocaleDateString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Waktu</span>
                  <span className="font-medium">{show.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Lokasi</span>
                  <span className="font-medium text-right">
                    {show.location}
                  </span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Harga mulai dari
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {formatRupiah(lowestPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBuyTicket}
                className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Ticket className="w-5 h-5" />
                Beli Tiket Sekarang
              </button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Dengan membeli tiket, Anda menyetujui syarat dan ketentuan kami
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetailPage;

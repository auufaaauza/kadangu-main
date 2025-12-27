import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  MapPin,
  CheckCircle,
  Package,
  Clock,
  Share2,
  Heart,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTalentById } from "@/lib/api";
import { formatRupiah } from "@/lib/currency";
import { addToWishlist, removeFromWishlist, checkWishlist } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const TalentDetailPage = () => {
  const navigate = useNavigate();
  const { talentId } = useParams();
  const { isAuthenticated } = useAuth();
  const [talent, setTalent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const loadTalent = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchTalentById(talentId);
        const talentData = response.data || response;

        setTalent({
          id: talentData.id,
          name: talentData.name,
          genre: talentData.genre,
          image: talentData.photo
            ? `http://localhost:8000/storage/${talentData.photo}`
            : "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
          location:
            talentData.artist_group?.nama ||
            talentData.artistGroup?.nama ||
            "Indonesia",
          bio: talentData.bio || "Talent profesional",
          rating: talentData.rating || 0,
          reviewCount: talentData.review_count || 0,
          verified: talentData.status === "active",
          packages: (talentData.packages || []).map((pkg) => ({
            id: pkg.id,
            name: pkg.name,
            price: pkg.price,
            duration: pkg.duration_hours,
            description: pkg.description || "",
            includes: Array.isArray(pkg.includes) ? pkg.includes : [],
          })),
        });

        if (talentData.packages && talentData.packages.length > 0) {
          setSelectedPackage(talentData.packages[0]);
        }
      } catch (err) {
        console.error("Error loading talent:", err);
        setError("Gagal memuat data talent. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    if (talentId) {
      loadTalent();
    }
  }, [talentId]);

  // Check if talent is in wishlist
  useEffect(() => {
    const checkIfInWishlist = async () => {
      if (!isAuthenticated || !talentId) {
        setIsInWishlist(false);
        return;
      }

      try {
        const response = await checkWishlist("talent", talentId);
        setIsInWishlist(response.inWishlist || false);
      } catch (error) {
        // Silently fail - user just won't see wishlist status
        console.log("Wishlist check skipped:", error.message);
        setIsInWishlist(false);
      }
    };

    checkIfInWishlist();
  }, [talentId, isAuthenticated]);

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setWishlistLoading(true);
    try {
      if (isInWishlist) {
        await removeFromWishlist(talent.wishlistId);
        setIsInWishlist(false);
      } else {
        const response = await addToWishlist({
          item_type: "talent",
          item_id: talent.id,
        });
        setIsInWishlist(true);
        // Store wishlist ID for removal
        setTalent({ ...talent, wishlistId: response.data?.id });
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }
    setWishlistLoading(false);
  };

  // Handle book talent with login check
  const handleBookTalent = () => {
    if (!isAuthenticated) {
      alert('Anda harus login terlebih dahulu untuk booking talent!');
      navigate('/login', { state: { from: `/talent/${talent.id}/book` } });
      return;
    }
    navigate(`/talent/${talent.id}/book`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !talent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error || "Talent tidak ditemukan"}
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={talent.image}
          alt={talent.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Actions */}
        <div className="absolute top-8 right-8 flex gap-3">
          <button
            onClick={toggleWishlist}
            disabled={wishlistLoading}
            className={`bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all ${isInWishlist ? "text-red-500" : "text-gray-700"
              } ${wishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Heart
              className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
            />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Talent Info */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                {talent.genre}
              </span>
              {talent.verified && (
                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-sm font-medium">Terverifikasi</span>
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {talent.name}
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{talent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{talent.rating}</span>
                <span className="text-white/70">
                  ({talent.reviewCount} ulasan)
                </span>
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
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-4">Tentang</h2>
              <p className="text-muted-foreground leading-relaxed">
                {talent.bio}
              </p>
            </motion.div>

            {/* Packages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-6">Paket Tersedia</h2>

              {talent.packages && talent.packages.length > 0 ? (
                <div className="space-y-4">
                  {talent.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-5 rounded-lg border-2 cursor-pointer transition-all ${selectedPackage?.id === pkg.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                        }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Package className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-lg">{pkg.name}</h3>
                          </div>
                          {pkg.description && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {pkg.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{pkg.duration} jam</span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-2xl font-bold text-primary">
                            {formatRupiah(pkg.price, true)}
                          </p>
                        </div>
                      </div>

                      {pkg.includes && pkg.includes.length > 0 && (
                        <div className="pt-3 border-t border-border">
                          <p className="text-sm font-medium mb-2">
                            Yang termasuk:
                          </p>
                          <ul className="space-y-1">
                            {pkg.includes.map((item, index) => (
                              <li
                                key={index}
                                className="text-sm text-muted-foreground flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4 text-primary" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Tidak ada paket tersedia
                </p>
              )}
            </motion.div>
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg sticky top-8"
            >
              <h3 className="font-bold text-xl mb-4">Booking Talent</h3>

              {selectedPackage ? (
                <>
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Paket Terpilih
                    </p>
                    <p className="font-semibold mb-2">{selectedPackage.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Harga
                      </span>
                      <span className="text-xl font-bold text-primary">
                        {formatRupiah(selectedPackage.price)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleBookTalent}
                    className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    Booking Sekarang
                  </button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Dengan melakukan booking, Anda menyetujui syarat dan
                    ketentuan kami
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Pilih paket untuk melanjutkan booking
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentDetailPage;

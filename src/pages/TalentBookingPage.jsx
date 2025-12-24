import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Check,
  AlertCircle,
  Package,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTalentById, createTalentBooking } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { formatRupiah } from "@/lib/currency";

const TalentBookingPage = () => {
  const navigate = useNavigate();
  const { talentId } = useParams();
  const { user } = useAuth();
  const [talent, setTalent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventDetails: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch talent data from API
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
          packages: (talentData.packages || []).map((pkg) => ({
            id: pkg.id,
            name: pkg.name,
            price: pkg.price,
            duration: pkg.duration_hours,
            description: pkg.description || "",
            includes: Array.isArray(pkg.includes) ? pkg.includes : [],
          })),
        });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email tidak valid";
    if (!formData.phone.trim()) newErrors.phone = "Nomor telepon wajib diisi";
    if (!formData.eventDate) newErrors.eventDate = "Tanggal acara wajib diisi";
    if (!formData.eventTime) newErrors.eventTime = "Waktu acara wajib diisi";
    if (!formData.eventLocation.trim())
      newErrors.eventLocation = "Lokasi acara wajib diisi";
    if (!selectedPackage) newErrors.package = "Pilih paket booking";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Combine date and time
      const eventDateTime = `${formData.eventDate} ${formData.eventTime}`;

      const bookingData = {
        talent_id: talent.id,
        talent_package_id: selectedPackage.id,
        event_date: eventDateTime,
        event_location: formData.eventLocation,
        event_details: formData.eventDetails || null,
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
      };

      const response = await createTalentBooking(bookingData);

      // Navigate to success page or payment
      navigate(`/booking-success/${response.data?.id || response.id}`);
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Gagal membuat booking. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error && !talent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
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

  if (!talent) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-6">Booking Talent</h2>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="font-semibold mb-4">Informasi Pemesan</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.name ? "border-red-500" : "border-border"
                        } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                        placeholder="Masukkan nama lengkap"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.email ? "border-red-500" : "border-border"
                        } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                        placeholder="email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nomor Telepon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.phone ? "border-red-500" : "border-border"
                        } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                        placeholder="08xxxxxxxxxx"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="font-semibold mb-4">Detail Acara</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tanggal Acara <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.eventDate ? "border-red-500" : "border-border"
                        } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                      />
                      {errors.eventDate && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.eventDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Waktu Acara <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        name="eventTime"
                        value={formData.eventTime}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.eventTime ? "border-red-500" : "border-border"
                        } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                      />
                      {errors.eventTime && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.eventTime}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        Lokasi Acara <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="eventLocation"
                        value={formData.eventLocation}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.eventLocation
                            ? "border-red-500"
                            : "border-border"
                        } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                        placeholder="Masukkan alamat lengkap lokasi acara"
                      />
                      {errors.eventLocation && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.eventLocation}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        Detail Acara (Opsional)
                      </label>
                      <textarea
                        name="eventDetails"
                        value={formData.eventDetails}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Jelaskan detail acara, jumlah tamu, tema, atau permintaan khusus"
                      />
                    </div>
                  </div>
                </div>

                {/* Package Selection */}
                <div>
                  <h3 className="font-semibold mb-4">
                    Pilih Paket <span className="text-red-500">*</span>
                  </h3>
                  {talent.packages && talent.packages.length > 0 ? (
                    <div className="space-y-3">
                      {talent.packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedPackage?.id === pkg.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                                  selectedPackage?.id === pkg.id
                                    ? "border-primary bg-primary"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedPackage?.id === pkg.id && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Package className="w-5 h-5 text-primary" />
                                  <p className="font-semibold text-lg">
                                    {pkg.name}
                                  </p>
                                </div>
                                {pkg.description && (
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {pkg.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>{pkg.duration} jam</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-primary whitespace-nowrap ml-4">
                              {formatRupiah(pkg.price)}
                            </p>
                          </div>

                          {pkg.includes && pkg.includes.length > 0 && (
                            <div className="pl-8">
                              <p className="text-sm font-medium mb-2">
                                Yang termasuk:
                              </p>
                              <ul className="space-y-1">
                                {pkg.includes.map((item, index) => (
                                  <li
                                    key={index}
                                    className="text-sm text-muted-foreground flex items-center gap-2"
                                  >
                                    <Check className="w-4 h-4 text-primary" />
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
                  {errors.package && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.package}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Memproses...
                    </>
                  ) : (
                    <>Kirim Permintaan Booking</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md sticky top-8"
            >
              <h3 className="font-semibold text-lg mb-4">Ringkasan Booking</h3>

              <div className="mb-6">
                <img
                  src={talent.image}
                  alt={talent.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold mb-1">{talent.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {talent.genre}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{talent.location}</span>
                </div>
              </div>

              {selectedPackage && (
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Paket</span>
                    <span className="font-medium">{selectedPackage.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Durasi</span>
                    <span className="font-medium">
                      {selectedPackage.duration} jam
                    </span>
                  </div>
                  {formData.eventDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tanggal</span>
                      <span className="font-medium">
                        {new Date(formData.eventDate).toLocaleDateString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">
                      {formatRupiah(selectedPackage.price)}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentBookingPage;

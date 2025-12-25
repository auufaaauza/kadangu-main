import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  CreditCard,
  ArrowLeft,
  Check,
  AlertCircle,
  Upload,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchShowById, createTicketOrder } from "@/lib/api";
import { formatRupiah } from "@/lib/currency";
import { useAuth } from "@/contexts/AuthContext";

const TicketBookingPage = () => {
  const navigate = useNavigate();
  const { showId } = useParams();
  const { user } = useAuth();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentSettings, setPaymentSettings] = useState([]);
  const [paymentProof, setPaymentProof] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  // Mock data - replace with API call
  useEffect(() => {
    const loadShow = async () => {
      setLoading(true);
      try {
        const response = await fetchShowById(showId);
        const showData = response.data || response;

        setShow({
          id: showData.id,
          title: showData.judul,
          date: showData.tanggal_pertunjukan,
          time: new Date(showData.tanggal_pertunjukan).toLocaleTimeString(
            "id-ID",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          location: showData.lokasi,
          image: showData.gambar
            ? `http://localhost:8000/storage/${showData.gambar}`
            : "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
          category:
            showData.artist_group?.nama || showData.artistGroup?.nama || "Seni",
          categories: (showData.ticket_categories || []).map((cat) => ({
            id: cat.id,
            name: cat.nama,
            price: parseFloat(cat.harga),
            quota: cat.kuota,
            sold: cat.kuota - cat.kuota_tersisa,
            description: cat.deskripsi,
          })),
        });
      } catch (error) {
        console.error("Error loading show:", error);
      } finally {
        setLoading(false);
      }
    };

    if (showId) {
      loadShow();
    }
  }, [showId]);

  const [paymentMethod, setPaymentMethod] = useState("manual");

  // Fetch payment settings
  useEffect(() => {
    const fetchPaymentSettings = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:8000/api"
          }/payment-settings`
        );
        const data = await response.json();
        if (data.success) {
          setPaymentSettings(data.data);
        }
      } catch (error) {
        console.error("Error fetching payment settings:", error);
      }
    };
    fetchPaymentSettings();
  }, []);

  useEffect(() => {
    // Load Midtrans Snap script
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "YOUR_MIDTRANS_CLIENT_KEY"); // User to fill
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
    if (!selectedCategory) newErrors.category = "Pilih kategori tiket";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitting(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("pertunjukan_id", show.id);
        formDataToSend.append("ticket_category_id", selectedCategory.id);
        formDataToSend.append("jumlah_tiket", quantity);
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("notes", formData.notes);
        formDataToSend.append("payment_method", paymentMethod);

        // Add payment proof if manual payment and file is selected
        if (paymentMethod === "manual" && paymentProof) {
          formDataToSend.append("payment_proof", paymentProof);
        }

        const token = localStorage.getItem("auth_token");
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:8000/api"
          }/event-ticket-orders`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Booking failed");
        }

        if (paymentMethod === "midtrans" && data.snap_token) {
          window.snap.pay(data.snap_token, {
            onSuccess: function (result) {
              navigate("/payment-success", {
                state: { booking: data.booking, mode: "event" },
              });
            },
            onPending: function (result) {
              navigate("/payment-success", {
                state: { booking: data.booking, mode: "event" },
              });
            },
            onError: function (result) {
              alert("Payment failed!");
              console.error(result);
            },
            onClose: function () {
              alert("You closed the popup without finishing the payment");
            },
          });
        } else {
          // Manual or success without snap
          if (data.success || data.booking) {
            navigate("/payment-success", {
              state: { booking: data.booking, mode: "event" },
            });
          }
        }
      } catch (error) {
        console.error("Booking error:", error);
        setErrors({
          submit:
            error.message ||
            "Terjadi kesalahan saat memesan tiket. Silakan coba lagi.",
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const totalPrice = selectedCategory ? selectedCategory.price * quantity : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
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
              <h2 className="text-2xl font-bold mb-6">Pemesanan Tiket</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="font-semibold mb-4">Informasi Pemesan</h3>
                  <div className="space-y-4">
                    <div>
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

                {/* Ticket Category */}
                <div>
                  <h3 className="font-semibold mb-4">
                    Pilih Kategori Tiket <span className="text-red-500">*</span>
                  </h3>
                  <div className="space-y-3">
                    {show.categories.map((category) => {
                      const available = category.quota - category.sold;
                      const isAvailable = available > 0;

                      return (
                        <div
                          key={category.id}
                          onClick={() =>
                            isAvailable && setSelectedCategory(category)
                          }
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedCategory?.id === category.id
                              ? "border-primary bg-primary/5"
                              : isAvailable
                              ? "border-border hover:border-primary/50"
                              : "border-border bg-gray-50 cursor-not-allowed opacity-60"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  selectedCategory?.id === category.id
                                    ? "border-primary bg-primary"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedCategory?.id === category.id && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <div>
                                <p className="font-semibold">{category.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {isAvailable
                                    ? `${available} tiket tersisa`
                                    : "Sold Out"}
                                </p>
                              </div>
                            </div>
                            <p className="text-lg font-bold text-primary">
                              {formatRupiah(category.price)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                {selectedCategory && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Jumlah Tiket
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg border border-border hover:border-primary transition-colors flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="w-10 h-10 rounded-lg border border-border hover:border-primary transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Catatan (Opsional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Tambahkan catatan jika diperlukan"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="font-semibold mb-4">Metode Pembayaran</h3>
                  <div className="space-y-3">
                    <label
                      className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === "manual"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="manual"
                          checked={paymentMethod === "manual"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5 text-primary focus:ring-primary"
                        />
                        <div>
                          <p className="font-semibold">
                            Transfer Bank (Manual)
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Transfer ke rekening admin
                          </p>
                        </div>
                      </div>
                      <CreditCard className="w-6 h-6 text-gray-400" />
                    </label>

                    <label
                      className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === "midtrans"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="midtrans"
                          checked={paymentMethod === "midtrans"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5 text-primary focus:ring-primary"
                        />
                        <div>
                          <p className="font-semibold">
                            Online Payment (Midtrans)
                          </p>
                          <p className="text-sm text-muted-foreground">
                            QRIS, GoPay, Virtual Account, dll
                          </p>
                        </div>
                      </div>
                      <img
                        src="https://docs.midtrans.com/asset/image/main/midtrans-logo.png"
                        alt="Midtrans"
                        className="h-6 object-contain"
                      />
                    </label>
                  </div>

                  {/* Payment Details for Manual Transfer */}
                  {paymentMethod === "manual" && paymentSettings.length > 0 && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold mb-3 text-blue-900">
                        Detail Pembayaran
                      </h4>
                      <div className="space-y-4">
                        {paymentSettings
                          .filter((ps) => ps.type === "qris")
                          .map((qris) => (
                            <div
                              key={qris.id}
                              className="bg-white p-3 rounded-lg"
                            >
                              <p className="font-medium mb-2">{qris.name}</p>
                              {qris.qris_image && (
                                <img
                                  src={qris.qris_image}
                                  alt="QRIS"
                                  className="w-48 h-48 object-contain mx-auto border rounded"
                                />
                              )}
                              {qris.instructions && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  {qris.instructions}
                                </p>
                              )}
                            </div>
                          ))}

                        {paymentSettings
                          .filter((ps) => ps.type === "bank_account")
                          .map((bank) => (
                            <div
                              key={bank.id}
                              className="bg-white p-3 rounded-lg space-y-1"
                            >
                              <p className="font-medium">{bank.name}</p>
                              <div className="text-sm space-y-1">
                                <p>
                                  <span className="text-muted-foreground">
                                    Bank:
                                  </span>{" "}
                                  <span className="font-medium">
                                    {bank.bank_name}
                                  </span>
                                </p>
                                <p>
                                  <span className="text-muted-foreground">
                                    No. Rekening:
                                  </span>{" "}
                                  <span className="font-mono font-medium">
                                    {bank.account_number}
                                  </span>
                                </p>
                                <p>
                                  <span className="text-muted-foreground">
                                    Atas Nama:
                                  </span>{" "}
                                  <span className="font-medium">
                                    {bank.account_holder}
                                  </span>
                                </p>
                                {bank.instructions && (
                                  <p className="text-muted-foreground mt-2">
                                    {bank.instructions}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Payment Proof Upload */}
                  {paymentMethod === "manual" && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">
                        Upload Bukti Pembayaran (Opsional)
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4">
                        {!paymentProof ? (
                          <label className="flex flex-col items-center gap-2 cursor-pointer">
                            <Upload className="w-8 h-8 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Klik untuk upload bukti transfer
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Format: JPG, PNG, PDF (Max 2MB)
                            </span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,application/pdf"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file && file.size <= 2 * 1024 * 1024) {
                                  setPaymentProof(file);
                                } else if (file) {
                                  alert("Ukuran file maksimal 2MB");
                                  e.target.value = "";
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Check className="w-5 h-5 text-green-600" />
                              <span className="text-sm font-medium">
                                {paymentProof.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setPaymentProof(null)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Upload bukti pembayaran sekarang atau nanti di halaman
                        pesanan
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Lanjut ke Pembayaran
                    </>
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
              <h3 className="font-semibold text-lg mb-4">Ringkasan Pesanan</h3>

              {/* Show Info */}
              <div className="mb-6">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold mb-2">{show.title}</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(show.date).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{show.time} WIB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{show.location}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              {selectedCategory && (
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Kategori</span>
                    <span className="font-medium">{selectedCategory.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Harga per tiket
                    </span>
                    <span className="font-medium">
                      {formatRupiah(selectedCategory.price)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Jumlah</span>
                    <span className="font-medium">{quantity} tiket</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">
                      {formatRupiah(totalPrice)}
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

export default TicketBookingPage;

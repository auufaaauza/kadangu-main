import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Smartphone,
} from "lucide-react";
import { formatRupiah } from "@/lib/currency";
import { apiCall } from "@/lib/api";

const TicketDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiCall(`/v1/bookings/${id}`);
        setOrder(response);
      } catch (error) {
        console.error("Failed to load ticket order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
      setFile(selectedFile);
    } else if (selectedFile) {
      alert("Ukuran file maksimal 5MB");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("payment_proof", file);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:8000/api"
        }/v1/bookings/${id}/upload-proof`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("Bukti pembayaran berhasil diupload!");
        // Refresh order data
        const updatedOrder = await apiCall(`/v1/bookings/${id}`);
        setOrder(updatedOrder);
        setFile(null);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal upload bukti pembayaran. Silakan coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Tiket tidak ditemukan</h1>
        <Link to="/profile" className="text-primary hover:underline">
          Kembali ke Profil
        </Link>
      </div>
    );
  }

  const show = order.pertunjukan;
  const formattedDate = new Date(show?.tanggal_pertunjukan).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const formattedTime = new Date(show?.tanggal_pertunjukan).toLocaleTimeString(
    "id-ID",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header Status */}
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center space-y-4 mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-foreground">E-Ticket Event</h1>
          <p className="text-muted-foreground">
            Kode Booking:{" "}
            <span className="font-mono font-bold text-foreground bg-gray-100 px-2 py-1 rounded">
              {order.kode_booking || order.booking_code || `TCK-${order.id}`}
            </span>
          </p>

          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
              order.status === "confirmed" || order.status === "paid" // Assuming 'paid' is also a valid confirmed state for tickets
                ? "bg-green-100 text-green-800"
                : order.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {order.status === "paid" ? "Paid / Confirmed" : order.status}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Ticket Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={
                    show.gambar
                      ? `http://localhost:8000/storage/${show.gambar}`
                      : "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800"
                  }
                  alt={show.judul}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h2 className="text-2xl font-bold text-white">
                    {show.judul}
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Tanggal</span>
                    </div>
                    <p className="font-semibold">{formattedDate}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Waktu</span>
                    </div>
                    <p className="font-semibold">{formattedTime} WIB</p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>Lokasi</span>
                    </div>
                    <p className="font-semibold">{show.lokasi}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Rincian Tiket</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Kategori</span>
                      <span className="font-medium">
                        {order.ticket_category?.nama ||
                          order.ticket_category?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Jumlah Tiket
                      </span>
                      <span className="font-medium">
                        {order.jumlah_tiket} x
                      </span>
                    </div>
                    <div className="border-t border-dashed border-gray-300 pt-2 flex justify-between items-center font-bold text-lg">
                      <span>Total Bayar</span>
                      <span className="text-primary">
                        {formatRupiah(order.total_harga)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Actions & Payment */}
          <div className="space-y-6">
            {/* Payment Proof Section for Pending Orders */}
            {order.status === "pending" &&
              (!order.payment_method || order.payment_method === "manual") && (
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="font-semibold mb-4 text-center">Pembayaran</h3>

                  {/* Bank Info */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-6 text-sm">
                    <p className="font-semibold text-blue-800 mb-2">
                      Silakan transfer ke:
                    </p>
                    <div className="space-y-1 text-blue-900">
                      <p>
                        Bank BCA:{" "}
                        <span className="font-mono font-bold">1234567890</span>
                      </p>
                      <p>A.n: Kadangu Official</p>
                      <div className="mt-2 text-xs text-blue-700">
                        *Mohon upload bukti transfer di bawah ini untuk
                        verifikasi.
                      </div>
                    </div>
                  </div>

                  {!order.payment_proof ? (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          disabled={uploading}
                        />
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-gray-500" />
                          </div>
                          <p className="text-sm font-medium text-gray-700">
                            {file ? file.name : "Klik untuk upload bukti bayar"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Format: JPG, PNG (Max 5MB)
                          </p>
                        </div>
                      </div>

                      {file && (
                        <button
                          onClick={handleUpload}
                          disabled={uploading}
                          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                          {uploading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Kirim Bukti Pembayaran
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <h4 className="font-semibold text-yellow-800 mb-1">
                        Menunggu Verifikasi
                      </h4>
                      <p className="text-sm text-yellow-700">
                        Bukti pembayaran Anda sedang dicek oleh admin. Mohon
                        tunggu 1x24 jam.
                      </p>
                    </div>
                  )}
                </div>
              )}

            {(order.status === "paid" || order.status === "confirmed") && (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
                <h3 className="font-semibold mb-4">Scan QR Code</h3>
                <div className="bg-white p-2 inline-block rounded-xl border-2 border-dashed border-gray-200 mb-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                      order.kode_booking || `ORDER-${order.id}`
                    )}`}
                    alt={`QR Code ${order.kode_booking}`}
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Tunjukkan QR Code ini kepada petugas di lokasi acara untuk
                  check-in.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600 font-medium p-2 bg-green-50 rounded-lg">
                  <Smartphone className="w-4 h-4" />
                  <span>Simpan Screenshot</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {(order.status === "paid" || order.status === "confirmed") && (
                <Link
                  to={`/invoice/ticket/${order.id}`}
                  target="_blank"
                  className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center shadow-sm"
                >
                  Download Invoice
                </Link>
              )}

              <Link
                to="/profile"
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center shadow-sm"
              >
                Kembali ke Profil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;

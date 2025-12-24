import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Calendar, MapPin, Clock } from "lucide-react";
import { formatRupiah } from "@/lib/currency";
import { apiCall } from "@/lib/api";

const BookingSuccessPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await apiCall(`/talent-bookings/${id}`);
        setBooking(response);
      } catch (error) {
        console.error("Failed to load booking:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Booking tidak ditemukan</h1>
        <Link to="/" className="text-primary hover:underline">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  // Calculate WhatsApp Link
  const formattedDate = new Date(booking.event_date).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const waMessage = `Halo Admin Kadangu,
Saya ingin konfirmasi booking talent baru:

Kode Booking: ${booking.booking_code}
Talent: ${booking.talent?.name}
Paket: ${booking.package?.name}
Tanggal: ${formattedDate}
Jam: ${booking.event_time}
Lokasi: ${booking.event_location}
Total: ${formatRupiah(booking.total_price)}

Mohon diproses ya, terima kasih!`;

  const waUrl = `https://wa.me/6285179616683?text=${encodeURIComponent(
    waMessage
  )}`;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Booking Berhasil!
            </h1>
            <p className="text-muted-foreground">
              Kode Booking:{" "}
              <span className="font-mono font-bold text-foreground">
                {booking.booking_code}
              </span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4">
            <h3 className="font-semibold text-foreground border-b pb-2">
              Detail Booking
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Talent</span>
                <p className="font-medium">
                  {booking.talent?.name || "Talent"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground">Paket</span>
                <p className="font-medium">
                  {booking.package?.name || "Paket"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground">Total Biaya</span>
                <p className="font-medium text-primary">
                  {formatRupiah(booking.total_price)}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 capitalize">
                  {booking.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span>{formattedDate}</span>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span>{booking.event_time}</span>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span>{booking.event_location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Link
              to="/profile"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center"
            >
              Lihat Pesanan Saya
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Konfirmasi via WhatsApp
            </a>

            <Link
              to="/"
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;

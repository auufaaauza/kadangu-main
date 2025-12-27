import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Calendar, MapPin, Clock, Smartphone } from "lucide-react";
import { formatRupiah } from "@/lib/currency";
import { apiCall } from "@/lib/api";

const BookingDetailPage = () => {
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
        <Link to="/profile" className="text-primary hover:underline">
          Kembali ke Profil
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
Saya ingin menanyakan status booking saya:

Kode Booking: ${booking.booking_code}
Talent: ${booking.talent?.name}
Status: ${booking.status}

Mohon infonya, terima kasih!`;

  const waUrl = `https://wa.me/6282214459606?text=${encodeURIComponent(
    waMessage
  )}`;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-blue-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Detail Booking
            </h1>
            <p className="text-muted-foreground">
              Kode Booking:{" "}
              <span className="font-mono font-bold text-foreground">
                {booking.booking_code}
              </span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4">
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
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                >
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

            {booking.admin_notes && (
              <div className="pt-4 mt-4 border-t border-gray-200">
                <span className="text-sm font-semibold text-gray-700">
                  Catatan Admin:
                </span>
                <p className="text-sm text-gray-600 mt-1 bg-white p-3 rounded border border-gray-200">
                  {booking.admin_notes}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-4">
            {(booking.status === "confirmed" ||
              booking.status === "completed" ||
              booking.status === "paid") && (
                <>
                  <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
                    <h3 className="font-semibold mb-4">Booking QR Code</h3>
                    <div className="bg-white p-2 inline-block rounded-xl border-2 border-dashed border-gray-200 mb-4">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                          booking.booking_code
                        )}`}
                        alt={`QR Code ${booking.booking_code}`}
                        className="w-40 h-40 object-contain"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tunjukkan kepada talent saat acara.
                    </p>
                  </div>

                  <Link
                    to={`/invoice/booking/${booking.id}`}
                    target="_blank"
                    className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center shadow-sm"
                  >
                    Download Invoice
                  </Link>
                </>
              )}

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
              Hubungi Admin via WhatsApp
            </a>

            <Link
              to="/profile"
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center"
            >
              Kembali ke Profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;

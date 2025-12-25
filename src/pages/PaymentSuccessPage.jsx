import React from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Home, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode ?? "event"; // default event

  const isCommunity = mode === "community";

  return (
    <>
      <Helmet>
        <title>
          {isCommunity ? "Booking Komunitas Diterima" : "Pembayaran Berhasil"} -
          Kadangu
        </title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        {/* CONTENT */}
        <main className="flex-grow flex items-center justify-center px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, type: "spring" }}
            className="
              bg-white dark:bg-card
              rounded-3xl shadow-xl border border-border
              p-10 sm:p-12 max-w-xl w-full text-center
            "
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />

            <h1 className="text-3xl font-bold text-foreground mb-3">
              {isCommunity
                ? "Permintaan Booking Diterima!"
                : "Pembayaran Berhasil!"}
            </h1>

            <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">
              {isCommunity
                ? "Terima kasih! Permintaan booking komunitas Anda sedang diproses. Admin Kadangu akan menghubungi Anda melalui WhatsApp atau Email untuk konfirmasi lebih lanjut."
                : "Pembayaran Anda telah diterima dan sedang diverifikasi. E-tiket akan segera dikirimkan ke email Anda."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-xl"
                onClick={() => navigate("/")}
              >
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Button>
              {!isCommunity && (
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => {
                    if (location.state?.booking?.id) {
                      navigate(`/order/ticket/${location.state.booking.id}`);
                    } else {
                      navigate("/profile");
                    }
                  }}
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  Lihat Tiket Saya
                </Button>
              )}
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}

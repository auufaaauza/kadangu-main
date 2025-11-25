import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  Check,
  QrCode,
  Wallet,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SHOWS_ARTISTS } from "@/data/showsData";

/* ----------------------- PAYMENT DIALOG COMPONENT ----------------------- */

function PaymentDialog({ open, onOpenChange, tiers, selectedTier, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentUploaded, setPaymentUploaded] = useState(false);

  const selectedPackage = useMemo(
    () => tiers.find((t) => t.id === selectedTier),
    [tiers, selectedTier]
  );

  // Hitung step aktif
  const currentStep = paymentUploaded ? 3 : paymentMethod ? 2 : 1;

  const steps = [
    { id: 1, label: "Metode" },
    { id: 2, label: "Bayar" },
    { id: 3, label: "Selesai" },
  ];

  const handleClose = () => {
    onOpenChange(false);
    setPaymentMethod(null);
    setPaymentUploaded(false);
  };

  const handleSuccess = () => {
    setPaymentUploaded(true);
    // kalau mau trigger sesuatu di luar (misal redirect / toast)
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="
          max-w-md rounded-3xl border border-white/15 
          bg-background/80 backdrop-blur-xl shadow-2xl
          data-[state=open]:animate-in data-[state=open]:fade-in-90 data-[state=open]:zoom-in-95
          data-[state=closed]:animate-out data-[state=closed]:fade-out-90 data-[state=closed]:zoom-out-95
        "
      >
        <div className="absolute -top-32 -right-24 w-52 h-52 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <DialogHeader className="relative text-center">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Pembayaran
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Selesaikan pembayaran untuk mengamankan tempatmu.
          </p>
        </DialogHeader>

        {/* STEP INDICATOR */}
        <div className="relative mt-4">
          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full border text-xs font-semibold
                    transition-all duration-300
                    ${
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-muted text-muted-foreground border-border"
                    }
                  `}
                >
                  {step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                      flex-1 h-[2px] mx-1 rounded-full transition-all duration-300
                      ${
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      }
                    `}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
            <span>Pilih Metode</span>
            <span>Bayar</span>
            <span>Selesai</span>
          </div>
        </div>

        {/* STEP 1: PILIH METODE */}
        {!paymentUploaded && !paymentMethod && (
          <div className="space-y-5 mt-6 relative">

            {/* Paket */}
            <div className="p-4 rounded-2xl bg-muted border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center shadow-sm">
                <Ticket className="text-primary w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Paket Dipilih</p>
                <p className="font-semibold">{selectedPackage?.name}</p>
              </div>
            </div>

            {/* Total */}
            <div className="p-4 rounded-2xl bg-primary/10 border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Pembayaran</p>
                <p className="font-semibold text-sm">Termasuk semua fasilitas</p>
              </div>
              <span className="text-primary font-bold text-lg">
                {selectedPackage?.price}
              </span>
            </div>

            {/* Metode Pembayaran */}
            <div className="space-y-3">
              {/* QRIS */}
              <button
                onClick={() => setPaymentMethod("qris")}
                className="
                  w-full flex items-center gap-4 p-4 rounded-2xl border bg-card text-left
                  hover:-translate-y-0.5 hover:shadow-md hover:border-primary/60
                  transition-all duration-300
                "
              >
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">QRIS</p>
                  <p className="text-xs text-muted-foreground">
                    Scan sekali, bisa dari semua bank & e-wallet yang mendukung.
                  </p>
                </div>
              </button>

              {/* E-Wallet */}
              <button
                onClick={() => setPaymentMethod("ewallet")}
                className="
                  w-full flex items-center gap-4 p-4 rounded-2xl border bg-card text-left
                  hover:-translate-y-0.5 hover:shadow-md hover:border-primary/60
                  transition-all duration-300
                "
              >
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">E-Wallet</p>
                  <p className="text-xs text-muted-foreground mb-1">
                    Bayar pakai saldo e-wallet favoritmu.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["OVO", "Dana", "Gopay"].map((w) => (
                      <span
                        key={w}
                        className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              {/* Transfer Bank */}
              <button
                onClick={() => setPaymentMethod("bank")}
                className="
                  w-full flex items-center gap-4 p-4 rounded-2xl border bg-card text-left
                  hover:-translate-y-0.5 hover:shadow-md hover:border-primary/60
                  transition-all duration-300
                "
              >
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Transfer Bank</p>
                  <p className="text-xs text-muted-foreground mb-1">
                    Transfer manual melalui rekening bank.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["BCA", "BNI", "BRI", "Mandiri"].map((b) => (
                      <span
                        key={b}
                        className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: BAYAR */}
        {!paymentUploaded && paymentMethod && (
          <div className="space-y-5 mt-6 text-center">
            <h3 className="text-lg font-semibold tracking-tight">
              {paymentMethod === "qris" && "Bayar via QRIS"}
              {paymentMethod === "ewallet" && "Bayar via E-Wallet"}
              {paymentMethod === "bank" && "Bayar via Transfer Bank"}
            </h3>

            <div className="p-4 rounded-2xl bg-muted border space-y-1">
              <p className="text-xs text-muted-foreground">Total Pembayaran</p>
              <p className="text-primary font-bold text-xl">
                {selectedPackage?.price}
              </p>
            </div>

            {/* Di sini ke depannya bisa kamu ganti dengan QR / instruksi real */}
            <div className="p-4 rounded-2xl border border-dashed bg-background/60 text-xs text-muted-foreground">
              Instruksi pembayaran spesifik ({paymentMethod.toUpperCase()}) bisa
              ditampilkan di sini.  
              <br />
              (QR code, nomor rekening, atau link e-wallet, dll.)
            </div>

            <Button
              className="w-full py-6 text-base font-semibold rounded-2xl"
              onClick={handleSuccess}
            >
              Saya Sudah Bayar
            </Button>

            <Button
              variant="outline"
              className="w-full py-6 rounded-2xl"
              onClick={() => setPaymentMethod(null)}
            >
              Kembali pilih metode lain
            </Button>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {paymentUploaded && (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto animate-[pulse_1.8s_ease-in-out_infinite]">
              <Check className="w-9 h-9 text-green-500" />
            </div>

            <h3 className="text-2xl font-semibold">Pembayaran Berhasil 🎉</h3>

            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Terima kasih! Pesananmu sudah kami konfirmasi.  
              Detail tiket dan informasi lengkap akan segera dikirimkan.
            </p>

            <Button
              className="w-full py-6 rounded-2xl"
              onClick={() => {
                handleClose();
                onSuccess?.();
              }}
            >
              Tutup
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ----------------------------- MAIN PAGE ----------------------------- */

export default function ShowDetailPage() {
  const { id } = useParams();
  const show = SHOWS_ARTISTS.find((s) => s.id == id);

  const [openPayment, setOpenPayment] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  if (!show) return <div className="p-6 text-center">Data tidak ditemukan.</div>;

  const tiers = [
    {
      id: "basic",
      name: "Basic Seat",
      price: "Rp 50.000",
      perks: ["Kursi reguler", "Akses standar", "Tanpa fasilitas tambahan"],
    },
    {
      id: "premium",
      name: "Premium Seat",
      price: "Rp 75.000",
      perks: ["Kursi tengah", "Akses lebih dekat ke panggung", "Free mineral water"],
    },
    {
      id: "vip",
      name: "VIP Seat",
      price: "Rp 100.000",
      perks: ["Kursi paling depan", "Meet & greet", "Fasilitas VIP Lounge"],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* HEADER IMAGE */}
      <div className="relative h-72 w-full overflow-hidden shadow-lg">
        <img
          src={show.image}
          alt={show.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-card shadow-xl rounded-2xl p-6 mb-10 border border-border">
          <h1 className="text-3xl font-bold mb-2">{show.name}</h1>
          <p className="text-muted-foreground mb-4">{show.description}</p>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <Calendar /> <span>{show.schedule ?? "Setiap Hari"}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <MapPin /> <span>{show.location}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <Clock /> <span>Durasi: {show.duration ?? "45 - 60 menit"}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <Users /> <span>{show.members} anggota</span>
            </div>
          </div>

          {/* PACKAGE TIERS */}
          <h2 className="text-2xl font-semibold mb-4">Paket Pertunjukan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`
                  rounded-2xl border p-5 transition hover:shadow-lg cursor-pointer
                  hover:-translate-y-1
                  ${
                    selectedTier === tier.id
                      ? "border-primary bg-primary/10"
                      : "border-border"
                  }
                `}
                onClick={() => setSelectedTier(tier.id)}
              >
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-primary font-bold text-lg mb-3">
                  {tier.price}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check size={16} className="text-primary" /> {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              disabled={!selectedTier}
              onClick={() => setOpenPayment(true)}
              className="px-10 py-6 text-base rounded-2xl"
            >
              Lanjutkan Pembayaran
            </Button>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL (KOMPONEN TERPISAH) */}
      <PaymentDialog
        open={openPayment}
        onOpenChange={setOpenPayment}
        tiers={tiers}
        selectedTier={selectedTier}
        onSuccess={() => {
          // reset pilihan setelah pembayaran selesai
          setSelectedTier(null);
        }}
      />
    </div>
  );
}

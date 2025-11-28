// src/components/booking/PaymentDialog.jsx
import { useState, useMemo } from "react";
import { Ticket, QrCode, Wallet, Banknote, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PaymentDialog({
  open,
  onOpenChange,
  tiers,
  selectedTierId,
  onSuccess,
  title = "Pembayaran",
  subtitle = "Selesaikan pembayaran untuk mengamankan tiketmu.",
}) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentUploaded, setPaymentUploaded] = useState(false);

  const selectedPackage = useMemo(
    () => tiers?.find((t) => t.id === selectedTierId),
    [tiers, selectedTierId]
  );

  const currentStep = paymentUploaded ? 3 : paymentMethod ? 2 : 1;

  const steps = [
    { id: 1, label: "Metode" },
    { id: 2, label: "Bayar" },
    { id: 3, label: "Selesai" },
  ];

  const resetState = () => {
    setPaymentMethod(null);
    setPaymentUploaded(false);
  };

  const handleClose = () => {
    resetState();
    onOpenChange(false);
  };

  const handleSuccess = () => {
    setPaymentUploaded(true);
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="
          max-w-md rounded-3xl border border-white/15 
          bg-background/80 backdrop-blur-xl shadow-2xl
          data-[state=open]:animate-in data-[state=open]:fade-in-90 data-[state=open]:zoom-in-95
        "
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {subtitle}
          </p>
        </DialogHeader>

        {/* STEP INDICATOR */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full 
                    border text-xs font-semibold transition-all duration-300
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
                      ${currentStep > step.id ? "bg-primary" : "bg-muted"}
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

        {/* STEP 1 - Pilih Metode */}
        {!paymentUploaded && !paymentMethod && (
          <div className="mt-6 space-y-5">
            {/* Paket */}
            <div className="p-4 rounded-2xl bg-muted border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center shadow">
                <Ticket className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Paket Dipilih</p>
                <p className="font-semibold">{selectedPackage?.name ?? "-"}</p>
              </div>
            </div>

            {/* Total */}
            <div className="p-4 rounded-2xl bg-primary/10 border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Pembayaran</p>
                <p className="font-semibold text-sm">Termasuk fasilitas event</p>
              </div>
              <span className="text-primary font-bold text-lg">
                {selectedPackage?.price ?? "-"}
              </span>
            </div>

            {/* Methods */}
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod("qris")}
                className="
                  w-full flex items-center gap-4 p-4 rounded-2xl border bg-card text-left
                  hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/60
                  transition-all duration-300
                "
              >
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">QRIS</p>
                  <p className="text-xs text-muted-foreground">
                    Bisa bayar dari semua bank & e-wallet yang mendukung.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("ewallet")}
                className="
                  w-full flex items-center gap-4 p-4 rounded-2xl border bg-card text-left
                  hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/60
                  transition-all duration-300
                "
              >
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">E-Wallet</p>
                  <p className="text-xs text-muted-foreground">OVO, Dana, Gopay</p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("bank")}
                className="
                  w-full flex items-center gap-4 p-4 rounded-2xl border bg-card text-left
                  hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/60
                  transition-all duration-300
                "
              >
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Transfer Bank</p>
                  <p className="text-xs text-muted-foreground">BCA • BNI • BRI • Mandiri</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 - Instruksi */}
        {!paymentUploaded && paymentMethod && (
          <div className="mt-6 space-y-5 text-center">
            <h3 className="text-lg font-semibold">
              Bayar via {paymentMethod.toUpperCase()}
            </h3>

            <div className="p-4 rounded-2xl bg-muted border">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-primary font-bold text-xl">
                {selectedPackage?.price ?? "-"}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-dashed bg-background/60 text-xs text-muted-foreground leading-relaxed">
              Instruksi pembayaran akan tampil di sini  
              <br />
              (QR code, nomor rekening, atau link e-wallet).
            </div>

            <Button
              className="w-full py-6 rounded-2xl text-base font-semibold"
              onClick={handleSuccess}
            >
              Saya Sudah Bayar
            </Button>

            <Button
              variant="outline"
              className="w-full py-6 rounded-2xl"
              onClick={() => setPaymentMethod(null)}
            >
              Pilih Metode Lain
            </Button>
          </div>
        )}

        {/* STEP 3 - Success */}
        {paymentUploaded && (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center animate-pulse">
              <Check className="text-green-500 w-9 h-9" />
            </div>

            <h3 className="text-2xl font-semibold">Pembayaran Berhasil 🎉</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Terima kasih! Data tiket akan segera diproses dan dikirim ke kontakmu.
            </p>

            <Button className="w-full py-6 rounded-2xl" onClick={handleClose}>
              Tutup
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

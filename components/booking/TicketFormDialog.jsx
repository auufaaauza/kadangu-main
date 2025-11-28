// src/components/booking/TicketFormDialog.jsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function TicketFormDialog({
  open,
  onOpenChange,
  eventName,
  selectedTier,
  onSubmit,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    note: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redirect to payment success page with event details
    const queryParams = new URLSearchParams({
      event: eventName || 'Event',
      tier: selectedTier?.name || 'Tiket',
      price: selectedTier?.price || 'Rp 0',
    });

    router.push(`/paymentsuccess?${queryParams.toString()}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Data Tiket
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Tiket akan dikirim ke data kontak yang kamu isi.
          </p>
        </DialogHeader>

        <div className="mb-4 rounded-xl border bg-muted px-4 py-3 text-sm">
          <p className="font-semibold">{eventName}</p>
          {selectedTier && (
            <p className="text-xs text-muted-foreground mt-1">
              Paket: <span className="font-medium">{selectedTier.name}</span> •{" "}
              <span className="text-teal-600 font-semibold">{selectedTier.price}</span>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nama Lengkap</label>
            <input
              required
              type="text"
              name="fullName"
              className="w-full px-4 py-2 rounded-lg border bg-background"
              placeholder="Nama sesuai identitas"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              required
              type="email"
              name="email"
              className="w-full px-4 py-2 rounded-lg border bg-background"
              placeholder="email@example.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Nomor WhatsApp</label>
            <input
              required
              type="tel"
              name="phone"
              className="w-full px-4 py-2 rounded-lg border bg-background"
              placeholder="+62..."
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Catatan (opsional)</label>
            <textarea
              name="note"
              rows="3"
              className="w-full px-4 py-2 rounded-lg border bg-background resize-none"
              placeholder="Permintaan khusus / info tambahan"
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-800 py-3 rounded-xl">
            Lanjut ke Pembayaran
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

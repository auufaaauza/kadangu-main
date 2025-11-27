import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function BookingTalentDialog({ open, onOpenChange, talent }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    brand: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    const text = `
Halo, saya ingin booking talent:

Nama Talent: ${talent.name}
Platform: ${talent.category}
Niche: ${talent.niche}

--- Data Saya ---
Nama: ${formData.name}
No WA: ${formData.phone}
Brand/Usaha: ${formData.brand}
Detail Kebutuhan: ${formData.message}
    `;

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;

    window.open(waUrl, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Talent</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Isi data berikut untuk menghubungi talent.
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nama Kamu</label>
            <input
              name="name"
              className="w-full px-3 py-2 rounded-lg border"
              placeholder="Nama lengkap"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Nomor WhatsApp</label>
            <input
              name="phone"
              className="w-full px-3 py-2 rounded-lg border"
              placeholder="+62..."
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Brand / Usaha</label>
            <input
              name="brand"
              className="w-full px-3 py-2 rounded-lg border"
              placeholder="Nama brand / usaha"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Kebutuhan Kolaborasi</label>
            <textarea
              name="message"
              rows={3}
              className="w-full px-3 py-2 rounded-lg border resize-none"
              placeholder="Contoh: review produk, campaign UMKM, event performance..."
              onChange={handleChange}
            ></textarea>
          </div>

          <Button className="w-full py-3 rounded-xl" onClick={handleSubmit}>
            Hubungi via WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

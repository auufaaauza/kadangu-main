import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function BookingTalentDialog({
  open,
  onOpenChange,
  talentName,
  talentCategory,
  talentNiche
}) {
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

Nama Talent: ${talentName}
Platform: ${talentCategory}
Niche: ${talentNiche}

--- Data Saya ---
Nama: ${formData.name}
No WA: ${formData.phone}
Brand/Usaha: ${formData.brand}
Detail Kebutuhan: ${formData.message}
    `.trim();

    const waUrl = `https://wa.me/6282214459606?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Talent</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Isi data berikut untuk menghubungi admin.
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nama Kamu</label>
            <input
              name="name"
              className="w-full px-3 py-2 rounded-lg border"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Nomor WhatsApp</label>
            <input
              name="phone"
              className="w-full px-3 py-2 rounded-lg border"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Brand / Usaha</label>
            <input
              name="brand"
              className="w-full px-3 py-2 rounded-lg border"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Kebutuhan Kolaborasi</label>
            <textarea
              name="message"
              rows={3}
              className="w-full px-3 py-2 rounded-lg border resize-none"
              onChange={handleChange}
            ></textarea>
          </div>

          <Button className="w-full bg-teal-600 hover:bg-teal-800 py-3 rounded-xl" onClick={handleSubmit}>
            Hubungi via WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

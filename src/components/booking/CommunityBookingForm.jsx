// src/components/booking/CommunityBookingForm.jsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function CommunityBookingForm({
  open,
  onOpenChange,
  communityName,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    budgetRange: "",
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Booking Komunitas: {communityName}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Kirim detail acara kamu, tim kami atau komunitas akan menghubungi balik.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* DETAIL ACARA */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Detail Acara</h3>

            <input
              required
              type="text"
              name="eventName"
              placeholder="Nama acara (Festival, Wedding, Launching, dll)"
              className="w-full px-4 py-2 rounded-lg border bg-background"
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                required
                type="date"
                name="eventDate"
                className="px-4 py-2 rounded-lg border bg-background w-full"
                onChange={handleChange}
              />
              <input
                required
                type="time"
                name="eventTime"
                className="px-4 py-2 rounded-lg border bg-background w-full"
                onChange={handleChange}
              />
            </div>

            <input
              required
              type="text"
              name="eventLocation"
              placeholder="Lokasi / alamat venue"
              className="w-full px-4 py-2 rounded-lg border bg-background"
              onChange={handleChange}
            />

            <input
              type="text"
              name="budgetRange"
              placeholder="Perkiraan budget (opsional)"
              className="w-full px-4 py-2 rounded-lg border bg-background"
              onChange={handleChange}
            />
          </div>

          {/* DATA KONTAK */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-sm font-semibold">Kontak Penanggung Jawab</h3>

            <input
              required
              type="text"
              name="fullName"
              placeholder="Nama lengkap"
              className="w-full px-4 py-2 rounded-lg border bg-background"
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                required
                type="email"
                name="email"
                placeholder="email@example.com"
                className="px-4 py-2 rounded-lg border bg-background w-full"
                onChange={handleChange}
              />
              <input
                required
                type="tel"
                name="phone"
                placeholder="+62..."
                className="px-4 py-2 rounded-lg border bg-background w-full"
                onChange={handleChange}
              />
            </div>

            <textarea
              name="message"
              rows="4"
              placeholder="Ceritakan konsep acara, durasi, kebutuhan teknis, dsb."
              className="w-full px-4 py-2 rounded-lg border bg-background resize-none"
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full py-3 rounded-xl">
            Kirim Permintaan Booking
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

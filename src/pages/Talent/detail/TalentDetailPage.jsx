import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TALENT_DATA } from "@/data/talentData";
import { Button } from "@/components/ui/button";
import { TalentNicheBadge } from "@/components/talent/TalentNicheBadge";
import { ArrowLeft, Instagram, Youtube, Music, MessageCircle } from "lucide-react";
import { BookingTalentDialog } from "@/components/talent/BookingTalentDialog"; // pastikan ini named export

export default function TalentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const talent = TALENT_DATA.find((t) => t.id == id);
  const [openForm, setOpenForm] = useState(false);

  if (!talent) return <div className="p-10 text-center">Talent tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={talent.photos?.[0] || talent.image}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-28 relative z-10">
        <div className="bg-card p-6 rounded-2xl shadow-xl border border-border">

          {/* TITLE */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{talent.name}</h1>

            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} className="mr-2" /> Kembali
            </Button>
          </div>

          <p className="text-muted-foreground">{talent.category}</p>

          {/* NICHE */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <TalentNicheBadge niche={talent.niche} />
          </div>

          {/* FOLLOWERS */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {talent.followers.instagram && (
              <div className="flex items-center p-3 bg-muted rounded-xl gap-2">
                <Instagram size={18} /> Instagram: <strong>{talent.followers.instagram.toLocaleString()}</strong>
              </div>
            )}
            {talent.followers.tiktok && (
              <div className="flex items-center p-3 bg-muted rounded-xl gap-2">
                <Music size={18} /> TikTok: <strong>{talent.followers.tiktok.toLocaleString()}</strong>
              </div>
            )}
            {talent.followers.youtube && (
              <div className="flex items-center p-3 bg-muted rounded-xl gap-2">
                <Youtube size={18} /> YouTube: <strong>{talent.followers.youtube.toLocaleString()}</strong>
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="mt-6 leading-relaxed text-muted-foreground">
            {talent.description}
          </p>

          {/* BRAND COLLAB */}
          {talent.brands?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-3">Pernah Bekerja Sama dengan</h2>

              <div className="flex gap-3 flex-wrap">
                {talent.brands.map((b, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium border border-primary/20"
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PHOTO CAROUSEL */}
          {talent.photos && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
              {talent.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  className="rounded-xl object-cover w-full h-40"
                />
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <a href={talent.ratecard} target="_blank" className="w-full">
              <Button className="w-full py-6 text-base">📄 Lihat Rate Card</Button>
            </a>

            <a
              href={`https://wa.me/${talent.wa}?text=${encodeURIComponent("Halo, saya ingin kolaborasi dengan " + talent.name)}`}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full py-6 text-base" variant="secondary">
                <MessageCircle size={18} className="mr-2" /> Chat WhatsApp
              </Button>
            </a>

            <Button
              className="w-full py-6 text-base"
              variant="outline"
              onClick={() => setOpenForm(true)}
            >
              Booking via Form
            </Button>
          </div>
        </div>
      </div>

      {/* BOOKING FORM */}
      <BookingTalentDialog
        open={openForm}
        onOpenChange={setOpenForm}
        talentName={talent.name}
      />
    </div>
  );
}

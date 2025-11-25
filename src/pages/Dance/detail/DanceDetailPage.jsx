import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  Calendar,
  MapPin,
  Timer,
  Users,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DANCE_DATA } from "@/data/danceData";
import { CategoryBadge } from "@/components/dance/CategoryBadge";

import { CommunityBookingForm } from "@/components/booking/CommunityBookingForm"; // komunitas
import { TicketFormDialog } from "@/components/booking/TicketFormDialog"; // 🔥 event
import { PaymentDialog } from "@/components/booking/PaymentDialog"; // bayar

export default function DanceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dance = DANCE_DATA.find((d) => d.id == id);

const [openCommunityForm, setOpenCommunityForm] = useState(false);
const [openTicketForm, setOpenTicketForm] = useState(false);
const [openPayment, setOpenPayment] = useState(false);


  const [selectedTier, setSelectedTier] = useState(null);
  const [ticketBuyerData, setTicketBuyerData] = useState(null);

  if (!dance) return <div className="p-6 text-center">Data tidak ditemukan.</div>;

  /* TIERS EVENT */
  const tiers = [
    {
      id: "general",
      name: "General Pass",
      price: "Rp 35.000",
      perks: ["Akses masuk event", "Spot menonton reguler"],
    },
    {
      id: "premium",
      name: "Premium Pass",
      price: "Rp 60.000",
      perks: ["Akses area premium", "Goodie bag", "Prioritas antre"],
    },
    {
      id: "vip",
      name: "VIP Experience",
      price: "Rp 120.000",
      perks: ["Tempat duduk VIP", "Meet & greet penari", "Merchandise eksklusif"],
    },
  ];

  const isCommunity = dance.type === "community";
  const isEvent = dance.type === "event";

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">

      {/* HEADER IMAGE */}
      <div className="relative h-72 overflow-hidden shadow-lg animate-in fade-in zoom-in-50 duration-700">
        <img
          src={dance.image}
          className="w-full h-full object-cover scale-105 animate-in fade-in-50 duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-card shadow-xl rounded-2xl p-6 border border-border backdrop-blur-md animate-in slide-in-from-bottom-4 duration-700">

          <CategoryBadge category={dance.category} />

          <h1 className="text-3xl font-bold mt-3 mb-2">{dance.name}</h1>

          <p className="text-muted-foreground mb-4">{dance.description}</p>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <Calendar /> <span>{dance.date}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <MapPin /> <span>{dance.location}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <Timer /> <span>Durasi: {dance.duration}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <Users /> <span>{dance.members} Penari</span>
            </div>
          </div>

          {/* EVENT ONLY → PACKAGE TIERS */}
          {isEvent && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Paket Event</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`
                      rounded-2xl border p-5 transition cursor-pointer
                      hover:shadow-lg hover:-translate-y-1 hover:border-primary
                      ${
                        selectedTier === tier.id
                          ? "border-primary bg-primary/10 shadow-md"
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
                          <Check size={16} className="text-primary" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* BUTTON */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              className="px-10 py-6 text-base rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition"
              disabled={isEvent && !selectedTier}
              onClick={() => {
                if (isCommunity) setOpenCommunityForm(true);
                else setOpenTicketForm(true);
              }}
            >
              {isCommunity ? "Hubungi / Booking Komunitas" : "Isi Data Tiket"}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Button
              className="px-10 py-6 text-base rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition"
              onClick={() => navigate("/dance")}
            >
              Kembali
            </Button>
          </div>

        </div>
      </div>

      {/* COMMUNITY FORM */}
      <CommunityBookingForm
        open={openCommunityForm}
        onOpenChange={setOpenCommunityForm}
        data={{
          name: dance.name,
          type: "community",
        }}
        onSubmit={(data) => {
          setOpenCommunityForm(false);
          navigate("/payment-success", { state: { mode: "community" } });
        }}
      />

      {/* TICKET FORM (EVENT) */}
      <TicketFormDialog
        open={openTicketForm}
        onOpenChange={setOpenTicketForm}
        eventName={dance.name}
        selectedTier={tiers.find((t) => t.id === selectedTier)}
        onSubmit={(buyer) => {
          setTicketBuyerData(buyer);
          setOpenTicketForm(false);
          setOpenPayment(true);
        }}
      />

      {/* PAYMENT EVENT */}
      <PaymentDialog
        open={openPayment}
        onOpenChange={setOpenPayment}
        tiers={tiers}
        selectedTierId={selectedTier}
        formData={ticketBuyerData}
        onSuccess={() => {
          setSelectedTier(null);
          setTicketBuyerData(null);
          navigate("/payment-success", { state: { mode: "event" } });
        }}
      />
    </div>
  );
}

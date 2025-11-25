import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Calendar, MapPin, Timer, Users, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { THEATER_DATA } from "@/data/theaterData";
import { TheaterCategoryBadge } from "@/components/theater/TheaterCategoryBadge";

import { CommunityBookingForm } from "@/components/booking/CommunityBookingForm";
import { TicketFormDialog } from "@/components/booking/TicketFormDialog";
import { PaymentDialog } from "@/components/booking/PaymentDialog";

export default function TheaterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const show = THEATER_DATA.find((d) => d.id == id);

  const [openCommunityForm, setOpenCommunityForm] = useState(false);
  const [openTicketForm, setOpenTicketForm] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const [selectedTier, setSelectedTier] = useState(null);
  const [buyerData, setBuyerData] = useState(null);

  if (!show) return <div className="p-6 text-center">Data tidak ditemukan.</div>;

  const isCommunity = show.type === "community";
  const isEvent = show.type === "event";

  const tiers = [
    { id: "basic", name: "Basic Pass", price: "Rp 25.000", perks: ["Akses reguler"] },
    { id: "premium", name: "Premium", price: "Rp 50.000", perks: ["Seat premium", "Goodie Bag"] },
    { id: "vip", name: "VIP", price: "Rp 90.000", perks: ["Meet Cast", "Seat VIP"] },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">

      {/* IMAGE */}
      <div className="relative h-72 overflow-hidden shadow-lg">
        <img src={show.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-card shadow-xl rounded-2xl p-6 border border-border">

          <TheaterCategoryBadge category={show.category} />

          <h1 className="text-3xl font-bold mt-3 mb-2">{show.name}</h1>

          <p className="text-muted-foreground mb-4">{show.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <Calendar /> <span>{show.date}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <MapPin /> <span>{show.location}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <Timer /> <span>{show.duration}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <Users /> <span>{show.members} Pemain</span>
            </div>
          </div>

          {isEvent && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Paket Tiket</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`border p-5 rounded-xl cursor-pointer hover:shadow-md transition ${
                      selectedTier === tier.id ? "border-primary bg-primary/10" : "border-border"
                    }`}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-primary font-bold text-lg mb-3">{tier.price}</p>

                    {tier.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-primary" /> {perk}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* BUTTON */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              disabled={isEvent && !selectedTier}
              onClick={() => (isCommunity ? setOpenCommunityForm(true) : setOpenTicketForm(true))}
            >
              {isCommunity ? "Hubungi Komunitas" : "Isi Data Tiket"}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Button onClick={() => navigate("/theater")}>Kembali</Button>
          </div>
        </div>
      </div>

      {/* COMMUNITY FORM */}
      <CommunityBookingForm
        open={openCommunityForm}
        onOpenChange={setOpenCommunityForm}
        data={{ name: show.name, type: "community" }}
        onSubmit={() => navigate("/payment-success", { state: { mode: "community" } })}
      />

      {/* TICKET FORM */}
      <TicketFormDialog
        open={openTicketForm}
        onOpenChange={setOpenTicketForm}
        eventName={show.name}
        selectedTier={tiers.find((x) => x.id === selectedTier)}
        onSubmit={(data) => {
          setBuyerData(data);
          setOpenTicketForm(false);
          setOpenPayment(true);
        }}
      />

      {/* PAYMENT */}
      <PaymentDialog
        open={openPayment}
        onOpenChange={setOpenPayment}
        tiers={tiers}
        selectedTierId={selectedTier}
        formData={buyerData}
        onSuccess={() =>
          navigate("/payment-success", { state: { mode: "event" } })
        }
      />
    </div>
  );
}

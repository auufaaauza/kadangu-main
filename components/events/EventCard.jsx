import { useState } from "react";
import { Calendar, MapPin, Clock, Users, Ticket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TicketFormDialog } from "@/components/booking/TicketFormDialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export function EventCard({ event, type = "event" }) {
    const [showTiers, setShowTiers] = useState(false);
    const [showTicketForm, setShowTicketForm] = useState(false);
    const [selectedTier, setSelectedTier] = useState(null);

    const handleTierSelect = (tier) => {
        setSelectedTier(tier);
        setShowTiers(false);
        setShowTicketForm(true);
    };

    return (
        <>
            <div className="group h-full rounded-2xl bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex flex-col border border-gray-100">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {event.type}
                    </div>

                    {/* Rating Badge */}
                    {event.rating && (
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold text-gray-900">{event.rating}</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col">
                    <div className="mb-3">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {event.name}
                        </h3>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">
                        {event.description}
                    </p>

                    {/* Info */}
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-teal-600" />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-teal-600" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-teal-600" />
                            <span className="line-clamp-1">{event.venue}</span>
                        </div>
                        {event.totalSold && (
                            <div className="flex items-center gap-2">
                                <Users size={16} className="text-teal-600" />
                                <span>{event.totalSold}+ peserta</span>
                            </div>
                        )}
                    </div>

                    {/* Price Range */}
                    {event.tiers && event.tiers.length > 0 && (
                        <div className="mb-4 p-3 bg-teal-50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Mulai dari</span>
                                <span className="font-bold text-teal-600 text-lg">
                                    {event.tiers[0].price}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Button */}
                    <Button
                        onClick={() => setShowTiers(true)}
                        className="w-full bg-teal-600 hover:bg-teal-800 text-white"
                        size="default"
                    >
                        <Ticket className="w-4 h-4 mr-2" />
                        Beli Tiket
                    </Button>
                </div>
            </div>

            {/* Tier Selection Dialog */}
            <Dialog open={showTiers} onOpenChange={setShowTiers}>
                <DialogContent className="max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Pilih Paket Tiket</DialogTitle>
                        <p className="text-sm text-gray-600 mt-1">{event.name}</p>
                    </DialogHeader>

                    <div className="space-y-3 mt-4">
                        {event.tiers?.map((tier, index) => (
                            <div
                                key={index}
                                onClick={() => handleTierSelect(tier)}
                                className="p-4 border-2 border-gray-200 rounded-xl hover:border-teal-600 hover:bg-teal-50 cursor-pointer transition-all"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{tier.name}</h4>
                                        {tier.originalPrice && (
                                            <p className="text-xs text-gray-500 line-through">{tier.originalPrice}</p>
                                        )}
                                    </div>
                                    <span className="font-bold text-teal-600 text-lg">{tier.price}</span>
                                </div>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {tier.benefits?.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-teal-600 mt-0.5">✓</span>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                                {tier.available && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        Tersisa: {tier.available - (tier.sold || 0)} tiket
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Ticket Form Dialog */}
            <TicketFormDialog
                open={showTicketForm}
                onOpenChange={setShowTicketForm}
                eventName={event.name}
                selectedTier={selectedTier}
            />
        </>
    );
}

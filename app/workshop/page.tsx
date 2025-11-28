'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WORKSHOP_EVENTS, WORKSHOP_CATEGORIES } from "@/data/workshopData";
import { EventCard } from "@/components/events/EventCard";

export default function WorkshopPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredEvents = selectedCategory
        ? WORKSHOP_EVENTS.filter((e) => e.category === selectedCategory)
        : WORKSHOP_EVENTS;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Workshop Seni & Kreativitas
                    </h1>
                    <p className="text-lg md:text-xl text-teal-50 max-w-3xl mx-auto">
                        Ikuti workshop untuk mengembangkan skill seni dan kreativitas Anda
                    </p>
                </div>
            </section>

            {/* Events Section */}
            <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Workshop Mendatang
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Pilih workshop yang sesuai dengan minat Anda
                        </p>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <Button
                                onClick={() => setSelectedCategory(null)}
                                variant={selectedCategory === null ? "default" : "outline"}
                                className={
                                    selectedCategory === null
                                        ? "bg-teal-600 hover:bg-teal-800 text-white"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                }
                            >
                                Semua
                            </Button>
                            {WORKSHOP_CATEGORIES.map((cat) => (
                                <Button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value)}
                                    variant={selectedCategory === cat.value ? "default" : "outline"}
                                    className={
                                        selectedCategory === cat.value
                                            ? "bg-teal-600 hover:bg-teal-800 text-white"
                                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }
                                >
                                    {cat.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event} type="workshop" />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-teal-600 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Tingkatkan Skill Anda!
                    </h2>
                    <p className="text-lg mb-8 text-teal-50">
                        Daftar sekarang dan dapatkan sertifikat untuk setiap workshop
                    </p>
                    <Button
                        size="lg"
                        className="bg-white hover:bg-gray-100 text-teal-700 font-semibold px-8 py-6 text-lg"
                    >
                        Lihat Semua Workshop
                    </Button>
                </div>
            </section>
        </div>
    );
}

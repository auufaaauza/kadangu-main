'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ART_TALENTS, ART_CATEGORIES } from "@/data/artData";
import { TalentCard } from "@/components/talent/TalentCard";

export default function ArtPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredTalents = selectedCategory
        ? ART_TALENTS.filter((t) => t.category === selectedCategory)
        : ART_TALENTS;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Seniman & Talenta Seni Rupa
                    </h1>
                    <p className="text-lg md:text-xl text-teal-50 max-w-3xl mx-auto">
                        Booking seniman profesional untuk karya seni dan instalasi Anda
                    </p>
                </div>
            </section>

            {/* Talents Section */}
            <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Seniman Unggulan
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Pilih dari koleksi seniman dan studio seni terbaik kami
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
                            {ART_CATEGORIES.map((cat) => (
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

                    {/* Talents Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTalents.map((talent) => (
                            <TalentCard key={talent.id} talent={talent} type="art" />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-teal-600 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Siap untuk Memesan?
                    </h2>
                    <p className="text-lg mb-8 text-teal-50">
                        Hubungi kami untuk paket khusus dan diskon untuk acara besar Anda
                    </p>
                    <Button
                        size="lg"
                        className="bg-white hover:bg-gray-100 text-teal-700 font-semibold px-8 py-6 text-lg"
                    >
                        Mulai Sekarang
                    </Button>
                </div>
            </section>
        </div>
    );
}

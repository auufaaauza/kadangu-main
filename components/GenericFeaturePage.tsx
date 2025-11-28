'use client'
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface GenericItem {
    id: string;
    name?: string;
    title?: string;
    category: string;
    image?: string;
    description?: string;
    [key: string]: any;
}

interface GenericFeaturePageProps {
    title: string;
    description: string;
    items: GenericItem[];
    categories: { value: string; label: string }[];
    basePath: string;
    renderCard: (item: GenericItem) => React.ReactNode;
    color?: string;
}

export default function GenericFeaturePage({
    title,
    description,
    items,
    categories,
    basePath,
    renderCard,
    color = "blue"
}: GenericFeaturePageProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = items.filter((item) => {
        const matchesCategory = selectedCategory === null || item.category === selectedCategory;
        const searchTerm = searchQuery.toLowerCase();
        const itemName = (item.name || item.title || "").toLowerCase();
        const itemDescription = (item.description || "").toLowerCase();
        const matchesSearch = itemName.includes(searchTerm) || itemDescription.includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    const colorClasses = {
        blue: {
            gradient: "from-blue-500 to-blue-600",
            hover: "hover:from-blue-600 hover:to-blue-700",
            text: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-200",
            button: "bg-blue-600 hover:bg-blue-700"
        },
        orange: {
            gradient: "from-orange-500 to-orange-600",
            hover: "hover:from-orange-600 hover:to-orange-700",
            text: "text-orange-600",
            bg: "bg-orange-50",
            border: "border-orange-200",
            button: "bg-orange-600 hover:bg-orange-700"
        },
        indigo: {
            gradient: "from-indigo-500 to-indigo-600",
            hover: "hover:from-indigo-600 hover:to-indigo-700",
            text: "text-indigo-600",
            bg: "bg-indigo-50",
            border: "border-indigo-200",
            button: "bg-indigo-600 hover:bg-indigo-700"
        },
        yellow: {
            gradient: "from-yellow-500 to-yellow-600",
            hover: "hover:from-yellow-600 hover:to-yellow-700",
            text: "text-yellow-600",
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            button: "bg-yellow-600 hover:bg-yellow-700"
        },
        green: {
            gradient: "from-green-500 to-green-600",
            hover: "hover:from-green-600 hover:to-green-700",
            text: "text-green-600",
            bg: "bg-green-50",
            border: "border-green-200",
            button: "bg-green-600 hover:bg-green-700"
        },
        cyan: {
            gradient: "from-cyan-500 to-cyan-600",
            hover: "hover:from-cyan-600 hover:to-cyan-700",
            text: "text-cyan-600",
            bg: "bg-cyan-50",
            border: "border-cyan-200",
            button: "bg-cyan-600 hover:bg-cyan-700"
        },
        amber: {
            gradient: "from-amber-500 to-amber-600",
            hover: "hover:from-amber-600 hover:to-amber-700",
            text: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-200",
            button: "bg-amber-600 hover:bg-amber-700"
        },
        teal: {
            gradient: "from-teal-500 to-teal-600",
            hover: "hover:from-teal-600 hover:to-teal-700",
            text: "text-teal-600",
            bg: "bg-teal-50",
            border: "border-teal-200",
            button: "bg-teal-600 hover:bg-teal-700"
        }
    };

    const currentColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header Section */}
            <section className={`bg-gradient-to-r ${currentColor.gradient} ${currentColor.hover} py-16 sm:py-20 px-4 sm:px-6 lg:px-8`}>
                <div className="max-w-6xl mx-auto text-center text-white">
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">{title}</h1>
                    <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">{description}</p>
                </div>
            </section>

            {/* Filter and Search Section */}
            <section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Cari..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-6 w-full rounded-xl border-2 focus:ring-2"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button
                            onClick={() => setSelectedCategory(null)}
                            variant={selectedCategory === null ? "default" : "outline"}
                            className={selectedCategory === null ? currentColor.button : "border-border"}
                        >
                            Semua
                        </Button>
                        {categories.map((cat) => (
                            <Button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                variant={selectedCategory === cat.value ? "default" : "outline"}
                                className={selectedCategory === cat.value ? currentColor.button : "border-border"}
                            >
                                {cat.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Items Grid */}
            <section className="pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">Tidak ada hasil ditemukan</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredItems.map((item) => renderCard(item))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className={`bg-gradient-to-r ${currentColor.gradient} py-16 sm:py-20 px-4 sm:px-6 lg:px-8`}>
                <div className="max-w-3xl mx-auto text-center text-white">
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">Tertarik untuk Berkolaborasi?</h2>
                    <p className="text-lg mb-8 opacity-90">Hubungi kami untuk informasi lebih lanjut dan penawaran khusus</p>
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                        Hubungi Kami
                    </Button>
                </div>
            </section>
        </div>
    );
}

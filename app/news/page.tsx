'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag } from "lucide-react";
import { NEWS_DATA, NEWS_CATEGORIES } from "@/data/newsData";

export default function NewsPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredNews = selectedCategory
        ? NEWS_DATA.filter((n) => n.category === selectedCategory)
        : NEWS_DATA;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Berita Seni & Budaya
                    </h1>
                    <p className="text-lg md:text-xl text-teal-50 max-w-3xl mx-auto">
                        Informasi terkini seputar seni, budaya, dan pertunjukan di Indonesia
                    </p>
                </div>
            </section>

            {/* News Section */}
            <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Berita Terkini
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Ikuti perkembangan terbaru dunia seni dan budaya
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
                            {NEWS_CATEGORIES.map((cat) => (
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

                    {/* News Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNews.map((news) => (
                            <div
                                key={news.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-gray-200">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        {news.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                        {news.title}
                                    </h3>

                                    {/* Meta Info */}
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                        <div className="flex items-center gap-1">
                                            <User size={12} className="text-teal-600" />
                                            <span>{news.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} className="text-teal-600" />
                                            <span>{news.date}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                        {news.content}
                                    </p>

                                    <Button
                                        variant="outline"
                                        className="w-full border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                                    >
                                        Baca Selengkapnya
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <Tag className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Topik Populer
                        </h2>
                        <p className="text-lg text-gray-600">
                            Berita yang paling banyak dibaca minggu ini
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredNews.slice(0, 4).map((news) => (
                            <div
                                key={news.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex"
                            >
                                <div className="w-1/3 h-40 overflow-hidden bg-gray-200 flex-shrink-0">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 p-4 flex flex-col">
                                    <span className="text-xs text-teal-600 font-semibold mb-2">{news.category}</span>
                                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 flex-1">
                                        {news.title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span>{news.author}</span>
                                        <span>•</span>
                                        <span>{news.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-teal-600 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Dapatkan Update Terbaru
                    </h2>
                    <p className="text-lg mb-8 text-teal-50">
                        Berlangganan newsletter kami untuk mendapatkan berita seni dan budaya terkini
                    </p>
                    <div className="flex gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Email Anda"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                        />
                        <Button
                            size="lg"
                            className="bg-white hover:bg-gray-100 text-teal-700 font-semibold px-6"
                        >
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

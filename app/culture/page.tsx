'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, User, BookOpen, MapPin, Clock } from "lucide-react";
import {
    CULTURE_DATA,
    CULTURE_CATEGORIES,
    CULTURE_CALENDAR,
    CULTURE_FIGURES,
    CULTURE_STORIES,
} from "@/data/cultureData";

export default function CulturePage() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredCulture = selectedCategory
        ? CULTURE_DATA.filter((c) => c.category === selectedCategory)
        : CULTURE_DATA;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Budaya Nusantara
                    </h1>
                    <p className="text-lg md:text-xl text-teal-50 max-w-3xl mx-auto">
                        Jelajahi kekayaan budaya Indonesia dari Sabang sampai Merauke
                    </p>
                </div>
            </section>

            {/* Kalender Event Budaya */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <Calendar className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Kalender Event Budaya Tahunan
                        </h2>
                        <p className="text-lg text-gray-600">
                            Event budaya yang rutin diselenggarakan setiap tahun
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CULTURE_CALENDAR.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        {event.month}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{event.name}</h3>
                                    <div className="space-y-2 text-sm text-gray-600 mb-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-teal-600" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-teal-600" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tokoh Budaya */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <User className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Tokoh Budaya Indonesia
                        </h2>
                        <p className="text-lg text-gray-600">
                            Mengenal para tokoh yang berkontribusi dalam pelestarian budaya
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CULTURE_FIGURES.map((figure) => (
                            <div
                                key={figure.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                            <img
                                                src={figure.image}
                                                alt={figure.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{figure.name}</h3>
                                            <p className="text-sm text-teal-600 font-semibold mb-1">{figure.title}</p>
                                            <p className="text-xs text-gray-500">{figure.era}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{figure.description}</p>
                                    <div className="space-y-1">
                                        {figure.achievements?.slice(0, 3).map((achievement, i) => (
                                            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                                <span className="text-teal-600 mt-0.5">✓</span>
                                                <span>{achievement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cerita Budaya */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <BookOpen className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Cerita & Legenda Budaya
                        </h2>
                        <p className="text-lg text-gray-600">
                            Cerita rakyat dan legenda yang menjadi bagian dari budaya Indonesia
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {CULTURE_STORIES.map((story) => (
                            <div
                                key={story.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        {story.type}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                        <MapPin size={14} className="text-teal-600" />
                                        <span>{story.region}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{story.summary}</p>
                                    <div className="bg-teal-50 rounded-lg p-3">
                                        <p className="text-xs text-gray-700">
                                            <span className="font-semibold text-teal-700">Pesan Moral:</span> {story.moral}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Budaya Tradisional Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Budaya Tradisional
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Jelajahi berbagai budaya tradisional Indonesia
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
                            {CULTURE_CATEGORIES.map((cat) => (
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

                    {/* Culture Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCulture.map((culture) => (
                            <div
                                key={culture.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={culture.image}
                                        alt={culture.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        {culture.type}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{culture.name}</h3>
                                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-teal-600" />
                                            <span>{culture.region}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-teal-600" />
                                            <span>{culture.era}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{culture.description}</p>
                                    {culture.highlights && (
                                        <div className="flex flex-wrap gap-2">
                                            {culture.highlights.slice(0, 3).map((highlight, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full"
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    )}
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
                        Lestarikan Budaya Indonesia
                    </h2>
                    <p className="text-lg mb-8 text-teal-50">
                        Mari bersama-sama menjaga dan melestarikan kekayaan budaya Nusantara
                    </p>
                    <Button
                        size="lg"
                        className="bg-white hover:bg-gray-100 text-teal-700 font-semibold px-8 py-6 text-lg"
                    >
                        Pelajari Lebih Lanjut
                    </Button>
                </div>
            </section>
        </div>
    );
}

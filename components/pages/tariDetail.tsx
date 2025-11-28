'use client'
import { useState } from "react";
import { ArrowLeft, Users, Clock, MapPin, Sparkles, Calendar, Mail, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DANCES } from "@/data/danceData";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TariDetailPage({ id }: { id: string }) {
    const router = useRouter();
    const dance = DANCES.find((d) => d.id === id);

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        eventName: "",
        eventDate: "",
        eventTime: "",
        eventLocation: "",
        eventDuration: "2",
        guestCount: "",
        fullName: "",
        email: "",
        phone: "",
        message: "",
    });

    if (!dance) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Tarian Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">Kami tidak bisa menemukan tarian yang Anda cari.</p>
                    <Button onClick={() => router.push("/tari")} className="rounded-xl bg-teal-600 hover:bg-teal-700">
                        Kembali ke Halaman Tari
                    </Button>
                </div>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            router.push("/tari");
        }, 2500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Permintaan Berhasil Dikirim!</h2>
                    <p className="text-gray-600 mb-6">
                        Terima kasih atas permintaan pemesanan {dance.name}. Tim kami akan segera menghubungi Anda untuk konfirmasi detail acara.
                    </p>
                    <p className="text-sm text-gray-500">Mengarahkan kembali ke halaman tari...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Button
                        onClick={() => router.push("/tari")}
                        variant="ghost"
                        className="flex items-center gap-2 text-gray-600 hover:text-teal-600"
                    >
                        <ArrowLeft size={20} />
                        Kembali ke Tari
                    </Button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar - Dance Info */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <Card className="overflow-hidden">
                                {/* Dance Image */}
                                <div className="relative h-64 bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                                    <Sparkles className="w-20 h-20 text-white/30" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3 text-teal-600" />
                                            <span className="text-xs font-semibold text-gray-800">{dance.region}</span>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{dance.name}</h1>
                                    <p className="text-sm text-teal-600 font-semibold mb-4">{dance.region}</p>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
                                                <Clock className="w-4 h-4 text-teal-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Durasi</p>
                                                <p className="font-semibold text-gray-900">{dance.duration}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
                                                <Users className="w-4 h-4 text-teal-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Jumlah Penari</p>
                                                <p className="font-semibold text-gray-900">{dance.dancers}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
                                                <Sparkles className="w-4 h-4 text-teal-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Tingkat Kesulitan</p>
                                                <p className="font-semibold text-gray-900">{dance.difficulty}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-4">
                                        <p className="text-xs text-gray-600 mb-1">Estimasi Harga</p>
                                        <p className="text-2xl font-bold text-teal-600 mb-1">{dance.price}</p>
                                        <p className="text-xs text-gray-500">Range: {dance.priceRange}</p>
                                    </div>

                                    <p className="text-sm text-gray-600 leading-relaxed">{dance.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Content - Details & Booking */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Full Description */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang {dance.name}</h2>
                                <p className="text-gray-700 leading-relaxed mb-6">{dance.fullDescription}</p>

                                <h3 className="text-lg font-bold text-gray-900 mb-3">Sejarah</h3>
                                <p className="text-gray-700 leading-relaxed">{dance.history}</p>
                            </CardContent>
                        </Card>

                        {/* Features */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Yang Anda Dapatkan</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {dance.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Occasions */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Cocok untuk Acara</h2>
                                <div className="flex flex-wrap gap-2">
                                    {dance.occasions.map((occasion, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 rounded-full text-sm font-medium"
                                        >
                                            {occasion}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Booking Form */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pesan {dance.name}</h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Event Details */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                                            Detail Acara
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    Nama Acara *
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="eventName"
                                                    value={formData.eventName}
                                                    onChange={handleChange}
                                                    placeholder="Contoh: Pernikahan Adat, Festival Budaya"
                                                    required
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                        Tanggal Acara *
                                                    </label>
                                                    <Input
                                                        type="date"
                                                        name="eventDate"
                                                        value={formData.eventDate}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                        Jam Mulai *
                                                    </label>
                                                    <Input
                                                        type="time"
                                                        name="eventTime"
                                                        value={formData.eventTime}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    Lokasi Acara *
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="eventLocation"
                                                    value={formData.eventLocation}
                                                    onChange={handleChange}
                                                    placeholder="Alamat lengkap venue"
                                                    required
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                        Durasi Pertunjukan
                                                    </label>
                                                    <select
                                                        name="eventDuration"
                                                        value={formData.eventDuration}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
                                                    >
                                                        <option value="1">1 set (15-20 menit)</option>
                                                        <option value="2">2 set (30-40 menit)</option>
                                                        <option value="3">3 set (45-60 menit)</option>
                                                        <option value="custom">Durasi khusus</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                        Perkiraan Jumlah Tamu
                                                    </label>
                                                    <Input
                                                        type="number"
                                                        name="guestCount"
                                                        value={formData.guestCount}
                                                        onChange={handleChange}
                                                        placeholder="Contoh: 100"
                                                        required
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="border-t border-gray-200 pt-6">
                                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                                            Informasi Kontak
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    Nama Lengkap *
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    placeholder="Nama Anda"
                                                    required
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                        Email *
                                                    </label>
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="email@example.com"
                                                        required
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                        Nomor Telepon *
                                                    </label>
                                                    <Input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="+62 812 3456 7890"
                                                        required
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    Catatan Tambahan
                                                </label>
                                                <Textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="Permintaan khusus, pertanyaan, atau informasi tambahan..."
                                                    rows={4}
                                                    className="w-full resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="border-t border-gray-200 pt-6">
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-6 text-lg font-semibold"
                                            size="lg"
                                        >
                                            Kirim Permintaan Pemesanan
                                        </Button>
                                        <p className="text-xs text-gray-500 text-center mt-3">
                                            Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi dan detail lebih lanjut
                                        </p>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

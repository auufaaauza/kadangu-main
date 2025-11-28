'use client'
import { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface GenericDetailPageProps {
    item: any;
    itemType: string;
    backPath: string;
    color?: string;
    renderInfo: (item: any) => React.ReactNode;
    renderContent?: (item: any) => React.ReactNode;
}

export default function GenericDetailPage({
    item,
    itemType,
    backPath,
    color = "blue",
    renderInfo,
    renderContent
}: GenericDetailPageProps) {
    const router = useRouter();
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

    const colorClasses = {
        blue: { gradient: "from-blue-600 to-blue-700", hover: "hover:from-blue-700 hover:to-blue-800", text: "text-blue-600", bg: "bg-blue-50" },
        orange: { gradient: "from-orange-600 to-orange-700", hover: "hover:from-orange-700 hover:to-orange-800", text: "text-orange-600", bg: "bg-orange-50" },
        indigo: { gradient: "from-indigo-600 to-indigo-700", hover: "hover:from-indigo-700 hover:to-indigo-800", text: "text-indigo-600", bg: "bg-indigo-50" },
        yellow: { gradient: "from-yellow-600 to-yellow-700", hover: "hover:from-yellow-700 hover:to-yellow-800", text: "text-yellow-600", bg: "bg-yellow-50" },
        green: { gradient: "from-green-600 to-green-700", hover: "hover:from-green-700 hover:to-green-800", text: "text-green-600", bg: "bg-green-50" },
        cyan: { gradient: "from-cyan-600 to-cyan-700", hover: "hover:from-cyan-700 hover:to-cyan-800", text: "text-cyan-600", bg: "bg-cyan-50" },
        amber: { gradient: "from-amber-600 to-amber-700", hover: "hover:from-amber-700 hover:to-amber-800", text: "text-amber-600", bg: "bg-amber-50" },
        teal: { gradient: "from-teal-600 to-teal-700", hover: "hover:from-teal-700 hover:to-teal-800", text: "text-teal-600", bg: "bg-teal-50" }
    };

    const currentColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            router.push(backPath);
        }, 2500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Permintaan Berhasil Dikirim!</h2>
                    <p className="text-gray-600 mb-6">
                        Terima kasih atas permintaan Anda. Tim kami akan segera menghubungi Anda untuk konfirmasi detail.
                    </p>
                    <p className="text-sm text-gray-500">Mengarahkan kembali...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Button onClick={() => router.push(backPath)} variant="ghost" className={`flex items-center gap-2 text-gray-600 hover:${currentColor.text}`}>
                        <ArrowLeft size={20} />
                        Kembali
                    </Button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            {renderInfo(item)}
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        {renderContent && renderContent(item)}

                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Formulir Pemesanan</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Detail Acara</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">Nama Acara *</label>
                                                <Input type="text" name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Contoh: Acara Perusahaan" required className="w-full" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Tanggal Acara *</label>
                                                    <Input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required className="w-full" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Jam Mulai *</label>
                                                    <Input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} required className="w-full" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">Lokasi Acara *</label>
                                                <Input type="text" name="eventLocation" value={formData.eventLocation} onChange={handleChange} placeholder="Alamat lengkap venue" required className="w-full" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-6">
                                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Informasi Kontak</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">Nama Lengkap *</label>
                                                <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Nama Anda" required className="w-full" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                                                    <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" required className="w-full" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Nomor Telepon *</label>
                                                    <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+62 812 3456 7890" required className="w-full" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">Catatan Tambahan</label>
                                                <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Permintaan khusus..." rows={4} className="w-full resize-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-6">
                                        <Button type="submit" className={`w-full bg-gradient-to-r ${currentColor.gradient} ${currentColor.hover} text-white py-6 text-lg font-semibold`} size="lg">
                                            Kirim Permintaan Pemesanan
                                        </Button>
                                        <p className="text-xs text-gray-500 text-center mt-3">
                                            Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi
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

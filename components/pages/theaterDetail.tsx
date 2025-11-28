'use client'
import GenericDetailPage from "@/components/GenericDetailPage";
import { THEATER_DATA } from "@/data/theaterData";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin } from "lucide-react";

export default function TheaterDetailPage({ id }: { id: string }) {
    const router = useRouter();
    const theater = THEATER_DATA.find((t) => t.id === id);

    if (!theater) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Teater Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">Kami tidak bisa menemukan teater yang Anda cari.</p>
                    <Button onClick={() => router.push("/theater")} className="rounded-xl bg-indigo-600 hover:bg-indigo-700">
                        Kembali ke Halaman Teater
                    </Button>
                </div>
            </div>
        );
    }

    const renderInfo = (item: any) => (
        <Card className="overflow-hidden">
            <div
                className="relative h-64 bg-gradient-to-br from-indigo-400 to-indigo-600"
                style={{
                    backgroundImage: item.image ? `url(${item.image})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-gray-800">{item.genre}</span>
                </div>
            </div>
            <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h1>
                <p className="text-sm text-indigo-600 font-semibold mb-4">{item.category}</p>
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Jumlah Pemain</p>
                            <p className="font-semibold text-gray-900">{item.members} orang</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Lokasi</p>
                            <p className="font-semibold text-gray-900">{item.location}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-600 mb-1">Harga Mulai Dari</p>
                    <p className="text-2xl font-bold text-indigo-600">{item.price}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </CardContent>
        </Card>
    );

    return (
        <GenericDetailPage
            item={theater}
            itemType="Teater"
            backPath="/theater"
            color="indigo"
            renderInfo={renderInfo}
        />
    );
}

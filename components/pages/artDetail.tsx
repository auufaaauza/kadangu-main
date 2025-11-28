'use client'
import GenericDetailPage from "@/components/GenericDetailPage";
import { ART_DATA } from "@/data/artData";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, MapPin } from "lucide-react";

export default function ArtDetailPage({ id }: { id: string }) {
    const router = useRouter();
    const art = ART_DATA.find((a) => a.id === id);

    if (!art) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Karya Seni Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">Kami tidak bisa menemukan karya seni yang Anda cari.</p>
                    <Button onClick={() => router.push("/art")} className="rounded-xl bg-yellow-600 hover:bg-yellow-700">
                        Kembali ke Halaman Seni Rupa
                    </Button>
                </div>
            </div>
        );
    }

    const renderInfo = (item: any) => (
        <Card className="overflow-hidden">
            <div
                className="relative h-64 bg-gradient-to-br from-yellow-400 to-yellow-600"
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
                <p className="text-sm text-yellow-600 font-semibold mb-4">{item.category}</p>
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center">
                            <Palette className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Seniman</p>
                            <p className="font-semibold text-gray-900">{item.artist}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Lokasi</p>
                            <p className="font-semibold text-gray-900">{item.location}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-600 mb-1">Harga</p>
                    <p className="text-2xl font-bold text-yellow-600">{item.price}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </CardContent>
        </Card>
    );

    return (
        <GenericDetailPage
            item={art}
            itemType="Seni Rupa"
            backPath="/art"
            color="yellow"
            renderInfo={renderInfo}
        />
    );
}

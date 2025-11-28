'use client'
import GenericDetailPage from "@/components/GenericDetailPage";
import { CULTURE_DATA } from "@/data/cultureData";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Landmark } from "lucide-react";

export default function CultureDetailPage({ id }: { id: string }) {
    const router = useRouter();
    const culture = CULTURE_DATA.find((c) => c.id === id);

    if (!culture) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Budaya Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">Kami tidak bisa menemukan budaya yang Anda cari.</p>
                    <Button onClick={() => router.push("/culture")} className="rounded-xl bg-amber-600 hover:bg-amber-700">
                        Kembali ke Halaman Budaya
                    </Button>
                </div>
            </div>
        );
    }

    const renderInfo = (item: any) => (
        <Card className="overflow-hidden">
            <div
                className="relative h-64 bg-gradient-to-br from-amber-400 to-amber-600"
                style={{
                    backgroundImage: item.image ? `url(${item.image})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-gray-800">{item.type}</span>
                </div>
            </div>
            <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h1>
                <p className="text-sm text-amber-600 font-semibold mb-4">{item.category}</p>
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Daerah</p>
                            <p className="font-semibold text-gray-900">{item.region}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center">
                            <Landmark className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Era</p>
                            <p className="font-semibold text-gray-900">{item.era}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-600 mb-1">Harga</p>
                    <p className="text-2xl font-bold text-amber-600">{item.price}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </CardContent>
        </Card>
    );

    return (
        <GenericDetailPage
            item={culture}
            itemType="Budaya"
            backPath="/culture"
            color="amber"
            renderInfo={renderInfo}
        />
    );
}

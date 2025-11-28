'use client'
import GenericDetailPage from "@/components/GenericDetailPage";
import { WORKSHOP_DATA } from "@/data/workshopData";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, MapPin } from "lucide-react";

export default function WorkshopDetailPage({ id }: { id: string }) {
    const router = useRouter();
    const workshop = WORKSHOP_DATA.find((w) => w.id === id);

    if (!workshop) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Workshop Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">Kami tidak bisa menemukan workshop yang Anda cari.</p>
                    <Button onClick={() => router.push("/workshop")} className="rounded-xl bg-teal-600 hover:bg-teal-700">
                        Kembali ke Halaman Workshop
                    </Button>
                </div>
            </div>
        );
    }

    const renderInfo = (item: any) => (
        <Card className="overflow-hidden">
            <div
                className="relative h-64 bg-gradient-to-br from-teal-400 to-teal-600"
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
                <p className="text-sm text-teal-600 font-semibold mb-4">{item.category}</p>
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-teal-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Instruktur</p>
                            <p className="font-semibold text-gray-900">{item.instructor}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4 text-teal-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Durasi</p>
                            <p className="font-semibold text-gray-900">{item.duration}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-teal-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Lokasi</p>
                            <p className="font-semibold text-gray-900">{item.location}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-600 mb-1">Harga</p>
                    <p className="text-2xl font-bold text-teal-600">{item.price}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </CardContent>
        </Card>
    );

    return (
        <GenericDetailPage
            item={workshop}
            itemType="Workshop"
            backPath="/workshop"
            color="teal"
            renderInfo={renderInfo}
        />
    );
}

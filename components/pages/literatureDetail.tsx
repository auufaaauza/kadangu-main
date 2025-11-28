'use client'
import GenericDetailPage from "@/components/GenericDetailPage";
import { LITERATURE_DATA } from "@/data/literatureData";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, User } from "lucide-react";

export default function LiteratureDetailPage({ id }: { id: string }) {
    const router = useRouter();
    const literature = LITERATURE_DATA.find((l) => l.id === id);

    if (!literature) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Karya Sastra Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">Kami tidak bisa menemukan karya sastra yang Anda cari.</p>
                    <Button onClick={() => router.push("/literature")} className="rounded-xl bg-green-600 hover:bg-green-700">
                        Kembali ke Halaman Sastra
                    </Button>
                </div>
            </div>
        );
    }

    const renderInfo = (item: any) => (
        <Card className="overflow-hidden">
            <div
                className="relative h-64 bg-gradient-to-br from-green-400 to-green-600"
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h1>
                <p className="text-sm text-green-600 font-semibold mb-4">{item.category}</p>
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Penulis</p>
                            <p className="font-semibold text-gray-900">{item.author}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Jumlah Halaman</p>
                            <p className="font-semibold text-gray-900">{item.pages} halaman</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-600 mb-1">Harga</p>
                    <p className="text-2xl font-bold text-green-600">{item.price}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </CardContent>
        </Card>
    );

    return (
        <GenericDetailPage
            item={literature}
            itemType="Sastra"
            backPath="/literature"
            color="green"
            renderInfo={renderInfo}
        />
    );
}

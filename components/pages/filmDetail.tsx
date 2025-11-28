'use client'
import GenericDetailPage from "@/components/GenericDetailPage";
import { FILM_DATA } from "@/data/filmData";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Clock } from "lucide-react";

export default function FilmDetailPage({ id }: { id: string }) {
    const router = useRouter();
    const film = FILM_DATA.find((f) => f.id === id);

    if (!film) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Film Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">Kami tidak bisa menemukan film yang Anda cari.</p>
                    <Button onClick={() => router.push("/film")} className="rounded-xl bg-cyan-600 hover:bg-cyan-700">
                        Kembali ke Halaman Film
                    </Button>
                </div>
            </div>
        );
    }

    const renderInfo = (item: any) => (
        <Card className="overflow-hidden">
            <div
                className="relative h-64 bg-gradient-to-br from-cyan-400 to-cyan-600"
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
                <p className="text-sm text-cyan-600 font-semibold mb-4">{item.category}</p>
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-cyan-50 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Sutradara</p>
                            <p className="font-semibold text-gray-900">{item.director}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-cyan-50 rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Durasi</p>
                            <p className="font-semibold text-gray-900">{item.duration}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-600 mb-1">Harga</p>
                    <p className="text-2xl font-bold text-cyan-600">{item.price}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </CardContent>
        </Card>
    );

    return (
        <GenericDetailPage
            item={film}
            itemType="Film"
            backPath="/film"
            color="cyan"
            renderInfo={renderInfo}
        />
    );
}

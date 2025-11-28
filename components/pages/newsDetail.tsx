'use client'
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NEWS_DATA } from "@/data/newsData";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function NewsDetailPage({ id }: { id: string }) {
    const router = useRouter();
    const news = NEWS_DATA.find((n) => n.id === id);

    if (!news) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Berita Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">Kami tidak bisa menemukan berita yang Anda cari.</p>
                    <Button onClick={() => router.push("/news")} className="rounded-xl bg-orange-600 hover:bg-orange-700">
                        Kembali ke Halaman Berita
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Button
                        onClick={() => router.push("/news")}
                        variant="ghost"
                        className="flex items-center gap-2 text-gray-600 hover:text-orange-600"
                    >
                        <ArrowLeft size={20} />
                        Kembali ke Berita
                    </Button>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Card>
                    <CardContent className="p-0">
                        {/* Featured Image */}
                        <div
                            className="h-96 bg-gradient-to-br from-orange-400 to-orange-600 relative"
                            style={{
                                backgroundImage: news.image ? `url(${news.image})` : undefined,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="inline-block bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                                    {news.category}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">{news.title}</h1>

                            <div className="flex items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-orange-600" />
                                    <span>{news.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-orange-600" />
                                    <span>{news.date}</span>
                                </div>
                                <Button variant="outline" size="sm" className="ml-auto">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Bagikan
                                </Button>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {news.content}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Related News */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Berita Terkait</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {NEWS_DATA.filter(n => n.id !== id && n.category === news.category)
                            .slice(0, 2)
                            .map((relatedNews) => (
                                <Card
                                    key={relatedNews.id}
                                    className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                    onClick={() => router.push(`/news/${relatedNews.id}`)}
                                >
                                    <div
                                        className="h-32 bg-gradient-to-br from-orange-400 to-orange-600"
                                        style={{
                                            backgroundImage: relatedNews.image ? `url(${relatedNews.image})` : undefined,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{relatedNews.title}</h3>
                                        <p className="text-sm text-gray-600">{relatedNews.date}</p>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

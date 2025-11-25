import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NEWS_DATA } from "@/data/newsData";

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const news = NEWS_DATA.find((n) => n.id == id);

  if (!news) return <div className="p-6 text-center">Berita tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      
      {/* HEADER IMAGE */}
      <div className="relative h-72 w-full overflow-hidden shadow-lg">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-card shadow-xl rounded-2xl p-6 mb-10 border border-border">

          {/* TITLE */}
          <h1 className="text-3xl font-bold mb-3">{news.title}</h1>

          {/* META INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <Calendar size={20} />
              <span>{news.date ?? "Tanggal tidak tersedia"}</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <User size={20} />
              <span>{news.author ?? "Admin"}</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <Tag size={20} />
              <span>{news.category ?? "Umum"}</span>
            </div>
          </div>

          {/* NEWS BODY */}
          <div className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed">
            {news.content?.split("\n").map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}
          </div>

          {/* BUTTON */}
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              className="rounded-xl px-8"
              onClick={() => navigate("/news")}
            >
              Kembali ke Berita
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

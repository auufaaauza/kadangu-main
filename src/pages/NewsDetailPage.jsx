import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Link as LinkIcon,
  Tag,
} from "lucide-react";
import { apiCall } from "@/lib/api";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNewsDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch news detail
        const response = await apiCall(`/v1/beritas/${id}`);

        const newsData = {
          id: response.id,
          title: response.judul,
          content: response.konten,
          image: response.gambar
            ? `http://localhost:8000/storage/${response.gambar}`
            : "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200",
          category: response.kategori || "Berita",
          author: response.penulis?.name || "Admin Kadangu",
          date: response.published_at || response.created_at,
          readTime:
            Math.ceil(response.konten?.length / 1000) + " min" || "5 min",
        };

        setNews(newsData);

        // Fetch related news (same category, exclude current)
        try {
          const relatedResponse = await apiCall(`/v1/beritas`);
          const related = (relatedResponse.data || relatedResponse)
            .filter((item) => item.id !== parseInt(id))
            .slice(0, 3)
            .map((item) => ({
              id: item.id,
              title: item.judul,
              image: item.gambar
                ? `http://localhost:8000/storage/${item.gambar}`
                : "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
              category: item.kategori || "Berita",
              date: item.published_at || item.created_at,
            }));
          setRelatedNews(related);
        } catch (err) {
          console.error("Error loading related news:", err);
        }
      } catch (err) {
        console.error("Error loading news detail:", err);
        setError("Berita tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadNewsDetail();
    }
  }, [id]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = news?.title || "";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link berhasil disalin!");
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Berita tidak ditemukan</h1>
        <button
          onClick={() => navigate("/news")}
          className="text-primary hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Berita
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/news")}
          className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        {/* Category Badge */}
        <div className="absolute top-6 right-6">
          <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <Tag className="w-4 h-4" />
            {news.category}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        {/* Article Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {news.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{news.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(news.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{news.readTime} baca</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mb-8 pb-8 border-b">
            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Bagikan Artikel:
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleShare("facebook")}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                title="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                title="Copy Link"
              >
                <LinkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </motion.div>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-6">Berita Terkait</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(item.date).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prose Styling */}
      <style jsx>{`
        .prose {
          color: #374151;
          line-height: 1.75;
        }
        .prose p {
          margin-bottom: 1.25rem;
        }
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
        }
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }
        .prose ul,
        .prose ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose strong {
          font-weight: 600;
          color: #111827;
        }
        .prose a {
          color: #8b5cf6;
          text-decoration: underline;
        }
        .prose a:hover {
          color: #7c3aed;
        }
        .prose img {
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }
        .prose blockquote {
          border-left: 4px solid #8b5cf6;
          padding-left: 1rem;
          font-style: italic;
          color: #6b7280;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
};

export default NewsDetailPage;

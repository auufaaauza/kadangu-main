import { Newspaper } from "lucide-react";
import { NEWS_ARTISTS } from "@/data/newsData";
import { FeaturePageTemplate } from "@/components/shared/FeaturePageTemplate";

export function NewsPageNew() {
  const categories = ["journalism", "content", "media"];
  const categoryLabels = {
    journalism: "Jurnalisme",
    content: "Konten",
    media: "Media"
  };

  const statsData = [
    { number: "150+", label: "Content Creator" },
    { number: "800+", label: "Konten Selesai" },
    { number: "97%", label: "Pelanggan Puas" }
  ];

  return (
    <FeaturePageTemplate
      featureType="news"
      icon={Newspaper}
      title="Temukan & Pesan"
      subtitle="Jurnalis & Content Creator Terbaik"
      description="Platform digital terpercaya untuk menemukan dan memesan jurnalis dan content creator profesional. Dari berita seni hingga konten kreatif, kami punya semua yang Anda butuhkan."
      artists={NEWS_ARTISTS}
      categories={categories}
      categoryLabels={categoryLabels}
      statsData={statsData}
    />
  );
}

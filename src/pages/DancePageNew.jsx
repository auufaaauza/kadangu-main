import { Drama } from "lucide-react";
import { DANCE_ARTISTS } from "@/data/danceData";
import { FeaturePageTemplate } from "@/components/shared/FeaturePageTemplate";

export function DancePageNew() {
  const categories = ["modern", "traditional", "hiphop", "ballet"];
  const categoryLabels = {
    modern: "Modern",
    traditional: "Tradisional",
    hiphop: "Hip Hop",
    ballet: "Balet"
  };

  const statsData = [
    { number: "300+", label: "Penari Tersedia" },
    { number: "600+", label: "Pertunjukan Selesai" },
    { number: "98%", label: "Pelanggan Puas" }
  ];

  return (
    <FeaturePageTemplate
      featureType="dance"
      icon={Drama}
      title="Temukan & Pesan"
      subtitle="Penari Terbaik Indonesia"
      description="Platform digital terpercaya untuk menemukan dan memesan penari profesional. Dari tari modern hingga tradisional, kami punya semua yang Anda butuhkan."
      artists={DANCE_ARTISTS}
      categories={categories}
      categoryLabels={categoryLabels}
      statsData={statsData}
    />
  );
}

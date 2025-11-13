import { Users } from "lucide-react";
import { THEATER_GROUPS } from "@/data/theaterData";
import { FeaturePageTemplate } from "@/components/shared/FeaturePageTemplate";

export function TheaterPage() {
  const categories = ["modern", "experimental", "traditional"];
  const categoryLabels = {
    modern: "Modern",
    experimental: "Eksperimental", 
    traditional: "Tradisional"
  };

  const statsData = [
    { number: "50+", label: "Grup Teater" },
    { number: "200+", label: "Pertunjukan Selesai" },
    { number: "95%", label: "Pelanggan Puas" }
  ];

  return (
    <FeaturePageTemplate
      featureType="theater"
      icon={Users}
      title="Temukan & Pesan"
      subtitle="Grup Teater Terbaik"
      description="Platform digital terpercaya untuk menemukan dan memesan grup teater profesional. Dari teater modern hingga tradisional, kami punya semua yang Anda butuhkan."
      artists={THEATER_GROUPS}
      categories={categories}
      categoryLabels={categoryLabels}
      statsData={statsData}
    />
  );
}

import { Palette } from "lucide-react";
import { ART_ARTISTS } from "@/data/artData";
import { FeaturePageTemplate } from "@/components/shared/FeaturePageTemplate";

export function ArtPageNew() {
  const categories = ["painting", "sculpture", "digital"];
  const categoryLabels = {
    painting: "Lukisan",
    sculpture: "Patung",
    digital: "Digital"
  };

  const statsData = [
    { number: "100+", label: "Seniman Tersedia" },
    { number: "300+", label: "Karya Selesai" },
    { number: "97%", label: "Pelanggan Puas" }
  ];

  return (
    <FeaturePageTemplate
      featureType="art"
      icon={Palette}
      title="Temukan & Pesan"
      subtitle="Seniman Seni Rupa Terbaik"
      description="Platform digital terpercaya untuk menemukan dan memesan seniman seni rupa profesional. Dari lukisan hingga seni digital, kami punya semua yang Anda butuhkan."
      artists={ART_ARTISTS}
      categories={categories}
      categoryLabels={categoryLabels}
      statsData={statsData}
    />
  );
}

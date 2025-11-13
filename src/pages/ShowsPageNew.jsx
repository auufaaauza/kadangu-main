import { Ticket } from "lucide-react";
import { SHOWS_ARTISTS } from "@/data/showsData";
import { FeaturePageTemplate } from "@/components/shared/FeaturePageTemplate";

export function ShowsPageNew() {
  const categories = ["variety", "magic", "comedy", "acrobatic"];
  const categoryLabels = {
    variety: "Varietas",
    magic: "Sulap",
    comedy: "Komedi",
    acrobatic: "Akrobatik"
  };

  const statsData = [
    { number: "200+", label: "Grup Pertunjukan" },
    { number: "500+", label: "Show Selesai" },
    { number: "99%", label: "Pelanggan Puas" }
  ];

  return (
    <FeaturePageTemplate
      featureType="shows"
      icon={Ticket}
      title="Temukan & Pesan"
      subtitle="Pertunjukan Terbaik Indonesia"
      description="Platform digital terpercaya untuk menemukan dan memesan pertunjukan profesional. Dari variety show hingga akrobatik, kami punya semua yang Anda butuhkan."
      artists={SHOWS_ARTISTS}
      categories={categories}
      categoryLabels={categoryLabels}
      statsData={statsData}
    />
  );
}

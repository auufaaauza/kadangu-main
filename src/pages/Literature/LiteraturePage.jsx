import { Users } from "lucide-react";
import { LITERATURE_ARTISTS } from "@/data/literatureData";
import { FeaturePageTemplate } from "@/components/shared/FeaturePageTemplate";

export function LiteraturePage() {
  const categories = ["puisi", "storytelling", "traditional"];
  const categoryLabels = {
    puisi: "Puisi",
    storytelling: "Storytelling", 
    traditional: "Tradisional"
  };

  return (
    <FeaturePageTemplate
      featureType="sastra"
      icon={Users}
      artists={LITERATURE_ARTISTS}
      categories={categories}
      categoryLabels={categoryLabels}
    />
  );
}

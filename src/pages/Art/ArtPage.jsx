import { Palette } from "lucide-react";
import { ART_ARTISTS } from "@/data/artData";
import { FeaturePageTemplate } from "@/components/shared/FeaturePageTemplate";

export function ArtPage() {
  const categories = ["painting", "sculpture", "digital"];
  const categoryLabels = {
    painting: "Lukisan",
    sculpture: "Patung",
    digital: "Digital"
  };

  return (
    <FeaturePageTemplate
      featureType="art"
      icon={Palette}
      artists={ART_ARTISTS}
      categories={categories}
      categoryLabels={categoryLabels}

    />
  );
}

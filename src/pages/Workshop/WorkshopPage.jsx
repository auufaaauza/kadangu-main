import { Users } from "lucide-react";
import { WORKSHOP_FACILITATORS } from "@/data/workshopData";
import { FeaturePageTemplate } from "@/components/shared/FeaturePageTemplate";

export function WorkshopPage() {
  const categories = ["creative", "craft", "performance"];
  const categoryLabels = {
    creative: "Creative",
    craft: "Craft", 
    performance: "Performance"
  };

   return (
    <FeaturePageTemplate
      featureType="workshop"
      icon={Users}
      artists={WORKSHOP_FACILITATORS}
      categories={categories}
      categoryLabels={categoryLabels}
    />
  );
}

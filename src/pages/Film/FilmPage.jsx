import { Drama } from "lucide-react";
import { FILM_ARTISTS } from "@/data/filmData";
import { FeaturePageTemplate } from "@/components/shared/FeaturePageTemplate";

export function FilmPage() {
  const categories = ["short","documentary","independent"];
  const categoryLabels = {
    short:"Short",
    documentary:"Documentary",
    independent:"Independent"
  };

  return (
    <FeaturePageTemplate
      featureType="film"
      icon={Drama}
      artists={FILM_ARTISTS}
      categories={categories}
      categoryLabels={categoryLabels}
    />
  );
}

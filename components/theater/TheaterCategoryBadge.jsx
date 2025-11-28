// src/components/theater/TheaterCategoryBadge.jsx
import { cn } from "@/lib/utils";

const theaterCategoryLabels = {
  Drama: "Drama",
  Komedi: "Komedi",
  Musikal: "Musikal",
  Tradisional: "Tradisional",
  Modern: "Modern",
};

const theaterCategoryColors = {
  Drama: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  Komedi: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  Musikal: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  Tradisional: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  Modern: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
};

export function TheaterCategoryBadge({ category }) {
  const label = theaterCategoryLabels[category] ?? category;
  const color = theaterCategoryColors[category] ?? "bg-slate-100 text-slate-700";

  return (
    <span
      className={cn(
        "inline-block px-3 py-1 rounded-full text-xs font-semibold",
        color
      )}
    >
      {label}
    </span>
  );
}

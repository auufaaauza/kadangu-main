import { cn } from "@/lib/utils";

const newsCategoryLabels = {
  Festival: "Festival",
  Teater: "Teater",
  "Seni Rupa": "Seni Rupa",
  Musik: "Musik",
  Film: "Film",
};

const newsCategoryColors = {
  Festival: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  Teater: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  "Seni Rupa": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  Musik: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  Film: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
};

export function CategoryBadge({ category }) {
  const label = newsCategoryLabels[category] ?? category;
  const color = newsCategoryColors[category] ?? "bg-slate-100 text-slate-700";

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

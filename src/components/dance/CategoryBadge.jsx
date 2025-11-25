import { cn } from "@/lib/utils";

const danceCategoryLabels = {
  Tradisional: "Tradisional",
  Modern: "Modern",
  Street: "Street Dance",
};

const danceCategoryColors = {
  Tradisional: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  Modern: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  Street: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
};

export function CategoryBadge({ category }) {
  const label = danceCategoryLabels[category] ?? category;
  const color = danceCategoryColors[category] ?? "bg-slate-100 text-slate-700";

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

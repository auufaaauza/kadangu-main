import { cn } from '@/lib/utils';

const categoryLabels = {
variety:"Varietas",
magic:"Magic",
comedy:"Comedy",
acrobatic:"Akrobat",
};

const categoryColors = {
  band: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  solo: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  group: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  orchestra:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
};

export function CategoryBadge({ category }) {
  const label = categoryLabels[category] ?? category;
  const color = categoryColors[category] ?? "bg-slate-100 text-slate-700";
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

export { categoryLabels, categoryColors };

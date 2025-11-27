import { cn } from "@/lib/utils";

const platformColors = {
  instagram: "bg-pink-100 text-pink-700",
  tiktok: "bg-slate-800 text-white",
  youtube: "bg-red-100 text-red-700"
};

export function TalentCategoryBadge({ category }) {
  const label = {
    instagram: "Instagram",
    tiktok: "TikTok",
    youtube: "YouTube",
  }[category];

  const color = platformColors[category] ?? "bg-slate-100 text-slate-700";

  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-semibold", color)}>
      {label}
    </span>
  );
}

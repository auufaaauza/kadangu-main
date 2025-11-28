import { TALENT_NICHES } from "@/data/talentMeta";
import { cn } from "@/lib/utils";

export function TalentNicheBadge({ niche }) {
  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary"
    )}>
      {TALENT_NICHES[niche]}
    </span>
  );
}

import { Link as RouterLink } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/news/CategoryBadge";

export function NewsCard({ news }) {
  const excerpt =
    news.content.replace(/\s+/g, " ").trim().slice(0, 130) + "...";

  return (
    <RouterLink
      to={`/news/detail/${news.id}`}
      className="group h-full rounded-2xl bg-card overflow-hidden 
                 shadow-md hover:shadow-xl transition-all duration-300 
                 hover:scale-[1.02] hover:-translate-y-1 flex flex-col 
                 border border-border"
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover 
                     group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1 space-y-3">

        {/* CATEGORY */}
        <CategoryBadge category={news.category} />

        {/* TITLE */}
        <h3 className="text-lg font-heading font-bold leading-snug 
                       group-hover:text-primary transition-colors line-clamp-2">
          {news.title}
        </h3>

        {/* META INFO */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} /> {news.date}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={14} /> {news.author}
          </span>
        </div>

        {/* EXCERPT */}
        <p className="text-sm text-muted-foreground flex-1 line-clamp-3">
          {excerpt}
        </p>

        {/* READ MORE BUTTON */}
        <Button
          className="w-full mt-auto py-2 px-4 font-medium 
                     hover:bg-primary/10 transition-colors rounded-lg"
        >
          Baca selengkapnya →
        </Button>
      </div>
    </RouterLink>
  );
}

import { Music } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection({ onExploreClick, onHowItWorksClick }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16 sm:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <Music className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 leading-tight">
          Temukan & Pesan
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Artis Terbaik Indonesia
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Platform digital terpercaya untuk menemukan dan memesan musisi profesional. 
          Dari band rock hingga orkestra klasik, kami punya semua yang Anda butuhkan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={onExploreClick}>Jelajahi Artis</Button>
          <Button size="lg" variant="outline" className="border-primary text-primary" onClick={onHowItWorksClick}>Cara Kerja</Button>
        </div>
      </div>
    </div>
  );
}

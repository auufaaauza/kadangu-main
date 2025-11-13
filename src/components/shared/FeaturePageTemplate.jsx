import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArtistCard } from "@/components/music/ArtistCard";
import { HowItWorksModal } from "./HowItWorksModal";
import { ExploreSection } from "./ExploreSection";

export function FeaturePageTemplate({ 
  featureType,
  icon: Icon,
  title,
  subtitle,
  description,
  artists,
  categories,
  categoryLabels,
  statsData
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const filteredArtists = selectedCategory
    ? artists.filter((a) => a.category === selectedCategory)
    : artists;

  const scrollToArtists = () => {
    document.getElementById('artists')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Icon className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 leading-tight">
            {title}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {subtitle}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToArtists}>
              Jelajahi {featureType === 'music' ? 'Artis' : featureType === 'shows' ? 'Pertunjukan' : featureType === 'news' ? 'Creator' : featureType === 'dance' ? 'Penari' : 'Artis'}
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary" onClick={() => setShowHowItWorks(true)}>
              Cara Kerja
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-card py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explore Section */}
      <ExploreSection featureType={featureType} />

      {/* Artists Section */}
      <section id="artists" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              {featureType === 'music' ? 'Artis Unggulan' : 
               featureType === 'shows' ? 'Pertunjukan Unggulan' :
               featureType === 'news' ? 'Creator & Jurnalis Unggulan' :
               featureType === 'dance' ? 'Penari Unggulan' :
               'Artis Unggulan'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Pilih dari koleksi {featureType === 'music' ? 'artis dan musisi' : 
                                 featureType === 'shows' ? 'grup pertunjukan' :
                                 featureType === 'news' ? 'content creator dan jurnalis' :
                                 featureType === 'dance' ? 'penari' :
                                 'artis'} terbaik kami
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => setSelectedCategory(null)}
                variant={selectedCategory === null ? "default" : "outline"}
                className={selectedCategory === null ? "" : "border-border"}
              >
                Semua
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className={selectedCategory === cat ? "" : "border-border"}
                >
                  {categoryLabels[cat] || cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">Siap untuk Memesan?</h2>
          <p className="text-lg mb-8 opacity-90">Hubungi kami untuk paket khusus dan diskon untuk acara besar Anda</p>
          <Button size="lg" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary">Mulai Sekarang</Button>
        </div>
      </section>

      {/* Modal */}
      <HowItWorksModal 
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
        featureType={featureType}
      />
    </div>
  );
}

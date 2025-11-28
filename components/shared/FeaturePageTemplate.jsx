import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
export function FeaturePageTemplate({ 
  featureType,
  icon: Icon,
  title,
  subtitle,
  description,
  artists,
  categories,
  categoryLabels,
  date
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
      {/* Artists Section */}
   <section id="artists" className="pt-6 pb-12 sm:pt-8 sm:pb-16 px-4 sm:px-6 lg:px-8">
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
    <Card key={artist.id} className="overflow-hidden shadow-md">
      
      <img 
        src={artist.image} 
        alt={artist.name}
        className="w-full h-48 object-cover"
      />

      <CardHeader>
        <CardTitle>{artist.name}</CardTitle>
        <CardDescription>{artist.genre}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 mb-3">{artist.description}</p>

        <div className="text-sm text-gray-500 space-y-1">
          <p>{artist.location}</p>
          <p>{artist.date}</p>
          <p>{artist.members} anggota</p>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full">Lihat Detail</Button>
      </CardFooter>
    </Card>
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
    </div>
  );
}

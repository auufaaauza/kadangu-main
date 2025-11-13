import React from "react";
import { ArrowRight, Sparkles, Trophy, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExploreSection({ featureType = "artis" }) {
  const getFeatureContent = () => {
    const contents = {
      music: {
        title: "Mengapa Pilih Musisi Kami?",
        features: [
          {
            icon: Trophy,
            title: "Musisi Berpengalaman",
            description: "Semua musisi telah terverifikasi dan memiliki track record yang baik"
          },
          {
            icon: Sparkles,
            title: "Kualitas Terjamin",
            description: "Performa berkualitas tinggi dengan peralatan profesional"
          },
          {
            icon: Clock,
            title: "Booking Fleksibel",
            description: "Jadwal yang dapat disesuaikan dengan kebutuhan acara Anda"
          },
          {
            icon: Shield,
            title: "Garansi Kepuasan",
            description: "Jaminan 100% uang kembali jika tidak puas dengan layanan"
          }
        ]
      },
      shows: {
        title: "Keunggulan Pertunjukan Kami",
        features: [
          {
            icon: Trophy,
            title: "Pertunjukan Spektakuler",
            description: "Grup pertunjukan terbaik dengan konsep yang unik dan menarik"
          },
          {
            icon: Sparkles,
            title: "Produksi Profesional",
            description: "Dukungan teknis lengkap untuk pertunjukan yang memukau"
          },
          {
            icon: Clock,
            title: "Customizable Show",
            description: "Pertunjukan dapat disesuaikan dengan tema dan durasi acara"
          },
          {
            icon: Shield,
            title: "Asuransi Acara",
            description: "Perlindungan penuh untuk setiap pertunjukan yang dipesan"
          }
        ]
      },
      news: {
        title: "Keunggulan Content Creator Kami",
        features: [
          {
            icon: Trophy,
            title: "Creator Profesional",
            description: "Jurnalis dan content creator berpengalaman di bidangnya"
          },
          {
            icon: Sparkles,
            title: "Konten Berkualitas",
            description: "Hasil konten yang engaging dan sesuai target audience"
          },
          {
            icon: Clock,
            title: "Deadline Terjaga",
            description: "Komitmen waktu yang ketat untuk setiap project konten"
          },
          {
            icon: Shield,
            title: "Revisi Unlimited",
            description: "Revisi tanpa batas hingga hasil sesuai ekspektasi"
          }
        ]
      },
      dance: {
        title: "Keistimewaan Penari Kami",
        features: [
          {
            icon: Trophy,
            title: "Penari Profesional",
            description: "Penari berpengalaman dari berbagai aliran dan gaya tari"
          },
          {
            icon: Sparkles,
            title: "Koreografi Original",
            description: "Gerakan tari yang disesuaikan dengan tema dan musik acara"
          },
          {
            icon: Clock,
            title: "Latihan Intensif",
            description: "Persiapan matang dengan latihan rutin sebelum penampilan"
          },
          {
            icon: Shield,
            title: "Kostum Included",
            description: "Kostum tari yang sesuai tema disediakan tanpa biaya tambahan"
          }
        ]
      },
      default: {
        title: "Mengapa Pilih Artis Kami?",
        features: [
          {
            icon: Trophy,
            title: "Artis Terpilih",
            description: "Hanya artis terbaik yang telah melalui seleksi ketat"
          },
          {
            icon: Sparkles,
            title: "Performa Terbaik",
            description: "Jaminan kualitas penampilan yang memukau audiens"
          },
          {
            icon: Clock,
            title: "Tepat Waktu",
            description: "Komitmen waktu yang profesional untuk setiap acara"
          },
          {
            icon: Shield,
            title: "Terpercaya",
            description: "Platform booking yang aman dan terpercaya"
          }
        ]
      }
    };

    return contents[featureType] || contents.default;
  };

  const content = getFeatureContent();

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pelanggan yang telah merasakan pengalaman luar biasa bersama kami
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {content.features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 sm:p-8 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 sm:p-8 lg:p-12">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
              Siap Memulai Pengalaman Luar Biasa?
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Jangan tunggu lagi! Temukan artis terbaik untuk acara impian Anda sekarang juga.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto group">
                Mulai Jelajahi
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary">
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

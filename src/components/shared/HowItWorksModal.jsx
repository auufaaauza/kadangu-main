import React from "react";
import { X, CheckCircle, Users, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HowItWorksModal({ isOpen, onClose, featureType = "artis" }) {
  if (!isOpen) return null;

  const getFeatureContent = () => {
    const contents = {
      music: {
        title: "Cara Pesan Musisi",
        subtitle: "Mudah dalam 4 langkah",
        steps: [
          {
            icon: Users,
            title: "Pilih Musisi",
            description: "Jelajahi berbagai musisi dan band sesuai genre favorit Anda"
          },
          {
            icon: Calendar,
            title: "Tentukan Jadwal",
            description: "Pilih tanggal, waktu, dan durasi pertunjukan yang diinginkan"
          },
          {
            icon: CheckCircle,
            title: "Konfirmasi Booking",
            description: "Isi detail acara dan konfirmasi pemesanan dengan musisi"
          },
          {
            icon: Star,
            title: "Nikmati Pertunjukan",
            description: "Musisi akan tampil sesuai jadwal dan memberikan pengalaman terbaik"
          }
        ]
      },
      shows: {
        title: "Cara Pesan Pertunjukan",
        subtitle: "Proses booking yang simpel",
        steps: [
          {
            icon: Users,
            title: "Pilih Pertunjukan",
            description: "Temukan grup pertunjukan terbaik dari berbagai kategori"
          },
          {
            icon: Calendar,
            title: "Atur Jadwal",
            description: "Koordinasikan waktu dan tempat dengan tim pertunjukan"
          },
          {
            icon: CheckCircle,
            title: "Finalisasi Detail",
            description: "Sepakati rundown acara dan kebutuhan teknis"
          },
          {
            icon: Star,
            title: "Show Time!",
            description: "Nikmati pertunjukan spektakuler yang tak terlupakan"
          }
        ]
      },
      news: {
        title: "Cara Pesan Content Creator",
        subtitle: "Kolaborasi kreatif dimulai di sini",
        steps: [
          {
            icon: Users,
            title: "Pilih Creator",
            description: "Temukan jurnalis dan content creator sesuai kebutuhan konten Anda"
          },
          {
            icon: Calendar,
            title: "Diskusi Project",
            description: "Bahas brief, timeline, dan ekspektasi hasil konten"
          },
          {
            icon: CheckCircle,
            title: "Mulai Produksi",
            description: "Creator mulai mengerjakan konten sesuai kesepakatan"
          },
          {
            icon: Star,
            title: "Terima Hasil",
            description: "Dapatkan konten berkualitas tinggi yang siap dipublikasi"
          }
        ]
      },
      dance: {
        title: "Cara Pesan Penari",
        subtitle: "Gerakan indah untuk acara Anda",
        steps: [
          {
            icon: Users,
            title: "Pilih Penari",
            description: "Jelajahi berbagai gaya tari dari tradisional hingga modern"
          },
          {
            icon: Calendar,
            title: "Latihan & Persiapan",
            description: "Koordinasi koreografi dan persiapan sesuai tema acara"
          },
          {
            icon: CheckCircle,
            title: "Rehearsal",
            description: "Gladi bersih untuk memastikan penampilan yang sempurna"
          },
          {
            icon: Star,
            title: "Penampilan Memukau",
            description: "Saksikan tarian yang mempesona dan menghibur audiens"
          }
        ]
      },
      default: {
        title: "Cara Pesan Artis",
        subtitle: "Booking artis jadi mudah",
        steps: [
          {
            icon: Users,
            title: "Pilih Artis",
            description: "Temukan artis terbaik sesuai kebutuhan acara Anda"
          },
          {
            icon: Calendar,
            title: "Atur Jadwal",
            description: "Tentukan waktu dan detail acara bersama artis"
          },
          {
            icon: CheckCircle,
            title: "Konfirmasi",
            description: "Finalisasi semua detail dan kesepakatan"
          },
          {
            icon: Star,
            title: "Acara Sukses",
            description: "Nikmati acara yang berkesan dengan performa terbaik"
          }
        ]
      }
    };

    return contents[featureType] || contents.default;
  };

  const content = getFeatureContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-card rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-slate-800/90 p-2 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors"
        >
          <X size={20} className="text-slate-600 dark:text-slate-300" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
              {content.title}
            </h2>
            <p className="text-muted-foreground">{content.subtitle}</p>
          </div>

          <div className="space-y-6">
            {content.steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-foreground mb-1">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Siap untuk memulai? Hubungi kami sekarang!
              </p>
              <Button onClick={onClose} className="w-full sm:w-auto">
                Mulai Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

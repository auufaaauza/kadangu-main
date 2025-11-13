import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Music, MapPin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function JoinTalentPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    genre: "",
    experience: "",
    videoLink: "",
    location: "",
    bio: "",
  });

  const GENRES = [
    "Jazz",
    "Pop",
    "Rock",
    "R&B",
    "Hip-Hop",
    "Klasik",
    "Reggae",
    "Indie Folk",
    "Electronic",
    "Lainnya",
  ];

  const sendToWhatsApp = () => {
    const message = `🎵 *Pendaftaran Talent Baru - Kadangu*\n\n*Data Diri:*\nNama: ${formData.fullName}\nEmail: ${formData.email}\nNo. Telepon: ${formData.phone}\nLokasi: ${formData.location}\n\n*Informasi Musik:*\nGenre: ${formData.genre}\nPengalaman: ${formData.experience} tahun\nLink Video: ${formData.videoLink}\n\n*Bio/Deskripsi:*\n${formData.bio}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "62812XXXXXXXX"; // ganti ke nomor admin Anda
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.videoLink.includes("youtube.com") && !formData.videoLink.includes("youtu.be")) {
      alert("Mohon gunakan link YouTube untuk video contoh bernyanyi");
      return;
    }
    sendToWhatsApp();
    setSubmitted(true);
    setTimeout(() => {
      navigate("/music");
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Pendaftaran Dikirim!</h2>
          <p className="text-muted-foreground mb-6">Terima kasih telah mendaftar menjadi talent Kadangu. Tim kami akan menghubungi Anda melalui WhatsApp untuk proses selanjutnya.</p>
          <p className="text-sm text-muted-foreground">Mengarahkan ke halaman beranda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-white dark:bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button onClick={() => navigate("/music")} variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Button>
        </div>
      </header>

      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Music className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">Bergabunglah dengan Kadangu</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Daftarkan diri Anda dan jadilah bagian dari manajemen talent profesional Kadangu. Perluas peluang penampilan dan jangkau lebih banyak klien.</p>
        </div>
      </div>

      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8">Form Pendaftaran Talent</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-sm font-heading font-bold text-foreground mb-4 uppercase tracking-wider">Informasi Pribadi</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">Nama Lengkap</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Nama Anda" required className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="anda@email.com" required className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">Nomor Telepon</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+62 812 3456 7890" required className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">Lokasi (Kota)</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Contoh: Jakarta, Surabaya, Bandung" required className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-heading font-bold text-foreground mb-4 uppercase tracking-wider">Informasi Musik</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">Genre Musik</label>
                    <select name="genre" value={formData.genre} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">-- Pilih Genre --</option>
                      {GENRES.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">Pengalaman (Tahun)</label>
                    <select name="experience" value={formData.experience} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">-- Pilih Pengalaman --</option>
                      <option value="0-1">0-1 tahun</option>
                      <option value="1-3">1-3 tahun</option>
                      <option value="3-5">3-5 tahun</option>
                      <option value="5-10">5-10 tahun</option>
                      <option value="10+">10+ tahun</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">Link Video Contoh Bernyanyi</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
                      <input type="url" name="videoLink" value={formData.videoLink} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." required className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Gunakan link YouTube yang menampilkan kemampuan bernyanyi/bermain musik Anda</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-heading font-bold text-foreground mb-4 uppercase tracking-wider">Deskripsi Diri</h3>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Bio/Portofolio Singkat</label>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Ceritakan tentang diri Anda, prestasi, pengalaman pertunjukan, dan mengapa ingin bergabung dengan Kadangu..." rows={5} required className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground" size="lg">
                  Daftar dan Hubungi Admin via WhatsApp
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">Dengan klik tombol di atas, Anda akan diarahkan ke WhatsApp admin. Tim kami akan merespons dalam waktu 24 jam.</p>
              </div>
            </form>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-card rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">Lebih Banyak Kesempatan</h3>
              <p className="text-sm text-muted-foreground">Dapatkan akses ke berbagai booking event dan acara dari klien Kadangu</p>
            </div>
            <div className="bg-white dark:bg-card rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">Jangkauan Luas</h3>
              <p className="text-sm text-muted-foreground">Terhubung dengan klien dari berbagai kota di seluruh Indonesia</p>
            </div>
            <div className="bg-white dark:bg-card rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">Dukungan Profesional</h3>
              <p className="text-sm text-muted-foreground">Dapatkan dukungan penuh dari tim manajemen Kadangu yang berpengalaman</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

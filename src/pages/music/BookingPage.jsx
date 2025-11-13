import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ARTISTS } from "@/data/musicData";

export function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const artist = ARTISTS.find((a) => a.id === id);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventDuration: "2",
    guestCount: "",
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  if (!artist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Artis Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-6">Kami tidak bisa menemukan artis yang Anda cari.</p>
          <Button onClick={() => navigate("/music")} className="rounded-xl">Kembali ke Beranda</Button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Permintaan Pesanan Dikirim!</h2>
          <p className="text-muted-foreground mb-6">Terima kasih atas permintaan pesanan Anda. Kami akan meninjau dan mengonfirmasi detail acara Anda segera.</p>
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
            Kembali ke Artis
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-card rounded-2xl p-6 shadow-md">
              <img src={artist.image} alt={artist.name} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">{artist.name}</h2>
              <p className="text-sm text-accent font-semibold mb-4">{artist.genre}</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Users size={18} className="text-primary" />
                  <span>{artist.members} anggota</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 mb-4">
                <p className="text-xs text-muted-foreground mb-1">Harga Estimasi</p>
                <p className="text-lg font-heading font-bold text-primary">{artist.price}</p>
              </div>
              <p className="text-sm text-muted-foreground">{artist.description}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6">Pesan {artist.name}</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h4 className="text-sm font-heading font-bold text-foreground mb-4 uppercase tracking-wider">Detail Acara</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">Nama Acara</label>
                      <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Contoh: Pernikahan, Acara Perusahaan" required className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1">Tanggal Acara</label>
                        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1">Jam Mulai</label>
                        <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">Lokasi Acara</label>
                      <input type="text" name="eventLocation" value={formData.eventLocation} onChange={handleChange} placeholder="Alamat venue" required className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1">Durasi (Jam)</label>
                        <select name="eventDuration" value={formData.eventDuration} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="1">1 jam</option>
                          <option value="2">2 jam</option>
                          <option value="3">3 jam</option>
                          <option value="4">4 jam</option>
                          <option value="5">5 jam</option>
                          <option value="6+">6+ jam</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1">Jumlah Tamu</label>
                        <input type="number" name="guestCount" value={formData.guestCount} onChange={handleChange} placeholder="Contoh: 100" required className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="text-sm font-heading font-bold text-foreground mb-4 uppercase tracking-wider">Informasi Kontak Anda</h4>
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
                      <label className="block text-sm font-semibold text-foreground mb-1">Permintaan Khusus</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Permintaan atau catatan khusus untuk artis..." rows={4} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground" size="lg">
                    Kirim Permintaan Pesanan
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">Kami akan meninjau permintaan Anda dan menghubungi Anda dalam 24 jam</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

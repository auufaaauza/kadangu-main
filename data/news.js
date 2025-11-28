const featuredNewsItems = [
  {
    category: 'Liputan Acara',
    title: 'Festival Seni Garut 2025: Panggung Kolaborasi Lintas Generasi',
    excerpt: 'Ribuan pasang mata menjadi saksi saat Alun-Alun Garut bertransformasi menjadi lautan kreativitas. Acara ini sukses menyatukan seniman...',
    imageDescription: 'Suasana panggung utama Festival Seni Garut 2025 di malam hari',
    alt: 'Panggung utama Festival Seni Garut 2025',
    author: 'Tim Kadangu',
    date: '08 Nov 2025',
    imgSrc: 'https://images.unsplash.com/photo-1672582524294-ccb6595580ea?q=80&w=2070&auto=format&fit=crop',
  },
  {
    category: 'Profil Talent',
    title: 'Maestro Kacapi Suling, Abah Anom, dan Dedikasinya pada Musik Sunda',
    excerpt: 'Di usianya yang senja, Abah Anom tak pernah lelah mengajarkan seni Kacapi Suling kepada generasi muda. Sebuah kisah inspiratif tentang dedikasi tanpa batas.',
    imageDescription: 'Seorang pria tua sedang memainkan alat musik tradisional Kacapi Suling',
    alt: 'Maestro Kacapi Suling Abah Anom',
    author: 'Rina Maryana',
    date: '05 Nov 2025',
    imgSrc: 'https://images.unsplash.com/photo-1629838029515-5a24987a719a?q=80&w=2070&auto=format&fit=crop',
  },
  {
    category: 'Artikel Budaya',
    title: 'Menelisik Filosofi di Balik Adu Domba Garut: Lebih dari Tontonan',
    excerpt: 'Bukan sekadar adu kekuatan, tradisi ini menyimpan nilai luhur tentang martabat, perawatan, dan kebanggaan komunal. Mari kita pahami lebih dalam...',
    imageDescription: 'Dua Domba Garut yang gagah sedang berhadapan di arena',
    alt: 'Domba Garut dalam tradisi adu domba',
    author: 'Asep Saepuloh',
    date: '02 Nov 2025',
    imgSrc: 'https://images.unsplash.com/photo-1549480017-d7449a5840a3?q=80&w=2070&auto=format&fit=crop',
  },
];

const allNews = [
  {
    category: 'Profil Talent',
    title: 'Sanggar Tari Puspa Sari: Merawat Jaipong di Jantung Generasi Z',
    excerpt: 'Di sebuah sudut kota yang ramai, sekelompok anak muda bersemangat melestarikan warisan. Kenali lebih dekat perjuangan Sanggar Tari Puspa Sari...',
    imageDescription: 'Sekelompok penari muda dari Sanggar Tari Puspa Sari sedang berlatih gerakan Jaipong',
    alt: 'Latihan tari di Sanggar Tari Puspa Sari',
    imgSrc: 'https://images.unsplash.com/photo-1595872018818-97555653a011?q=80&w=2070&auto=format&fit=crop',
  },
  {
    category: 'Kegiatan Komunitas',
    title: 'Workshop Batik Garutan Gratis untuk Pelajar Kembali Dibuka!',
    excerpt: 'Kabar gembira! Kadangu bersama pengrajin lokal kembali membuka kelas membatik untuk para pelajar. Kuota terbatas, daftar sekarang!',
    imageDescription: 'Tangan seorang pelajar yang sedang belajar membatik kain dengan canting',
    alt: 'Workshop membatik Garutan',
    imgSrc: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2070&auto=format&fit=crop',
  },
  {
    category: 'Liputan Acara',
    title: 'Pameran Seni Rupa "Warna Garut" Pukau Ratusan Pengunjung',
    excerpt: 'Galeri Kota menjadi saksi bisu lahirnya karya-karya fenomenal dari seniman rupa lokal dalam pameran tunggal yang berlangsung selama sepekan.',
    imageDescription: 'Sebuah lukisan abstrak dengan warna-warni cerah di sebuah galeri seni',
    alt: 'Lukisan di pameran Warna Garut',
    imgSrc: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2070&auto=format&fit=crop',
  },
  ...featuredNewsItems.slice(1) // Tambahkan berita unggulan lainnya ke daftar berita
];

export { featuredNewsItems, allNews };
export default { featuredNewsItems, allNews };
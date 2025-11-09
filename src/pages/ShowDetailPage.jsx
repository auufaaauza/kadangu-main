import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Play, Plus, Minus, Info, Ticket, User, Mail, Phone, CreditCard, Banknote, QrCode, Download, Copy, Clock, PartyPopper, UploadCloud } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

// Mock data
const showsData = {
  1: { 
    title: 'Monolog: Sepotong Senja untuk Pacarku', 
    genre: 'Teater, Monolog', 
    rating: '13+', 
    duration: '1 jam 30 menit',
    date: 'Sabtu, 15 November 2025',
    time: '19:30 WIB',
    image: 'A dramatic stage performance with a single actor under a spotlight',
    tickets: [
      { id: 'vvip', name: 'VVIP', price: 500000, benefits: 'Baris Depan & Meet and Greet' },
      { id: 'vip', name: 'VIP', price: 350000, benefits: 'Area Tengah & Merchandise' },
      { id: 'premium', name: 'Premium', price: 200000, benefits: 'Area Samping & Poster' },
      { id: 'regular', name: 'Reguler', price: 125000, benefits: 'Kursi Bebas' },
    ]
  },
};

const CountdownTimer = ({ expiryTimestamp }) => {
    const [timeLeft, setTimeLeft] = useState(expiryTimestamp - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeLeft = expiryTimestamp - Date.now();
            if (newTimeLeft <= 0) {
                clearInterval(interval);
                setTimeLeft(0);
            } else {
                setTimeLeft(newTimeLeft);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expiryTimestamp]);

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <span className="font-bold text-lg text-red-500">
            {formatTime(timeLeft)}
        </span>
    );
};

const TicketTierCard = ({ tier, count, onIncrement, onDecrement }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h4 className="font-bold text-lg text-gray-800">{tier.name}</h4>
      <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
        <Info className="w-3.5 h-3.5" />
        {tier.benefits}
      </p>
      <p className="font-bold text-primary mt-2 text-base">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(tier.price)}</p>
    </div>
    <div className="flex items-center gap-3 self-end sm:self-center">
      <Button size="icon" variant="outline" className="w-8 h-8 bg-white rounded-full" onClick={onDecrement} disabled={count === 0}>
        <Minus className="w-4 h-4"/>
      </Button>
      <span className="text-lg font-bold w-10 text-center">{count}</span>
      <Button size="icon" variant="outline" className="w-8 h-8 bg-white rounded-full" onClick={onIncrement}>
        <Plus className="w-4 h-4"/>
      </Button>
    </div>
  </div>
);

const ShowDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const show = showsData[id] || showsData[1]; 

  const [isBuyerDataOpen, setIsBuyerDataOpen] = useState(false);
  const [isTicketHolderDataOpen, setIsTicketHolderDataOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isUploadProofOpen, setIsUploadProofOpen] = useState(false);
  const [paymentProofFile, setPaymentProofFile] = useState(null);
  
  const [buyerData, setBuyerData] = useState({ name: '', email: '', whatsapp: '', identityType: '', identityNumber: '' });
  const [ticketHolders, setTicketHolders] = useState([]);

  const [ticketCounts, setTicketCounts] = useState(
    show.tickets.reduce((acc, ticket) => ({ ...acc, [ticket.id]: 0 }), {})
  );

  const paymentExpiry = useMemo(() => Date.now() + 10 * 60 * 1000, [isPaymentOpen]);

  const { totalAmount, totalTickets } = useMemo(() => {
    let amount = 0;
    let tickets = 0;
    for (const ticket of show.tickets) {
      const count = ticketCounts[ticket.id];
      if (count > 0) {
        amount += ticket.price * count;
        tickets += count;
      }
    }
    return { totalAmount: amount, totalTickets: tickets };
  }, [ticketCounts, show.tickets]);

  useEffect(() => {
    if (totalTickets > 0) {
        const initialHolders = Array(totalTickets).fill({ name: '', identityNumber: '', useMyData: false });
        setTicketHolders(initialHolders);
    } else {
        setTicketHolders([]);
    }
  }, [totalTickets]);

  const handleToast = (feature) => {
    toast({
      title: `🚧 Fitur "${feature}" belum tersedia`,
      description: "Anda bisa request fitur ini di prompt berikutnya! 🚀",
    });
  };

  const handleCopyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: `${type} berhasil disalin!` });
    }).catch(err => {
      toast({ variant: 'destructive', title: `Gagal menyalin ${type}` });
    });
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = 'https://images.unsplash.com/photo-1593433693633-f04c7756b3bf'; 
    link.download = 'QRIS_Pembayaran.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: 'QR Code sedang diunduh...' });
  };


  const handleTicketChange = (ticketId, change) => {
    setTicketCounts(prev => ({
      ...prev,
      [ticketId]: Math.max(0, prev[ticketId] + change)
    }));
  };

  const handleBuyerDataChange = (e) => {
    const { name, value } = e.target;
    setBuyerData(prev => ({ ...prev, [name]: value }));
  };

  const handleIdentityTypeChange = (value) => {
    setBuyerData(prev => ({ ...prev, identityType: value }));
  };

  const handleTicketHolderChange = (index, e) => {
    const { name, value } = e.target;
    const newHolders = [...ticketHolders];
    newHolders[index] = { ...newHolders[index], [name]: value, useMyData: false };
    setTicketHolders(newHolders);
  };

  const applyBuyerDataToHolder = (index, isChecked) => {
    const newHolders = [...ticketHolders];
    if (isChecked) {
      newHolders[index] = { name: buyerData.name, identityNumber: buyerData.identityNumber, useMyData: true };
    } else {
      newHolders[index] = { name: '', identityNumber: '', useMyData: false };
    }
    setTicketHolders(newHolders);
  };
  
  const proceedToPayment = () => {
      setTimeout(() => setIsPaymentOpen(true), 150);
  }

  const handleProceedToTicketHolders = () => {
    if (!buyerData.name || !buyerData.email || !buyerData.whatsapp || !buyerData.identityType || !buyerData.identityNumber) {
      toast({ variant: "destructive", title: "Data Pembeli Belum Lengkap", description: "Mohon isi semua kolom data diri Anda." });
      return;
    }
    
    setIsBuyerDataOpen(false);

    if (totalTickets === 1) {
        const finalHolders = [{ name: buyerData.name, identityNumber: buyerData.identityNumber }];
        setTicketHolders(finalHolders);
        console.log("Order Confirmed (1 ticket):", { buyerData, ticketHolders: finalHolders });
        proceedToPayment();
    } else if (totalTickets > 1) {
        setTimeout(() => setIsTicketHolderDataOpen(true), 150);
    }
  };

  const handleConfirmOrder = () => {
    for (const holder of ticketHolders) {
      if (!holder.name || !holder.identityNumber) {
        toast({ variant: "destructive", title: "Data Pemegang Tiket Belum Lengkap", description: "Mohon isi semua data untuk setiap tiket." });
        return;
      }
    }
    setIsTicketHolderDataOpen(false);
    console.log("Order Confirmed (>1 ticket):", { buyerData, ticketHolders });
    proceedToPayment();
  };

  const handlePaymentConfirmation = () => {
    setIsPaymentOpen(false);
    setTimeout(() => setIsUploadProofOpen(true), 150);
  };

  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProofFile(file);
    }
  };

  const handleFinalConfirmation = () => {
    if (!paymentProofFile) {
      toast({ variant: "destructive", title: "Belum Ada Bukti", description: "Mohon unggah bukti pembayaran Anda." });
      return;
    }
    console.log("Payment proof uploaded:", paymentProofFile.name);
    setIsUploadProofOpen(false);
    navigate('/payment-success');
  };

  return (
    <>
      <Helmet>
        <title>{show.title} - Beli Tiket di Kadangu</title>
        <meta name="description" content={`Beli tiket untuk pertunjukan ${show.title}. Info jadwal, kursi, dan pembayaran.`} />
      </Helmet>
      <div className="min-h-screen bg-white pb-32">
        <Navbar />
        <main className="container mx-auto px-4 mt-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 hidden md:inline-flex">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
                <img alt={show.title} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1615754890620-ef46bf5ff151" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
                 <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="absolute top-4 left-4 text-white bg-black/20 md:hidden">
                    <ChevronLeft className="w-6 h-6" />
                 </Button>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white/30 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm hover:bg-white/50 transition-colors" onClick={() => handleToast('Trailer')}>
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" />
                </div>
                <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white w-full">
                    <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">{show.title}</h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs md:text-base">
                        <span>{show.genre}</span>
                        <span className="before:content-['•'] before:mr-2">{show.rating}</span>
                        <span className="before:content-['•'] before:mr-2">{show.duration}</span>
                    </div>
                </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2 bg-gray-50 p-6 rounded-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Pilih Tiket</h2>
                  <p className="text-gray-600 mt-1">
                    Jadwal: <span className="font-semibold text-gray-700">{show.date}</span>, pukul <span className="font-semibold text-gray-700">{show.time}</span>
                  </p>
                  <div className="space-y-4 mt-6">
                    {show.tickets.map(tier => (
                      <TicketTierCard 
                        key={tier.id}
                        tier={tier}
                        count={ticketCounts[tier.id]}
                        onIncrement={() => handleTicketChange(tier.id, 1)}
                        onDecrement={() => handleTicketChange(tier.id, -1)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:mt-0">
                <div className="bg-gray-50 p-6 rounded-2xl sticky top-24">
                  <h3 className="text-xl font-bold mb-4">Ringkasan Pesanan</h3>
                  <div className="space-y-3 min-h-[60px]">
                    {totalTickets === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">Pilih tiket untuk melihat ringkasan.</p>
                    ) : (
                      show.tickets.map(tier => 
                        ticketCounts[tier.id] > 0 && (
                          <div key={tier.id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">{tier.name} <span className="text-gray-400">x{ticketCounts[tier.id]}</span></span>
                            <span className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(tier.price * ticketCounts[tier.id])}</span>
                          </div>
                        )
                      )
                    )}
                  </div>
                  {totalTickets > 0 && <div className="border-t border-dashed my-4"></div>}
                  <div className={cn("flex justify-between items-center", totalTickets === 0 && "text-gray-400")}>
                    <span className="text-lg font-bold">Total</span>
                    <span className={cn("text-2xl font-bold", totalTickets > 0 && "text-primary")}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalAmount)}</span>
                  </div>
                  <Button size="lg" className="w-full mt-6" onClick={() => setIsBuyerDataOpen(true)} disabled={totalTickets === 0}>
                    <Ticket className="w-5 h-5 mr-2" />
                    Lanjut
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
        <div className="mt-20">
          <Footer />
        </div>
        <BottomNav />
      </div>

      <Dialog open={isBuyerDataOpen} onOpenChange={setIsBuyerDataOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Data Diri Pembeli</DialogTitle>
            <DialogDescription>Data ini akan digunakan untuk E-Tiket dan konfirmasi pesanan.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input id="name" name="name" placeholder="Nama Lengkap" className="pl-10" value={buyerData.name} onChange={handleBuyerDataChange} /></div>
            <div className="grid grid-cols-2 gap-2"><Select onValueChange={handleIdentityTypeChange} value={buyerData.identityType}><SelectTrigger><SelectValue placeholder="Tipe Identitas" /></SelectTrigger><SelectContent><SelectItem value="KTP">KTP</SelectItem><SelectItem value="SIM">SIM</SelectItem><SelectItem value="Paspor">Paspor</SelectItem><SelectItem value="Kartu Pelajar">Kartu Pelajar</SelectItem></SelectContent></Select><Input id="identityNumber" name="identityNumber" placeholder="Nomor Identitas" value={buyerData.identityNumber} onChange={handleBuyerDataChange} /></div>
            <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input id="email" name="email" type="email" placeholder="Alamat Email" className="pl-10" value={buyerData.email} onChange={handleBuyerDataChange} /></div>
            <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input id="whatsapp" name="whatsapp" type="tel" placeholder="Nomor WhatsApp" className="pl-10" value={buyerData.whatsapp} onChange={handleBuyerDataChange} /></div>
          </div>
          <DialogFooter><Button type="submit" onClick={handleProceedToTicketHolders} className="w-full">Lanjut</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTicketHolderDataOpen} onOpenChange={setIsTicketHolderDataOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Data Pemegang Tiket</DialogTitle><DialogDescription>Isi data untuk setiap tiket yang Anda pesan.</DialogDescription></DialogHeader>
          <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto pr-4">
            {ticketHolders.map((holder, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
                <h4 className="font-semibold text-gray-800">Tiket {index + 1}</h4>
                <div className="flex items-center space-x-2"><Checkbox id={`use-my-data-${index}`} checked={holder.useMyData} onCheckedChange={(checked) => applyBuyerDataToHolder(index, checked)} /><Label htmlFor={`use-my-data-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Gunakan data saya</Label></div>
                <div className="grid gap-2"><Input name="name" placeholder="Nama Lengkap" value={holder.name} onChange={(e) => handleTicketHolderChange(index, e)} disabled={holder.useMyData}/><Input name="identityNumber" placeholder={`Nomor ${buyerData.identityType || 'Identitas'}`} value={holder.identityNumber} onChange={(e) => handleTicketHolderChange(index, e)} disabled={holder.useMyData}/></div>
              </div>
            ))}
          </div>
          <DialogFooter><Button type="submit" onClick={handleConfirmOrder} className="w-full"><CreditCard className="w-4 h-4 mr-2" /> Konfirmasi & Bayar</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
          <DialogContent className="sm:max-w-md">
              <DialogHeader>
                  <DialogTitle>Selesaikan Pembayaran</DialogTitle>
                  <DialogDescription className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Batas waktu: <CountdownTimer expiryTimestamp={paymentExpiry} />
                  </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg mb-4">
                      <div className="flex justify-between items-center">
                          <div>
                              <p className="text-sm text-yellow-800">Total Pembayaran</p>
                              <p className="font-bold text-lg text-yellow-900">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalAmount)}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(totalAmount, 'Total Pembayaran')}><Copy className="w-4 h-4" /></Button>
                      </div>
                  </div>

                  <Tabs defaultValue="bank" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="bank"><Banknote className="w-4 h-4 mr-2" />Transfer Bank</TabsTrigger>
                          <TabsTrigger value="qris"><QrCode className="w-4 h-4 mr-2" />QRIS</TabsTrigger>
                      </TabsList>
                      <TabsContent value="bank" className="mt-4">
                          <div className="space-y-3 text-sm">
                              <p>Silakan transfer ke salah satu rekening berikut:</p>
                              <div className="p-3 bg-gray-100 rounded-lg">
                                  <p className="font-bold">Bank BCA</p>
                                  <div className="flex justify-between items-center">
                                      <p className="font-mono text-base">1234567890</p>
                                      <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard('1234567890', 'Nomor Rekening')}><Copy className="w-4 h-4 mr-1" /> Salin</Button>
                                  </div>
                                  <p className="text-xs text-gray-500">a.n. PT Kadangu Kreasi</p>
                              </div>
                          </div>
                      </TabsContent>
                      <TabsContent value="qris" className="mt-4">
                           <div className="flex flex-col items-center gap-4">
                                <p className="text-sm text-center">Pindai kode QR di bawah ini dengan aplikasi pembayaran pilihan Anda.</p>
                                <div className="p-2 border rounded-lg bg-white">
                                    <img alt="QRIS payment code" className="w-48 h-48" src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf" />
                                </div>
                                <Button variant="outline" onClick={handleDownloadQR}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Unduh Barcode
                                </Button>
                           </div>
                      </TabsContent>
                  </Tabs>
              </div>
              <DialogFooter>
                  <Button onClick={handlePaymentConfirmation} className="w-full">
                      <PartyPopper className="w-4 h-4 mr-2" />
                      Saya Sudah Bayar
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

      <Dialog open={isUploadProofOpen} onOpenChange={setIsUploadProofOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unggah Bukti Pembayaran</DialogTitle>
            <DialogDescription>
              Unggah bukti transfer Anda untuk diverifikasi oleh admin.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label htmlFor="payment-proof-upload" className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                {paymentProofFile ? (
                  <p className="font-semibold text-primary">{paymentProofFile.name}</p>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Klik untuk unggah</span> atau seret file</p>
                    <p className="text-xs text-gray-500">PNG, JPG, atau PDF (MAX. 5MB)</p>
                  </>
                )}
              </div>
              <Input id="payment-proof-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleProofUpload} accept="image/png, image/jpeg, application/pdf" />
            </label>
          </div>
          <DialogFooter>
            <Button onClick={handleFinalConfirmation} className="w-full" disabled={!paymentProofFile}>
              Kirim Bukti Pembayaran
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShowDetailPage;
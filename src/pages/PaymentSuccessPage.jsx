import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const PaymentSuccessPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Menunggu Verifikasi - Kadangu</title>
                <meta name="description" content="Konfirmasi unggah bukti pembayaran berhasil." />
            </Helmet>
            <div className="w-full bg-white flex flex-col">
                <main className="flex-grow flex items-center justify-center container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="text-center bg-gray-50 p-8 md:p-12 rounded-2xl shadow-lg max-w-lg w-full"
                    >
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Bukti Pembayaran Diterima!</h1>
                        <p className="text-gray-600 mt-3 mb-8">
                            Terima kasih! Kami sedang memverifikasi bukti pembayaran Anda. E-Tiket akan segera dikirimkan ke email Anda setelah verifikasi selesai.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" onClick={() => navigate('/')}>
                                <Home className="w-4 h-4 mr-2" />
                                Kembali ke Beranda
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => navigate('/tickets')}>
                                <Ticket className="w-4 h-4 mr-2" />
                                Lihat Tiket Saya
                            </Button>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default PaymentSuccessPage;
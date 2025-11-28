'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Home, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PaymentSuccessPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [countdown, setCountdown] = useState(5)

    const eventName = searchParams.get('event') || 'Event'
    const tierName = searchParams.get('tier') || 'Tiket'
    const price = searchParams.get('price') || 'Rp 0'

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    router.push('/')
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [router])

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-teal-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                            <CheckCircle className="w-24 h-24 text-teal-600 relative" strokeWidth={1.5} />
                        </div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                            Pembayaran Berhasil!
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Terima kasih atas pembelian Anda. Tiket akan segera dikirim ke email Anda.
                        </p>
                    </motion.div>

                    {/* Order Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-teal-50 rounded-2xl p-6 mb-8 text-left"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <Ticket className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 mb-1">Event</p>
                                <p className="font-semibold text-gray-900">{eventName}</p>
                            </div>
                        </div>
                        <div className="border-t border-teal-200 pt-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Paket</span>
                                <span className="font-medium text-gray-900">{tierName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Total</span>
                                <span className="font-bold text-teal-600 text-lg">{price}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Countdown */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mb-6"
                    >
                        <p className="text-sm text-gray-500">
                            Kembali ke beranda dalam <span className="font-bold text-teal-600">{countdown}</span> detik
                        </p>
                    </motion.div>

                    {/* Action Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <Button
                            onClick={() => router.push('/')}
                            className="w-full bg-teal-600 hover:bg-teal-800 text-white py-6 rounded-xl text-base font-semibold transition-colors"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Kembali ke Beranda
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

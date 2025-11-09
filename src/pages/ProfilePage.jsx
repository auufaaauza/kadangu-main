import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Settings, LogOut, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ProfilePage = () => {
  const userStats = [
    { label: 'Tiket Dibeli', value: '0', color: 'text-blue-600' },
    { label: 'Wishlist', value: '0', color: 'text-pink-600' },
    { label: 'Review', value: '0', color: 'text-green-600' },
  ];

  const menuItems = [
    { icon: Edit, label: 'Edit Profil', description: 'Ubah informasi pribadi Anda' },
    { icon: Settings, label: 'Pengaturan', description: 'Kelola preferensi akun' },
    { icon: Calendar, label: 'Riwayat Tiket', description: 'Lihat tiket yang pernah dibeli' },
    { icon: LogOut, label: 'Keluar', description: 'Logout dari akun Anda', danger: true },
  ];

  return (
    <>
      <Helmet>
        <title>Profil - Kadangu</title>
        <meta name="description" content="Kelola profil Anda dan pengaturan akun di Kadangu." />
      </Helmet>
      
      <div className="w-full bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center ring-4 ring-white shadow-lg">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <Button size="icon" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 shadow-md">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Sobat Kadangu</h2>
                    <div className="space-y-1 text-gray-600 mb-4">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">sobat@kadangu.com</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">+62 812-3456-7890</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Garut, Jawa Barat</span>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex gap-4 justify-center md:justify-start">
                      {userStats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Menu Items */}
            <div className="grid gap-3">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          item.danger ? 'bg-red-50' : 'bg-gray-50'
                        }`}>
                          <item.icon className={`w-6 h-6 ${
                            item.danger ? 'text-red-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${
                            item.danger ? 'text-red-600' : 'text-gray-900'
                          }`}>{item.label}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Info Banner */}
            <Card className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 border-none">
              <CardContent className="p-6 text-center">
                <p className="text-gray-700">
                  🚀 <span className="font-semibold">Fitur profil lengkap segera hadir!</span> Anda akan bisa mengelola riwayat pembelian, preferensi, dan notifikasi.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProfilePage;
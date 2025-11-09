import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { User, Settings, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProfilePage = () => {
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: "🚧 Fitur ini belum tersedia",
      description: "Anda bisa request fitur ini di prompt berikutnya! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Profil - Kadangu</title>
        <meta name="description" content="Kelola profil Anda dan pengaturan akun di Kadangu." />
      </Helmet>
      
      <div className="min-h-screen pb-20 bg-gray-50">
        <Navbar />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2a7163] to-[#9eb41b] rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Pengguna Kadangu</h2>
                  <p className="text-gray-600">pengguna@kadangu.id</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleAction}
                  className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-5 h-5 text-[#2a7163]" />
                  <span className="font-medium">Pengaturan Akun</span>
                </button>
                
                <button
                  onClick={handleAction}
                  className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-red-500">Keluar</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Tiket Saya</h3>
              <p className="text-gray-600 text-center py-8">Belum ada tiket yang dibeli</p>
            </div>
          </div>
        </motion.div>
        
        <BottomNav />
      </div>
    </>
  );
};

export default ProfilePage;
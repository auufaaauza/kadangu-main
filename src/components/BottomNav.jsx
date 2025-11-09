
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, User, Heart, Newspaper } from 'lucide-react'; // Mengganti Ticket dengan Newspaper
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleNavigation = (e, path) => {
    e.preventDefault();
    if (location.pathname !== path) {
      navigate(path);
    }
  }

  const navItems = [
    { name: 'Jelajah', icon: Compass, path: '/explore' },
    { name: 'Wishlist', icon: Heart, path: '/wishlist' },
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Berita', icon: Newspaper, path: '/news' }, // Mengganti 'Tiket Saya' menjadi 'Berita'
    { name: 'Profil', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 z-40">
      <div className="max-w-md mx-auto">
        <div className="bg-transparent backdrop-blur-xl rounded-3xl border border-slate-700/30 shadow-2xl shadow-black/20">
          <div className="flex items-end justify-around h-16 sm:h-[70px] px-2 sm:px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isHome = item.name === 'Home';

            return (
              <motion.button
                key={item.name}
                onClick={(e) => handleNavigation(e, item.path)}
                whileTap={{ scale: 0.90 }}
                className={`relative flex flex-col items-center pt-3 pb-1.5 space-y-0.5 flex-1 transition-all duration-300 ${
                  isHome ? '' : (isActive ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--accent))]')
                }`}
              >
                {isHome ? (
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="-mt-10 sm:-mt-11 w-14 h-14 sm:w-16 sm:h-16 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center shadow-lg shadow-[hsl(var(--primary))]/50 ring-4 ring-[hsl(var(--border))]"
                  >
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </motion.div>
                ) : (
                  <>
                    <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
                    <span className={`text-[10px] sm:text-xs font-semibold ${isActive ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`}>{item.name}</span>
                  </>
                )}
                 {isActive && !isHome && (
                  <motion.div
                    layoutId="activeTabBottom"
                    className="absolute bottom-0 h-1 w-3/4 bg-[hsl(var(--primary))] rounded-t-full shadow-lg shadow-[hsl(var(--primary))]/50"
                    initial={false}
                    animate={{ y: 0 }}
                  />
                )}
              </motion.button>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;

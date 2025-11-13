import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Safe area untuk device dengan notch */}
      <div className="safe-top" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <Navbar />
      </div>
      
      {/* Main content dengan proper spacing */}
      <main className="relative min-h-screen">
        {/* Top spacing untuk navbar */}
        <div className="h-20 sm:h-24" />
        
        {/* Content area */}
        <div className="pb-24 sm:pb-28 px-0">
          <Outlet />
        </div>
        
        {/* Bottom spacing untuk safe area */}
        <div className="h-4" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default AppLayout;

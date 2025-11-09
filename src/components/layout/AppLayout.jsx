import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pb-20 sm:pb-24 pt-2 sm:pt-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;

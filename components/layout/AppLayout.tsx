'use client'
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 relative">

      {/* NAVBAR */}
      <div className="pt-3 md:pt-4 safe-top">
        <Navbar />
      </div>

      <main className="relative min-h-screen">

        {/* CONTENT */}
        <div className="pb-24 sm:pb-28 px-0">
          {children}
        </div>

        {/* SAFE BOTTOM */}
        <div
          className="h-4"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        />
      </main>

      {/* BOTTOM NAV */}
      <BottomNav />
    </div>
  );
};

export default AppLayout;

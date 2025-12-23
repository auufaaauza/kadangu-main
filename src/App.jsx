import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

// Layout
import AppLayout from "@/components/layout/AppLayout";
import { AuthProvider } from "@/contexts/AuthContext";

// --- Pages: Core ---
import HomePage from "@/pages/HomePage";
import NewsPage from "@/pages/NewsPage";
import ShowsPage from "@/pages/ShowsPage";
import CategoryPage from "@/pages/CategoryPage";
import TicketBookingPage from "@/pages/TicketBookingPage";
import TalentBookingPage from "@/pages/TalentBookingPage";
import BrowsePage from "@/pages/BrowsePage";
import TalentDetailPage from "@/pages/TalentDetailPage";
import ShowDetailPage from "@/pages/ShowDetailPage";
import PaymentSuccessPage from "@/pages/PaymentSuccessPage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes - No Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Layout wrapper */}
          <Route element={<AppLayout />}>
            {/* Homepage */}
            <Route path="/" element={<HomePage />} />

            {/* Browse/Explore - Unified page with filters */}
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/explore" element={<BrowsePage />} />

            {/* News */}
            <Route path="/news" element={<NewsPage />} />

            {/* Shows/Pertunjukan */}
            <Route path="/shows" element={<ShowsPage />} />
            <Route path="/shows/:showId/book" element={<TicketBookingPage />} />

            {/* Category Pages - Talents */}
            <Route path="/music" element={<CategoryPage />} />
            <Route path="/dance" element={<CategoryPage />} />
            <Route path="/theater" element={<CategoryPage />} />
            <Route path="/art" element={<CategoryPage />} />
            <Route path="/literature" element={<CategoryPage />} />
            <Route path="/film" element={<CategoryPage />} />
            <Route path="/culture" element={<CategoryPage />} />
            <Route path="/workshop" element={<CategoryPage />} />

            {/* Detail Pages */}
            <Route path="/talent/:talentId" element={<TalentDetailPage />} />
            <Route path="/shows/:showId" element={<ShowDetailPage />} />

            {/* Booking Pages */}
            <Route
              path="/talent/:talentId/book"
              element={<TalentBookingPage />}
            />
            <Route path="/shows/:showId/book" element={<TicketBookingPage />} />

            {/* Payment & Profile */}
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>

        {/* Toaster for alerts */}
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

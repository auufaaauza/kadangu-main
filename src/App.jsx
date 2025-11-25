import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

// Layout
import AppLayout from "@/components/layout/AppLayout";

// --- Pages: Core ---
import HomePage from "@/pages/HomePage";
import ExplorePage from "@/pages/ExplorePage";
import ProfilePage from "@/pages/ProfilePage";
import WishlistPage from "@/pages/WishlistPage";
import PaymentSuccessPage from "@/pages/PaymentSuccessPage";

// --- Shows ---
import { ShowPage } from "@/pages/Show/ShowPage";
import ShowDetailPage from "@/pages/Show/detail/ShowDetailPage";

// --- Dance ---
import DancePage from "@/pages/Dance/DancePage";
import DanceDetailPage from "@/pages/Dance/detail/DanceDetailPage";

// --- News ---
import NewsPage from "@/pages/News/NewsPage";
import NewsDetailPage from "@/pages/News/detail/NewsDetailPage";

// --- Music ---
import { MusicPage } from "@/pages/Music/MusicPage";
import { BookingPage } from "@/pages/Music/BookingPage";

// --- Theater ---
import TheaterPage from "@/pages/Theater/TheaterPage";
import TheaterDetailPage from "@/pages/Theater/detail/TheaterDetailPage";

// --- Art ---
import { ArtPage } from "@/pages/Art/ArtPage";

// --- Literature ---
import { LiteraturePage } from "@/pages/Literature/LiteraturePage";

// --- Film ---
import { FilmPage } from "@/pages/Film/FilmPage";

// --- Culture ---
import { CulturePage } from "@/pages/Culture/CulturePage";

// --- Workshop ---
import { WorkshopPage } from "@/pages/Workshop/WorkshopPage";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<AppLayout />}>

          {/* --- Core Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />

          {/* --- Shows --- */}
          <Route path="/shows" element={<ShowPage />} />
          <Route path="/shows/detail/:id" element={<ShowDetailPage />} />

          {/* --- Dance --- */}
          <Route path="/dance" element={<DancePage />} />
          <Route path="/dance/detail/:id" element={<DanceDetailPage />} />

          {/* --- News --- */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/detail/:id" element={<NewsDetailPage />} />

          {/* --- Music --- */}
          <Route path="/music" element={<MusicPage />} />
          <Route path="/music/booking/:id" element={<BookingPage />} />

          {/* --- Theater --- */}
          <Route path="/theater" element={<TheaterPage />} />
          <Route path="/theater/detail/:id" element={<TheaterDetailPage />} />

          {/* --- Art --- */}
          <Route path="/art" element={<ArtPage />} />

          {/* --- Literature --- */}
          <Route path="/literature" element={<LiteraturePage />} />

          {/* --- Film --- */}
          <Route path="/film" element={<FilmPage />} />

          {/* --- Culture --- */}
          <Route path="/culture" element={<CulturePage />} />

          {/* --- Workshop --- */}
          <Route path="/workshop" element={<WorkshopPage />} />

          {/* Dummy route */}
          <Route path="/tickets" element={<ExplorePage />} />

        </Route>
      </Routes>

      {/* Toaster for alerts */}
      <Toaster />
    </Router>
  );
}

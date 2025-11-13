
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/components/layout/AppLayout';
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import ProfilePage from '@/pages/ProfilePage';
import WishlistPage from '@/pages/WishlistPage';
import ShowDetailPage from '@/pages/ShowDetailPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import { ShowsPageNew } from '@/pages/ShowsPageNew';
import { DancePageNew } from '@/pages/DancePageNew';
import { NewsPageNew } from '@/pages/NewsPageNew';
import { IndexPage } from "@/pages/music/IndexPage";
import { BookingPage } from "@/pages/music/BookingPage";
import { JoinTalentPage } from "@/pages/music/JoinTalentPage";
import { NotFoundPage } from "@/pages/music/NotFoundPage";
import { TheaterPage } from "@/pages/TheaterPage";
import { ArtPageNew } from "@/pages/ArtPageNew";
import { LiteraturePage } from "@/pages/LiteraturePage";
import { FilmPage } from "@/pages/FilmPage";
import { CulturePage } from "@/pages/CulturePage";
import { WorkshopPage } from "@/pages/WorkshopPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/shows" element={<ShowsPageNew />} />
          <Route path="/shows/:id" element={<ShowDetailPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/dance" element={<DancePageNew />} />
          <Route path="/news" element={<NewsPageNew />} />
          <Route path="/music" element={<IndexPage />} />
          <Route path="/music/booking/:id" element={<BookingPage />} />
          <Route path="/music/join-talent" element={<JoinTalentPage />} />
          <Route path="/theater" element={<TheaterPage />} />
          <Route path="/art" element={<ArtPageNew />} />
          <Route path="/literature" element={<LiteraturePage />} />
          <Route path="/film" element={<FilmPage />} />
          <Route path="/culture" element={<CulturePage />} />
          <Route path="/workshop" element={<WorkshopPage />} />
          {/* A dummy route for tickets to show the toast */}
          <Route path="/tickets" element={<ExplorePage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

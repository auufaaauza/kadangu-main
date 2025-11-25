
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/components/layout/AppLayout';
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import ProfilePage from '@/pages/ProfilePage';
import WishlistPage from '@/pages/WishlistPage';
import ShowDetailPage from '@/pages/show/detail/ShowDetailPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import { ShowPage } from '@/pages/Show/ShowPage';
import DancePage from '@/pages/Dance/DancePage';
import DanceDetailPage from '@/pages/Dance/detail/DanceDetailPage';
import NewsPage  from '@/pages/News/NewsPage';
import NewsDetailPage from "@/pages/News/detail/NewsDetailPage";
import { MusicPage } from "@/pages/Music/MusicPage";
import { BookingPage } from "@/pages/Music/BookingPage";
import TheaterPage  from "@/pages/Theater/TheaterPage";
import TheaterDetailPage from "@/pages/Theater/detail/TheaterDetailPage";
import { ArtPage } from "@/pages/Art/ArtPage";
import { LiteraturePage } from "@/pages/Literature/LiteraturePage";
import { FilmPage } from "@/pages/Film/FilmPage";
import { CulturePage } from "@/pages/Culture/CulturePage";
import { WorkshopPage } from "@/pages/workshop/WorkshopPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/shows" element={<ShowPage />} />
          <Route path="/shows/detail/:id" element={<ShowDetailPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/dance" element={<DancePage />} />
          <Route path="/dance/detail/:id" element={<DanceDetailPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/detail/:id" element={<NewsDetailPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/music/booking/:id" element={<BookingPage />} />
          <Route path="/theater" element={<TheaterPage />} />
          <Route path="/theater/detail/:id" element={<TheaterDetailPage/>}/>
          <Route path="/art" element={<ArtPage />} />
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

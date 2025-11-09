
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/components/layout/AppLayout';
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import ProfilePage from '@/pages/ProfilePage';
import WishlistPage from '@/pages/WishlistPage';
import ShowsPage from '@/pages/ShowsPage';
import ShowDetailPage from '@/pages/ShowDetailPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import DancePage from '@/pages/DancePage';
import NewsPage from '@/pages/NewsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/shows" element={<ShowsPage />} />
          <Route path="/shows/:id" element={<ShowDetailPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/dance" element={<DancePage />} />
          <Route path="/news" element={<NewsPage />} />
          {/* A dummy route for tickets to show the toast */}
          <Route path="/tickets" element={<ExplorePage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

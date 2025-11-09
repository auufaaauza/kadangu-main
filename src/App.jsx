
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import ProfilePage from '@/pages/ProfilePage';
import WishlistPage from '@/pages/WishlistPage';
import ShowsPage from '@/pages/ShowsPage';
import ShowDetailPage from '@/pages/ShowDetailPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import DancePage from '@/pages/DancePage';
import NewsPage from '@/pages/NewsPage'; // Import halaman NewsPage

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/shows" element={<ShowsPage />} />
          <Route path="/shows/:id" element={<ShowDetailPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/dance" element={<DancePage />} />
          <Route path="/news" element={<NewsPage />} /> {/* Tambahkan route baru untuk NewsPage */}
          {/* A dummy route for tickets to show the toast */}
          <Route path="/tickets" element={<ExplorePage />} /> 
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;

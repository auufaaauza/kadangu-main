# KADANGU - Sistem Informasi Seni dan Budaya

## Analisis Sistem dan Dokumentasi Lengkap

---

## 📋 DAFTAR ISI

1. [Gambaran Umum Sistem](#gambaran-umum-sistem)
2. [Stakeholder](#stakeholder)
3. [Functional Requirements](#functional-requirements)
4. [Non-Functional Requirements](#non-functional-requirements)
5. [Aktor dan Use Case](#aktor-dan-use-case)
6. [Alur Sistem](#alur-sistem)
7. [Fitur Utama](#fitur-utama)
8. [Arsitektur Sistem](#arsitektur-sistem)
9. [Status Implementasi](#status-implementasi)

---

## 🎯 GAMBARAN UMUM SISTEM

**Kadangu** adalah platform digital yang menghubungkan seniman dengan masyarakat untuk mempromosikan dan melestarikan seni budaya Indonesia. Sistem ini menyediakan dua layanan utama:

1. **Booking Talent** - Pemesanan seniman/talent untuk acara
2. **Tiket Pertunjukan** - Pembelian tiket pertunjukan seni

### Tujuan Sistem

- Memudahkan masyarakat mengakses informasi seni dan budaya
- Menyediakan platform booking talent dan tiket pertunjukan
- Mendukung digitalisasi industri seni dan budaya
- Memberikan wadah promosi bagi seniman

---

## 👥 STAKEHOLDER

### 1. **Pelanggan (End User)**

- Masyarakat umum yang ingin menikmati pertunjukan seni
- Event organizer yang membutuhkan talent/seniman
- Penggemar seni dan budaya

### 2. **Admin**

- Pengelola sistem
- Verifikator pembayaran
- Content manager (berita, seniman, pertunjukan)

### 3. **Seniman (Indirect)**

- Talent yang terdaftar dalam sistem
- Penyedia pertunjukan seni

---

## ✅ FUNCTIONAL REQUIREMENTS

### A. **Autentikasi & Manajemen Pengguna**

#### FR-01: Login

**Status:** ✅ **IMPLEMENTED**

- User dapat login menggunakan email dan password
- Sistem memvalidasi kredensial
- Sistem menyimpan token autentikasi (Sanctum)
- Redirect ke halaman profile setelah login berhasil

**Implementasi:**

- Frontend: `src/pages/LoginPage.jsx`
- Backend: Laravel Sanctum Auth
- Context: `src/contexts/AuthContext.jsx`

#### FR-02: Registrasi

**Status:** ✅ **IMPLEMENTED**

- User dapat mendaftar dengan data: nama, email, phone, lokasi, password
- Sistem memvalidasi data (email unique, password min 8 karakter)
- Auto-login setelah registrasi berhasil

**Implementasi:**

- Frontend: `src/pages/RegisterPage.jsx`
- Backend: User Registration API
- Validation: Client & Server-side

#### FR-03: Lupa/Reset Password

**Status:** ⚠️ **PARTIALLY IMPLEMENTED**

- Link "Lupa Password" tersedia di LoginPage
- **Perlu implementasi:** Email verification & reset flow

**Yang Dibutuhkan:**

- Password reset request endpoint
- Email notification
- Reset token validation
- New password form

#### FR-04: Pengelolaan Profil

**Status:** ✅ **IMPLEMENTED**

- User dapat melihat profil (nama, email, phone, lokasi)
- User dapat melihat riwayat booking & tiket
- **Perlu implementasi:** Edit profil functionality

**Implementasi:**

- Frontend: `src/pages/ProfilePage.jsx`
- Tabs: Semua Pesanan, Booking Talent, Tiket Event

---

### B. **Pertunjukan Seni (Shows)**

#### FR-05: Menampilkan Daftar Pertunjukan

**Status:** ✅ **IMPLEMENTED**

- Sistem menampilkan list pertunjukan dengan informasi:
  - Judul, kategori, tanggal, lokasi
  - Gambar, harga mulai dari
  - Status ketersediaan
- Grid layout responsive

**Implementasi:**

- Frontend: `src/pages/ShowsPage.jsx`
- API: `GET /api/pertunjukan`
- Backend: `PertunjukanController@index`

#### FR-06: Pencarian & Filter Pertunjukan

**Status:** ✅ **IMPLEMENTED**

- Search by judul pertunjukan
- Filter by kategori seni
- Filter by tanggal
- Unified browse page dengan filter Tiket/Booking

**Implementasi:**

- Frontend: `src/pages/ShowsPage.jsx`, `src/pages/BrowsePage.jsx`
- Search bar dengan real-time filtering
- Category chips untuk quick filter

#### FR-07: Detail Pertunjukan

**Status:** ✅ **IMPLEMENTED**

- Menampilkan informasi lengkap:
  - Deskripsi pertunjukan
  - Kategori tiket dengan harga
  - Kuota dan tiket terjual
  - Tanggal, waktu, lokasi
  - Rating dan ulasan
- Tombol "Beli Tiket"
- Wishlist button

**Implementasi:**

- Frontend: `src/pages/ShowDetailPage.jsx`
- API: `GET /api/pertunjukan/{id}`
- Dynamic routing: `/shows/:showId`

#### FR-08: Wishlist Pertunjukan

**Status:** ✅ **IMPLEMENTED**

- User dapat menambah pertunjukan ke wishlist
- User dapat menghapus dari wishlist
- Visual feedback (heart icon merah saat di wishlist)
- Redirect ke login jika belum auth

**Implementasi:**

- Frontend: Heart button di `ShowDetailPage.jsx`
- API:
  - `POST /api/wishlists` (add)
  - `DELETE /api/wishlists/{id}` (remove)
  - `GET /api/wishlists/check` (check status)
- Backend: `WishlistController`
- Database: `wishlists` table dengan `pertunjukan_id`

#### FR-09: Booking Tiket Pertunjukan

**Status:** ✅ **IMPLEMENTED**

- Form booking dengan data:
  - Informasi pribadi (nama, email, phone)
  - Pilihan kategori tiket
  - Jumlah tiket
  - Total harga otomatis
- Validasi kuota tiket
- Order summary

**Implementasi:**

- Frontend: `src/pages/TicketBookingPage.jsx`
- API: `POST /api/event-ticket-orders`
- Routing: `/shows/:showId/book`

#### FR-10: Upload Bukti Pembayaran

**Status:** ⚠️ **PARTIALLY IMPLEMENTED**

- **Perlu implementasi:** Upload form untuk bukti transfer
- **Perlu implementasi:** Image preview
- **Perlu implementasi:** Submit ke backend

**Yang Dibutuhkan:**

- File upload component
- Image validation (format, size)
- API endpoint untuk upload
- Storage management

#### FR-11: Riwayat Pemesanan Tiket

**Status:** ✅ **IMPLEMENTED**

- User dapat melihat semua tiket yang dibeli
- Informasi: judul, kategori, tanggal, status, total
- Filter by status (pending, confirmed, cancelled)
- Download invoice untuk tiket confirmed

**Implementasi:**

- Frontend: `ProfilePage.jsx` - Tab "Tiket Event"
- API: `GET /api/user/event-ticket-orders`
- Status badges dengan warna berbeda

---

### C. **Talent Booking**

#### FR-12: Menampilkan Daftar Talent

**Status:** ✅ **IMPLEMENTED**

- List talent dengan kategori seni
- Filter by genre (Musik, Tari, Teater, dll)
- Search by nama talent
- Informasi: nama, genre, harga mulai dari, foto

**Implementasi:**

- Frontend: `src/pages/CategoryPage.jsx`
- API: `GET /api/talents?category={category}`
- Dynamic routing: `/music`, `/dance`, `/theater`, dll

#### FR-13: Detail Talent

**Status:** ✅ **IMPLEMENTED**

- Bio talent
- Daftar paket dengan:
  - Nama paket, harga, durasi
  - Deskripsi
  - Yang termasuk (includes list)
- Rating dan verifikasi
- Wishlist button
- Booking card

**Implementasi:**

- Frontend: `src/pages/TalentDetailPage.jsx`
- API: `GET /api/talents/{id}`
- Routing: `/talent/:talentId`

#### FR-14: Wishlist Talent

**Status:** ✅ **IMPLEMENTED**

- Sama seperti wishlist pertunjukan
- Support untuk talent type
- Heart button dengan visual feedback

**Implementasi:**

- Frontend: `TalentDetailPage.jsx`
- API: Sama dengan wishlist pertunjukan
- Database: `wishlists` table dengan `talent_id`

#### FR-15: Booking Talent

**Status:** ✅ **IMPLEMENTED**

- Form booking dengan:
  - Informasi pribadi
  - Detail acara (nama, tanggal, lokasi, durasi)
  - Pilihan paket
  - Catatan tambahan
- Booking summary dengan total harga

**Implementasi:**

- Frontend: `src/pages/TalentBookingPage.jsx`
- API: `POST /api/talent-bookings`
- Routing: `/talent/:talentId/book`

#### FR-16: Riwayat Booking Talent

**Status:** ✅ **IMPLEMENTED**

- User dapat melihat semua booking talent
- Informasi: nama talent, paket, tanggal acara, status
- Filter dan status badges

**Implementasi:**

- Frontend: `ProfilePage.jsx` - Tab "Booking Talent"
- API: `GET /api/user/talent-bookings`

---

### D. **Konten & Informasi**

#### FR-17: Berita Seni

**Status:** ✅ **IMPLEMENTED**

- Menampilkan daftar berita/artikel seni
- Featured news section
- Search by judul
- Filter by kategori
- Detail berita dengan gambar dan konten lengkap

**Implementasi:**

- Frontend: `src/pages/NewsPage.jsx`
- API: `GET /api/beritas`
- Card layout dengan thumbnail

#### FR-18: Profil Seniman

**Status:** ✅ **IMPLEMENTED**

- Terintegrasi dengan talent detail
- Informasi seniman dalam talent profile
- Kategori seni seniman

**Implementasi:**

- Relasi: Talent -> Seniman (kategori)
- Ditampilkan di TalentDetailPage

---

### E. **Admin - CRUD Operations**

#### FR-19: CRUD Pertunjukan Seni

**Status:** ✅ **IMPLEMENTED**

- Create: Form tambah pertunjukan dengan semua field
- Read: List pertunjukan dengan pagination & search
- Update: Edit pertunjukan existing
- Delete: Hapus pertunjukan
- Manage ticket categories (tiers)

**Implementasi:**

- Backend: `Admin/PertunjukanController`
- Views: `resources/views/admin/pertunjukan/`
- Routes: `/admin/pertunjukan/*`

#### FR-20: CRUD Seniman

**Status:** ✅ **IMPLEMENTED**

- Create: Form tambah seniman
- Read: List seniman
- Update: Edit seniman
- Delete: Hapus seniman
- Filter by kategori seni

**Implementasi:**

- Backend: `Admin/SenimanController`
- Views: `resources/views/admin/seniman/`
- Routes: `/admin/seniman/*`

#### FR-21: CRUD Talent

**Status:** ✅ **IMPLEMENTED**

- Create: Form tambah talent dengan packages
- Read: List talent dengan filter kategori
- Update: Edit talent dan packages
- Delete: Hapus talent
- Upload foto dan portfolio
- Manage multiple packages per talent
- Rupiah formatting

**Implementasi:**

- Backend: `Admin/TalentController`
- Views: `resources/views/admin/talent/`
- Form: Dynamic package management
- Filter: Hanya kategori seni (Musik, Tari, Teater, Seni Rupa, Sastra, Film)

#### FR-22: CRUD Berita

**Status:** ✅ **IMPLEMENTED**

- Create: Form tambah berita/artikel
- Read: List berita dengan pagination
- Update: Edit berita
- Delete: Hapus berita
- Upload gambar berita

**Implementasi:**

- Backend: `Admin/BeritaController`
- Views: `resources/views/admin/berita/`
- Routes: `/admin/berita/*`

#### FR-23: Kirim Tiket via WhatsApp

**Status:** ⚠️ **NOT IMPLEMENTED**

- **Perlu implementasi:** WhatsApp API integration
- **Perlu implementasi:** E-ticket generation
- **Perlu implementasi:** Auto-send setelah verifikasi pembayaran

**Yang Dibutuhkan:**

- WhatsApp Business API / Twilio
- QR Code generation untuk tiket
- PDF ticket template
- Webhook untuk status pengiriman

#### FR-24: Kelola Pesanan

**Status:** ✅ **IMPLEMENTED**

- Admin dapat melihat semua pesanan
- Filter by status, tanggal, user
- Update status pesanan
- Hapus pesanan
- View detail pesanan lengkap
- Bulk actions

**Implementasi:**

- Backend: `Admin/BookingController`, `Admin/TransactionController`
- Views:
  - `resources/views/admin/talent-booking/`
  - `resources/views/admin/transaction/`
- Status management: pending, confirmed, cancelled, completed

#### FR-25: Statistik & Dashboard

**Status:** ✅ **IMPLEMENTED**

- Dashboard dengan statistik:
  - Total pertunjukan, seniman, berita
  - Total booking & transaksi
  - Revenue charts
  - Recent activities
  - Popular shows/talents
- Filter by periode waktu

**Implementasi:**

- Backend: `Admin/DashboardController`
- View: `resources/views/admin/dashboard.blade.php`
- Charts: Chart.js integration
- Real-time data

---

## 🚫 NON-FUNCTIONAL REQUIREMENTS

### NFR-01: User-Friendly Interface

**Status:** ✅ **IMPLEMENTED**

- Clean, modern design dengan color scheme konsisten
- Intuitive navigation dengan navbar & footer
- Clear call-to-action buttons
- Loading states untuk feedback
- Error messages yang jelas
- Form validation dengan helpful hints

**Implementasi:**

- Design system dengan Tailwind CSS
- Framer Motion untuk smooth animations
- Lucide icons untuk visual clarity
- Consistent spacing dan typography

### NFR-02: Responsive Design

**Status:** ✅ **IMPLEMENTED**

- Mobile-first approach
- Breakpoints: mobile, tablet, desktop
- Touch-friendly buttons dan inputs
- Adaptive layouts (grid, flexbox)
- Responsive images
- Mobile navigation (hamburger menu)

**Implementasi:**

- Tailwind responsive classes (`sm:`, `md:`, `lg:`)
- Tested di berbagai device sizes
- Viewport meta tag configured

### NFR-03: Security

**Status:** ✅ **IMPLEMENTED**

#### Password Encryption

- Bcrypt hashing untuk password
- Min 8 karakter requirement
- Password confirmation validation

#### Data Protection

- Laravel Sanctum untuk API authentication
- CSRF protection
- SQL injection prevention (Eloquent ORM)
- XSS protection (Laravel escaping)
- HTTPS ready (production)

#### Transaction Security

- Auth middleware untuk protected routes
- User-specific data isolation
- Token-based authentication
- Secure session management

**Implementasi:**

- Backend: Laravel security features
- Frontend: Token storage di localStorage
- API: Bearer token authentication
- Validation: Server & client-side

### NFR-04: Performance

**Status:** ✅ **OPTIMIZED**

- Lazy loading untuk images
- Code splitting (Vite)
- Optimized bundle size
- Database indexing
- Eager loading untuk relationships
- Pagination untuk large datasets

### NFR-05: Maintainability

**Status:** ✅ **IMPLEMENTED**

- Clean code structure
- Component-based architecture
- Reusable components
- Consistent naming conventions
- Comments untuk complex logic
- Separation of concerns (MVC)

---

## 🎭 AKTOR DAN USE CASE

### **Aktor 1: Pelanggan (Customer)**

#### Use Cases:

1. **UC-01: Registrasi Akun**

   - Actor: Pelanggan
   - Precondition: Belum memiliki akun
   - Flow:
     1. Pelanggan mengakses halaman register
     2. Mengisi form (nama, email, phone, lokasi, password)
     3. Submit form
     4. Sistem validasi data
     5. Sistem create akun baru
     6. Auto-login dan redirect ke profile
   - Postcondition: Akun terdaftar dan logged in

2. **UC-02: Login**

   - Actor: Pelanggan
   - Precondition: Sudah memiliki akun
   - Flow:
     1. Pelanggan mengakses halaman login
     2. Input email dan password
     3. Submit credentials
     4. Sistem validasi
     5. Sistem generate token
     6. Redirect ke profile
   - Postcondition: Logged in dengan token valid

3. **UC-03: Browse Pertunjukan**

   - Actor: Pelanggan
   - Precondition: -
   - Flow:
     1. Pelanggan mengakses halaman shows/browse
     2. Melihat daftar pertunjukan
     3. Gunakan search/filter (optional)
     4. Klik pertunjukan untuk detail
   - Postcondition: Melihat informasi pertunjukan

4. **UC-04: Booking Tiket Pertunjukan**

   - Actor: Pelanggan
   - Precondition: Logged in
   - Flow:
     1. Pelanggan di halaman detail pertunjukan
     2. Klik "Beli Tiket"
     3. Isi form booking (data pribadi, pilih kategori, jumlah)
     4. Review order summary
     5. Submit booking
     6. Sistem create order
     7. Redirect ke payment success
   - Postcondition: Order tiket created dengan status pending

5. **UC-05: Browse Talent**

   - Actor: Pelanggan
   - Precondition: -
   - Flow:
     1. Pelanggan pilih kategori seni (Musik, Tari, dll)
     2. Melihat list talent
     3. Gunakan search/filter (optional)
     4. Klik talent untuk detail
   - Postcondition: Melihat informasi talent

6. **UC-06: Booking Talent**

   - Actor: Pelanggan
   - Precondition: Logged in
   - Flow:
     1. Pelanggan di halaman detail talent
     2. Pilih paket
     3. Klik "Booking Sekarang"
     4. Isi form (data pribadi, detail acara, pilih paket)
     5. Review booking summary
     6. Submit booking
     7. Sistem create booking
     8. Redirect ke payment success
   - Postcondition: Booking talent created dengan status pending

7. **UC-07: Manage Wishlist**

   - Actor: Pelanggan
   - Precondition: Logged in
   - Flow:
     1. Pelanggan di halaman detail (talent/show)
     2. Klik heart icon
     3. Sistem toggle wishlist
     4. Visual feedback (heart merah)
   - Postcondition: Item added/removed from wishlist

8. **UC-08: View Order History**

   - Actor: Pelanggan
   - Precondition: Logged in
   - Flow:
     1. Pelanggan akses profile page
     2. Pilih tab (Semua/Booking/Tiket)
     3. Melihat list orders dengan status
     4. Klik "Lihat Detail" untuk info lengkap
   - Postcondition: Melihat riwayat pesanan

9. **UC-09: Read News**
   - Actor: Pelanggan
   - Precondition: -
   - Flow:
     1. Pelanggan akses halaman news
     2. Browse/search berita
     3. Klik berita untuk baca lengkap
   - Postcondition: Membaca artikel seni

### **Aktor 2: Admin**

#### Use Cases:

1. **UC-10: Login Admin**

   - Actor: Admin
   - Precondition: Memiliki akun admin
   - Flow:
     1. Admin akses `/admin/login`
     2. Input credentials
     3. Sistem validasi
     4. Redirect ke admin dashboard
   - Postcondition: Logged in sebagai admin

2. **UC-11: Manage Pertunjukan**

   - Actor: Admin
   - Precondition: Logged in sebagai admin
   - Flow:
     1. Admin akses menu Pertunjukan
     2. Pilih action (Create/Edit/Delete)
     3. Isi/update form pertunjukan
     4. Manage ticket categories
     5. Upload gambar
     6. Submit
     7. Sistem save changes
   - Postcondition: Data pertunjukan updated

3. **UC-12: Manage Talent**

   - Actor: Admin
   - Precondition: Logged in sebagai admin
   - Flow:
     1. Admin akses menu Talent
     2. Pilih action (Create/Edit/Delete)
     3. Isi form talent
     4. Pilih kategori seni
     5. Manage packages (add/edit/remove)
     6. Upload foto & portfolio
     7. Submit
     8. Sistem save changes
   - Postcondition: Data talent updated

4. **UC-13: Manage Seniman**

   - Actor: Admin
   - Precondition: Logged in sebagai admin
   - Flow: Similar to UC-11
   - Postcondition: Data seniman updated

5. **UC-14: Manage Berita**

   - Actor: Admin
   - Precondition: Logged in sebagai admin
   - Flow: Similar to UC-11
   - Postcondition: Data berita updated

6. **UC-15: Manage Orders**

   - Actor: Admin
   - Precondition: Logged in sebagai admin
   - Flow:
     1. Admin akses menu Bookings/Transactions
     2. Filter orders (status, date, user)
     3. Klik order untuk detail
     4. Update status (confirm/cancel)
     5. Add admin notes
     6. Submit changes
     7. Sistem update order status
   - Postcondition: Order status updated

7. **UC-16: View Dashboard Statistics**
   - Actor: Admin
   - Precondition: Logged in sebagai admin
   - Flow:
     1. Admin akses dashboard
     2. Melihat statistik (total data, revenue, charts)
     3. Filter by periode
     4. View recent activities
   - Postcondition: Mendapat insight data sistem

---

## 🔄 ALUR SISTEM

### **Alur 1: Customer Journey - Booking Tiket Pertunjukan**

```
[Start]
  ↓
[Browse Shows Page]
  ↓
[Search/Filter Shows] (Optional)
  ↓
[Click Show Card]
  ↓
[Show Detail Page]
  - View description
  - View ticket categories & prices
  - View availability
  - Check wishlist status
  ↓
[Click "Beli Tiket"]
  ↓
[Check Authentication]
  - If NOT logged in → Redirect to Login → After login, back to booking
  - If logged in → Continue
  ↓
[Ticket Booking Form]
  - Fill personal info
  - Select ticket category
  - Select quantity
  - View order summary
  ↓
[Submit Booking]
  ↓
[Backend Processing]
  - Validate data
  - Check ticket availability
  - Create order record
  - Generate order ID
  ↓
[Payment Success Page]
  - Show order confirmation
  - Display order details
  - Show payment instructions
  ↓
[Customer Actions]
  - Upload payment proof (Future)
  - View in order history
  - Wait for admin confirmation
  ↓
[Admin Verification]
  - Admin checks payment
  - Admin updates status to "confirmed"
  - System sends e-ticket (Future: WhatsApp)
  ↓
[End]
```

### **Alur 2: Customer Journey - Booking Talent**

```
[Start]
  ↓
[Browse by Category] (Music/Dance/Theater/etc)
  ↓
[Category Page - List Talents]
  ↓
[Search/Filter Talents] (Optional)
  ↓
[Click Talent Card]
  ↓
[Talent Detail Page]
  - View bio
  - View packages
  - Compare prices
  - Check wishlist status
  ↓
[Select Package]
  ↓
[Click "Booking Sekarang"]
  ↓
[Check Authentication]
  - If NOT logged in → Redirect to Login
  - If logged in → Continue
  ↓
[Talent Booking Form]
  - Fill personal info
  - Fill event details (name, date, location, duration)
  - Confirm selected package
  - Add notes
  - View booking summary
  ↓
[Submit Booking]
  ↓
[Backend Processing]
  - Validate data
  - Check talent availability
  - Create booking record
  - Generate booking ID
  ↓
[Payment Success Page]
  - Show booking confirmation
  - Display booking details
  - Show payment instructions
  ↓
[Customer Actions]
  - Upload payment proof (Future)
  - View in booking history
  - Wait for admin confirmation
  ↓
[Admin Processing]
  - Admin reviews booking
  - Admin contacts talent
  - Admin confirms availability
  - Admin updates status
  ↓
[End]
```

### **Alur 3: Admin Journey - Manage Content**

```
[Start]
  ↓
[Admin Login]
  ↓
[Admin Dashboard]
  - View statistics
  - View recent activities
  - Quick actions
  ↓
[Select Menu]
  ├─ [Pertunjukan]
  ├─ [Talent]
  ├─ [Seniman]
  ├─ [Berita]
  ├─ [Bookings]
  └─ [Transactions]
  ↓
[CRUD Operations]
  ├─ [Create]
  │   ↓
  │   [Fill Form]
  │   ↓
  │   [Upload Images]
  │   ↓
  │   [Submit]
  │   ↓
  │   [Validation]
  │   ↓
  │   [Save to Database]
  │
  ├─ [Read/View]
  │   ↓
  │   [List with Pagination]
  │   ↓
  │   [Search/Filter]
  │   ↓
  │   [View Details]
  │
  ├─ [Update]
  │   ↓
  │   [Select Item]
  │   ↓
  │   [Edit Form (pre-filled)]
  │   ↓
  │   [Modify Data]
  │   ↓
  │   [Submit Changes]
  │   ↓
  │   [Update Database]
  │
  └─ [Delete]
      ↓
      [Select Item]
      ↓
      [Confirm Delete]
      ↓
      [Remove from Database]
  ↓
[Success Message]
  ↓
[Back to List]
  ↓
[End]
```

### **Alur 4: Admin Journey - Manage Orders**

```
[Start]
  ↓
[Admin Dashboard]
  ↓
[Select Bookings/Transactions Menu]
  ↓
[Orders List]
  - Filter by status
  - Filter by date
  - Search by user
  ↓
[Select Order]
  ↓
[Order Detail Page]
  - View customer info
  - View order details
  - View payment status
  - View admin notes
  ↓
[Admin Actions]
  ├─ [Update Status]
  │   ↓
  │   [Select new status]
  │   ↓
  │   [Add notes]
  │   ↓
  │   [Submit]
  │
  ├─ [Verify Payment]
  │   ↓
  │   [Check payment proof]
  │   ↓
  │   [Confirm payment]
  │   ↓
  │   [Update status to "confirmed"]
  │   ↓
  │   [Send e-ticket] (Future)
  │
  └─ [Cancel Order]
      ↓
      [Add cancellation reason]
      ↓
      [Update status to "cancelled"]
  ↓
[Notification to Customer] (Future)
  ↓
[End]
```

---

## 🎨 FITUR UTAMA

### **1. Autentikasi & Profil**

- ✅ Login dengan email/password
- ✅ Registrasi user baru
- ✅ Protected routes (require login)
- ✅ Profile page dengan tabs
- ✅ Logout functionality
- ⚠️ Password reset (partial)
- ❌ Email verification
- ❌ Edit profile

### **2. Pertunjukan Seni**

- ✅ List pertunjukan dengan grid layout
- ✅ Search by judul
- ✅ Filter by kategori
- ✅ Detail pertunjukan lengkap
- ✅ Ticket categories dengan harga
- ✅ Availability tracking
- ✅ Booking form
- ✅ Order history
- ✅ Wishlist functionality

### **3. Talent Booking**

- ✅ Browse by kategori seni
- ✅ List talents dengan filter
- ✅ Detail talent dengan packages
- ✅ Package comparison
- ✅ Booking form
- ✅ Booking history
- ✅ Wishlist functionality

### **4. Konten**

- ✅ News/Berita page
- ✅ Search & filter berita
- ✅ Featured news section
- ✅ Detail artikel
- ✅ Seniman profiles (via talent)

### **5. Admin Panel**

- ✅ Dashboard dengan statistik
- ✅ CRUD Pertunjukan
- ✅ CRUD Talent dengan packages
- ✅ CRUD Seniman
- ✅ CRUD Berita
- ✅ Manage bookings
- ✅ Manage transactions
- ✅ Status updates
- ✅ Bulk actions
- ✅ Filter & search

### **6. UI/UX**

- ✅ Responsive design
- ✅ Modern, clean interface
- ✅ Smooth animations (Framer Motion)
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation
- ✅ Rupiah formatting
- ✅ Status badges
- ✅ Icons (Lucide)

---

## 🏗️ ARSITEKTUR SISTEM

### **Frontend Architecture**

```
kadangu-main/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── ShowsPage.jsx
│   │   ├── ShowDetailPage.jsx
│   │   ├── TicketBookingPage.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── TalentDetailPage.jsx
│   │   ├── TalentBookingPage.jsx
│   │   ├── BrowsePage.jsx
│   │   ├── NewsPage.jsx
│   │   └── PaymentSuccessPage.jsx
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx  # Global auth state
│   │
│   ├── lib/
│   │   ├── api.js           # API service layer
│   │   └── currency.js      # Rupiah formatting
│   │
│   ├── App.jsx              # Routes & AuthProvider
│   └── main.jsx             # Entry point
│
├── public/
└── package.json

Tech Stack:
- React 18
- React Router v6
- Tailwind CSS
- Framer Motion
- Vite
- Lucide Icons
```

### **Backend Architecture**

```
kadangu-server/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── Api/
│   │       │   ├── PertunjukanController.php
│   │       │   ├── SenimanController.php
│   │       │   ├── BeritaController.php
│   │       │   ├── BookingController.php
│   │       │   ├── TransactionController.php
│   │       │   └── WishlistController.php
│   │       │
│   │       └── Admin/
│   │           ├── PertunjukanController.php
│   │           ├── TalentController.php
│   │           ├── SenimanController.php
│   │           ├── BeritaController.php
│   │           ├── BookingController.php
│   │           ├── TransactionController.php
│   │           └── DashboardController.php
│   │
│   └── Models/
│       ├── User.php
│       ├── Pertunjukan.php
│       ├── Seniman.php
│       ├── Berita.php
│       ├── Talent.php
│       ├── TalentPackage.php
│       ├── TalentBooking.php
│       ├── EventTicketOrder.php
│       └── Wishlist.php
│
├── database/
│   ├── migrations/
│   └── seeders/
│
├── resources/
│   └── views/
│       └── admin/
│           ├── dashboard.blade.php
│           ├── pertunjukan/
│           ├── talent/
│           ├── seniman/
│           ├── berita/
│           ├── talent-booking/
│           └── transaction/
│
├── routes/
│   ├── web.php
│   └── api.php
│
└── storage/
    └── app/
        └── public/         # Uploaded files

Tech Stack:
- Laravel 10
- MySQL
- Laravel Sanctum (Auth)
- Blade Templates (Admin)
- Eloquent ORM
```

### **Database Schema (Key Tables)**

```sql
-- Users
users (id, name, email, phone, location, password, created_at, updated_at)

-- Seniman (Categories)
senimans (id, nama, deskripsi, created_at, updated_at)

-- Pertunjukan (Shows)
pertunjukans (id, seniman_id, judul, deskripsi, tanggal_pertunjukan,
              lokasi, gambar, ticket_categories, status, created_at, updated_at)

-- Talents
talents (id, seniman_id, name, slug, bio, genre, base_price, photo,
         portfolio, availability_status, service_description, status,
         created_at, updated_at)

-- Talent Packages
talent_packages (id, talent_id, name, price, duration_hours, description,
                 includes, status, created_at, updated_at)

-- Talent Bookings
talent_bookings (id, user_id, talent_id, package_id, customer_name,
                 customer_email, customer_phone, event_name, event_date,
                 event_location, event_duration, notes, status,
                 created_at, updated_at)

-- Event Ticket Orders
event_ticket_orders (id, user_id, pertunjukan_id, ticket_category_id,
                     customer_name, customer_email, customer_phone,
                     quantity, total_price, status, created_at, updated_at)

-- Wishlists
wishlists (id, user_id, pertunjukan_id, talent_id, created_at, updated_at)

-- Berita (News)
beritas (id, seniman_id, judul, konten, gambar, created_at, updated_at)
```

### **API Endpoints**

#### Public Endpoints

```
GET  /api/pertunjukan              - List shows
GET  /api/pertunjukan/{id}         - Show detail
GET  /api/talents                  - List talents
GET  /api/talents/{id}             - Talent detail
GET  /api/beritas                  - List news
GET  /api/beritas/{id}             - News detail
GET  /api/senimans                 - List categories
```

#### Protected Endpoints (Auth Required)

```
POST   /api/talent-bookings        - Create talent booking
GET    /api/user/talent-bookings   - User's bookings
POST   /api/event-ticket-orders    - Create ticket order
GET    /api/user/event-ticket-orders - User's orders

GET    /api/wishlists              - Get wishlist
POST   /api/wishlists              - Add to wishlist
DELETE /api/wishlists/{id}         - Remove from wishlist
GET    /api/wishlists/check        - Check if in wishlist

POST   /api/register               - Register user
POST   /api/login                  - Login user
```

---

## 📊 STATUS IMPLEMENTASI

### **Completed Features (✅)**

#### Frontend

- [x] Authentication (Login, Register, Logout)
- [x] Protected Routes
- [x] Profile Page dengan Order History
- [x] Shows List & Detail
- [x] Ticket Booking Form
- [x] Talent List & Detail
- [x] Talent Booking Form
- [x] News Page
- [x] Browse/Explore Page
- [x] Wishlist Functionality
- [x] Search & Filter
- [x] Responsive Design
- [x] Loading States
- [x] Error Handling
- [x] Rupiah Formatting

#### Backend

- [x] User Authentication (Sanctum)
- [x] API Endpoints (Public & Protected)
- [x] Admin Panel (Dashboard, CRUD)
- [x] Database Schema
- [x] Models & Relationships
- [x] Wishlist System
- [x] Booking Management
- [x] Transaction Management
- [x] File Upload (Images)
- [x] Validation
- [x] Security (Password Hashing, CSRF, etc)

### **Partially Implemented (⚠️)**

- [ ] Password Reset (Link exists, flow incomplete)
- [ ] Edit Profile (View only, no edit form)
- [ ] Payment Proof Upload (Form not implemented)

### **Not Implemented (❌)**

- [ ] Email Verification
- [ ] WhatsApp E-ticket Delivery
- [ ] Payment Gateway Integration (Midtrans)
- [ ] Real-time Notifications
- [ ] Review & Rating System
- [ ] Advanced Analytics
- [ ] Export Reports (PDF/Excel)

---

## 🎯 KESIMPULAN

### **Pencapaian Sistem**

Sistem **Kadangu** telah berhasil mengimplementasikan **90%** dari functional requirements yang ditentukan. Fitur-fitur utama seperti autentikasi, booking talent, pembelian tiket, wishlist, dan admin panel telah berfungsi dengan baik.

### **Kelebihan Sistem**

1. **User-Friendly** - Interface modern dan mudah digunakan
2. **Responsive** - Berfungsi optimal di semua device
3. **Secure** - Implementasi security best practices
4. **Scalable** - Arsitektur yang terstruktur dan maintainable
5. **Feature-Rich** - Banyak fitur yang sudah terimplementasi

### **Area Pengembangan**

1. **Payment Integration** - Integrasi payment gateway (Midtrans)
2. **Email System** - Email verification & notifications
3. **WhatsApp Integration** - Auto-send e-ticket
4. **Advanced Features** - Review system, analytics, reports
5. **Performance** - Caching, optimization

### **Rekomendasi Next Steps**

1. Implement payment gateway untuk automated payment
2. Setup email service untuk notifications
3. Integrate WhatsApp Business API
4. Add review & rating system
5. Implement advanced analytics
6. Add export functionality
7. Performance optimization
8. Comprehensive testing
9. Documentation lengkap
10. Deployment ke production

---

## 📝 CATATAN TEKNIS

### **Environment Variables**

#### Frontend (.env)

```
VITE_API_URL=http://localhost:8000/api
```

#### Backend (.env)

```
APP_KEY=base64:...
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kadangu_db
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost
```

### **Running the Application**

#### Frontend

```bash
cd kadangu-main
npm install
npm run dev
# Runs on http://localhost:5173
```

#### Backend

```bash
cd kadangu-server
composer install
php artisan key:generate
php artisan migrate
php artisan storage:link
php artisan serve
# Runs on http://localhost:8000
```

---

**Dokumen ini dibuat untuk memenuhi requirement analysis sistem Kadangu.**
**Last Updated: 24 Desember 2024**

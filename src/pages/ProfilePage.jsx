import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Package,
  Ticket as TicketIcon,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchUserTalentBookings, fetchUserTicketOrders } from "@/lib/api";
import { formatRupiah } from "@/lib/currency";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "@/components/EditProfileModal";

const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    user: authUser,
    isAuthenticated,
    logout,
    loading: authLoading,
  } = useAuth();
  const [loading, setLoading] = useState(true);
  const [talentBookings, setTalentBookings] = useState([]);
  const [ticketOrders, setTicketOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadUserData = async () => {
      setLoading(true);
      try {
        // Fetch user bookings and orders
        const [bookingsResponse, ordersResponse] = await Promise.all([
          fetchUserTalentBookings().catch(() => ({ data: [] })),
          fetchUserTicketOrders().catch(() => ({ data: [] })),
        ]);

        setTalentBookings(
          Array.isArray(bookingsResponse)
            ? bookingsResponse
            : bookingsResponse.data || []
        );
        setTicketOrders(
          Array.isArray(ordersResponse)
            ? ordersResponse
            : ordersResponse.data || []
        );
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const userStats = [
    {
      label: "Tiket Dibeli",
      value: ticketOrders.length.toString(),
      color: "text-blue-600",
    },
    {
      label: "Booking Talent",
      value: talentBookings.length.toString(),
      color: "text-pink-600",
    },
    {
      label: "Total Pesanan",
      value: (ticketOrders.length + talentBookings.length).toString(),
      color: "text-green-600",
    },
  ];

  const menuItems = [
    {
      icon: Edit,
      label: "Edit Profil",
      description: "Ubah informasi pribadi Anda",
      action: () => setIsEditModalOpen(true),
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Settings,
      label: "Pengaturan",
      description: "Kelola preferensi akun",
      action: () => console.log("Settings clicked"),
      color: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: Calendar,
      label: "Riwayat Pesanan",
      description: "Lihat semua pesanan Anda",
      action: () => {
        setActiveTab("all");
        window.scrollTo({ top: 400, behavior: "smooth" });
      },
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: LogOut,
      label: "Keluar",
      description: "Logout dari akun Anda",
      danger: true,
      action: () => {
        logout();
        navigate("/login");
      },
      color: "from-red-500 to-red-600",
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      cancelled: "bg-red-100 text-red-700",
      completed: "bg-blue-100 text-blue-700",
    };
    const labels = {
      confirmed: "Terkonfirmasi",
      pending: "Menunggu",
      cancelled: "Dibatalkan",
      completed: "Selesai",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          styles[status] || styles.pending
        }`}
      >
        {labels[status] || status}
      </span>
    );
  };

  const allOrders = [
    ...talentBookings.map((booking) => ({
      id: booking.id,
      type: "talent",
      title: booking.talent?.name || "Talent Booking",
      package: booking.package?.name || "-",
      date: booking.event_date,
      status: booking.status,
      total: booking.total_price || 0,
    })),
    ...ticketOrders.map((order) => ({
      id: order.id,
      type: "ticket",
      title: order.pertunjukan?.judul || "Event Ticket",
      category:
        order.ticket_category?.nama || order.ticket_category?.name || "-",
      date: order.pertunjukan?.tanggal_pertunjukan,
      status: order.status,
      total: order.total_harga || 0,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleProfileUpdate = (updatedUser) => {
    // Update local storage
    localStorage.setItem("user", JSON.stringify(updatedUser));
    // Trigger page reload to update auth context
    window.location.reload();
  };

  return (
    <>
      <Helmet>
        <title>Profil - Kadangu</title>
        <meta
          name="description"
          content="Kelola profil Anda dan pengaturan akun di Kadangu."
        />
      </Helmet>

      <div className="w-full bg-gray-50 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center ring-4 ring-white shadow-lg">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <Button
                      size="icon"
                      onClick={() => setIsEditModalOpen(true)}
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 shadow-md"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {authUser?.name || "Sobat Kadangu"}
                    </h2>
                    <div className="space-y-1 text-gray-600 mb-4">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">
                          {authUser?.email || "sobat@kadangu.com"}
                        </span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">
                          {authUser?.phone || "+62 812-3456-7890"}
                        </span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">
                          {authUser?.location || "Garut, Jawa Barat"}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 justify-center md:justify-start">
                      {userStats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className={`text-2xl font-bold ${stat.color}`}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === "all"
                    ? "bg-[hsl(var(--primary))] text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                Semua Pesanan
              </button>
              <button
                onClick={() => setActiveTab("talent")}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === "talent"
                    ? "bg-[hsl(var(--primary))] text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                Booking Talent
              </button>
              <button
                onClick={() => setActiveTab("ticket")}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === "ticket"
                    ? "bg-[hsl(var(--primary))] text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                Tiket Event
              </button>
            </div>

            {/* Orders List */}
            {loading ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500">Memuat data...</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {allOrders
                  .filter(
                    (order) => activeTab === "all" || order.type === activeTab
                  )
                  .map((order, index) => (
                    <motion.div
                      key={`${order.type}-${order.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                {order.type === "talent" ? (
                                  <Package className="w-5 h-5 text-[hsl(var(--primary))]" />
                                ) : (
                                  <TicketIcon className="w-5 h-5 text-[hsl(var(--accent))]" />
                                )}
                                <h3 className="text-lg font-bold">
                                  {order.title}
                                </h3>
                                {getStatusBadge(order.status)}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                {order.type === "talent"
                                  ? `Paket: ${order.package}`
                                  : `Kategori: ${order.category}`}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(order.date).toLocaleDateString(
                                    "id-ID",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <p className="text-xl font-bold text-[hsl(var(--primary))]">
                                {formatRupiah(order.total)}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <Button
                              className="flex-1"
                              onClick={() => {
                                if (order.type === "talent") {
                                  navigate(`/booking/${order.id}`);
                                } else {
                                  // For tickets, maybe redirect to invoice or show detail modal (future dev)
                                  // For now, let's just log or maybe alert
                                  // Or perhaps we can reuse payment-success page if it supports viewing by ID
                                  // navigate(`/payment-success?order_id=${order.id}`);
                                }
                              }}
                            >
                              Lihat Detail
                            </Button>
                            {order.status === "confirmed" && (
                              <Button
                                variant="outline"
                                className="px-6"
                                onClick={() =>
                                  window.open(
                                    `/invoice/${order.type}/${order.id}`,
                                    "_blank"
                                  )
                                }
                              >
                                Download Invoice
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                {allOrders.filter(
                  (order) => activeTab === "all" || order.type === activeTab
                ).length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      {activeTab === "talent" ? (
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      ) : activeTab === "ticket" ? (
                        <TicketIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      ) : (
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      )}
                      <p className="text-gray-500">
                        {activeTab === "talent"
                          ? "Belum ada booking talent"
                          : activeTab === "ticket"
                          ? "Belum ada tiket"
                          : "Belum ada pesanan"}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Menu Items */}
            <div className="grid gap-4 mt-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 border-2 ${
                      item.danger
                        ? "hover:border-red-300 hover:shadow-lg hover:shadow-red-100"
                        : "hover:border-primary/30 hover:shadow-lg"
                    }`}
                    onClick={item.action}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.iconBg} transition-transform duration-300 hover:scale-110`}
                        >
                          <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`font-semibold text-lg ${
                              item.danger ? "text-red-600" : "text-gray-900"
                            }`}
                          >
                            {item.label}
                          </h3>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight
                          className={`w-5 h-5 ${
                            item.danger ? "text-red-400" : "text-gray-400"
                          } transition-transform duration-300`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={authUser}
        onSave={handleProfileUpdate}
      />
    </>
  );
};

export default ProfilePage;

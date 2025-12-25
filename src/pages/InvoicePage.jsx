import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatRupiah } from "@/lib/currency";
import { apiCall } from "@/lib/api";
import { Printer } from "lucide-react";

const InvoicePage = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = "";
        if (type === "booking" || type === "talent") {
          endpoint = `/talent-bookings/${id}`;
        } else if (type === "ticket") {
          endpoint = `/event-ticket-orders/${id}`;
        }

        const response = await apiCall(endpoint);
        setData(response);
      } catch (error) {
        console.error("Failed to load invoice data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && type) {
      fetchData();
    }
  }, [type, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-600/30 border-t-teal-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-red-500">
        Invoice not found
      </div>
    );
  }

  // Map data fields based on type
  const isBooking = type === "booking" || type === "talent";
  const invoiceNumber = isBooking
    ? data.booking_code
    : data.kode_booking || `TCK-${data.id}`;

  const date = new Date(data.created_at || new Date()).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const customerName = data.user?.name || "Customer";
  const customerEmail = data.user?.email || "-";

  const itemName = isBooking
    ? `${data.talent?.name} - ${data.package?.name}`
    : `${data.pertunjukan?.judul} - ${
        data.ticketCategories
          ? data.ticketCategories?.nama
          : data.ticket_category?.nama || data.ticket_category?.name
      }`;

  const itemDescription = isBooking
    ? `Talent Booking on ${new Date(data.event_date).toLocaleDateString()}, ${
        data.event_time
      }`
    : `Event Ticket for ${new Date(
        data.pertunjukan?.tanggal_pertunjukan
      ).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`;

  const amount = isBooking ? data.total_price : data.total_harga;
  return (
    <div className="min-h-screen bg-gray-100 py-8 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden print:shadow-none print:rounded-none">
        {/* Toolbar - Hidden in Print */}
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center print:hidden">
          <span className="font-semibold">Invoice Preview</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors font-medium"
          >
            <Printer className="w-4 h-4" />
            Cetak / Download PDF
          </button>
        </div>

        {/* Invoice Content */}
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold text-teal-600 mb-2">INVOICE</h1>
              <p className="text-gray-500 font-semibold">#{invoiceNumber}</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800">Kadangu</h2>
              <p className="text-gray-500 text-sm mt-1">
                Platform Booking Seni & Budaya
                <br />
                Garut, Jawa Barat
                <br />
                support@kadangu.com
              </p>
            </div>
          </div>

          {/* Bill To & Info */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-12 border-t border-gray-100 pt-8">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                TAGIHAN KEPADA
              </h3>
              <p className="text-xl font-bold text-gray-800">{customerName}</p>
              <p className="text-gray-600">{customerEmail}</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                TANGGAL
              </h3>
              <p className="text-lg font-medium text-gray-800">{date}</p>

              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">
                METODE PEMBAYARAN
              </h3>
              <p className="text-lg font-medium text-gray-800">
                Manual Transfer
              </p>
            </div>
            {/* QR Code for Ticket */}
            {!isBooking && (
              <div className="text-right">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                  SCAN QR CODE
                </h3>
                <div className="inline-block p-2 border-2 border-dashed border-gray-200 rounded-lg">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                      invoiceNumber
                    )}`}
                    alt="QR Code"
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="mb-12">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-teal-600">
                  <th className="text-left py-4 font-bold text-gray-600">
                    DESKRIPSI
                  </th>
                  <th className="text-right py-4 font-bold text-gray-600">
                    JUMLAH
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4">
                    <p className="font-bold text-gray-800">{itemName}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {itemDescription}
                    </p>
                  </td>
                  <td className="py-4 text-right font-medium text-gray-800">
                    {formatRupiah(amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="flex justify-end mb-12">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-800">
                  {formatRupiah(amount)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Biaya Layanan</span>
                <span className="font-medium text-gray-800">
                  {formatRupiah(0)}
                </span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-xl font-bold text-teal-600">TOTAL</span>
                <span className="text-xl font-bold text-teal-600">
                  {formatRupiah(amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600 font-medium mb-2">
              Terima kasih atas kepercayaan Anda!
            </p>
            <p className="text-gray-400 text-sm">
              Invoice ini sah dan diproses secara otomatis oleh komputer.
              <br />
              Harap simpan invoice ini sebagai bukti pembayaran yang sah.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Wallet = () => {
  const location = useLocation();
  const [payments, setPayments] = useState([]);
  const roleStr = localStorage.getItem("role");
  const isAuthenticated =
    roleStr && roleStr !== "undefined" && roleStr !== "null";
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/users/getUser`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          },
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/booking/getuserbooking?user_id=${user?._id}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          },
        );
        setPayments(response.data.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    if (user?._id) {
      fetchPayments();
    }
  }, [user]);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-3xl text-center font-bold mb-8 text-gray-800">
        Manage your wallet and payment history here
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {payments.map((payment, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col"
          >
            <div className="p-5 flex-grow">
              <h3 className="text-xl font-semibold mb-3 border-b pb-2">
                Event name: {payment.event_id?.name}
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong className="font-semibold text-gray-900">
                    Event:
                  </strong>{" "}
                  {payment.event_id?.venue}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Reserved seats:
                  </strong>{" "}
                  {payment.seatNumbers?.join(", ")}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Guest size:
                  </strong>{" "}
                  {payment.guestSize}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Reservation date:
                  </strong>{" "}
                  {new Date(payment.bookingDate).toLocaleDateString()}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Total Price:
                  </strong>{" "}
                  ${payment.totalPrice}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Payment status:
                  </strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-sm ${payment.paymentStatus === "completed" || payment.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {payment.paymentStatus}
                  </span>
                </p>
              </div>

              <div className="flex justify-center items-center mt-6">
                {payment.qrCodeUrl ? (
                  <img
                    src={payment.qrCodeUrl}
                    alt="QR Code"
                    className="w-[100px] h-[100px] object-cover border p-1 rounded bg-white"
                  />
                ) : (
                  <div className="w-[100px] h-[100px] bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center border p-1 rounded">
                    No QR Code
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 pt-0 mt-auto">
              <button
                className="w-full bg-[#1976d2] hover:bg-[#115293] text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() =>
                  payment.qrCodeUrl && window.open(payment.qrCodeUrl, "_blank")
                }
                disabled={!payment.qrCodeUrl}
              >
                View QR code
              </button>
            </div>
          </div>
        ))}

        {payments.length === 0 && user && (
          <div className="col-span-full text-center py-10 text-gray-500">
            No payment history found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;

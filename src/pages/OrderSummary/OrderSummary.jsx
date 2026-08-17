import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMoneyBillWave, FaChair } from "react-icons/fa";

import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { UserContext } from "../../UserContext";

export default function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { payload } = location.state;
  const { user } = useContext(UserContext);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConfirmBooking = async () => {
    console.log(user?._id, payload?.event_id);
    setLoading(true);

    const payloadData = {
      user_id: user?._id,
      event_id: payload?.event_id,
      bookingDate: payload?.bookingDate,
      guestSize: payload?.guestSize,
      seatNumbers: payload?.seatNumbers,
      totalPrice: payload?.totalPrice,
    };
    console.log(payloadData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/booking/stripe`,
        payloadData,
        {
          headers: {
            
          },
        },
      );
      console.log(response);
      if (response.data && response.data.stripeUrl) {
        window.location.href = response.data.stripeUrl;
      } else {
        console.error("Stripe URL not found in response");
      }
    } catch (err) {
      console.error("Error during booking:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="py-[90px]">
      <button
        className="inline-flex mt-12 gap-2 p-3 ml-12 bg-gray-100 justify-center items-center text-blue-700 font-bold rounded-md text-[16px] hover:bg-gray-200 transition-colors"
        onClick={handleBack}
      >
        <IoMdArrowBack className="font-bold w-7 h-7 gap-2" />
        Back
      </button>

      {loading && (
        <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/50 backdrop-blur-sm">
          <LoadingScreen />
        </div>
      )}

      <div className="flex flex-col px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-5 mt-8">
          {/* Terms & Conditions */}
          <div className="p-4 bg-gray-100 w-full lg:w-3/4 mb-12 rounded-lg">
            <h2 className="text-left font-bold text-[16px]">
              Terms and conditions
            </h2>
            <br />
            <div>
              <ul className="list-disc pl-5 text-[15px] leading-relaxed space-y-2 text-gray-700 custom-list">
                <li>
                  Refunds will be issued for ticket cancellations made up to 14
                  days prior to the event date. After this period, no refunds
                  will be issued. To request a refund, please contact our
                  customer service team.
                </li>
                <li>
                  Tickets will be sent to your registered email address as
                  e-tickets. You can print the e-ticket or show it on your
                  mobile device to enter the event.
                </li>
                <li>
                  Each person is allowed to purchase a maximum of two tickets
                  for this event to ensure equitable distribution.
                </li>
                <li>
                  In the rare event of a cancellation or postponement, attendees
                  will be notified by email. Refunds will be automatically
                  processed for canceled events.
                </li>
                <li>
                  Tickets for postponed events will not be refunded and will be
                  considered valid on the date of postponement.
                </li>
                <li>
                  Your privacy is important to us. Our privacy policy describes
                  how we collect, use, and protect your personal information. By
                  using our app, you agree to our privacy policy.
                </li>
                <li>
                  Before proceeding with your ticket purchase, please review and
                  accept our terms and conditions, which govern the use of our
                  app and ticket services.
                </li>
              </ul>
            </div>
            {user && (
              <div className="mt-5 text-center">
                <button
                  onClick={handleConfirmBooking}
                  disabled={!isCheckboxChecked}
                  className={`w-full max-w-md py-3 rounded-full text-white font-bold text-lg mt-4 transition-colors ${!isCheckboxChecked ? "bg-gray-400 cursor-not-allowed" : "bg-[#3960ba] hover:bg-[#2b4c9e]"}`}
                >
                  Proceed For Payment
                </button>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="w-full lg:w-1/4 bg-blue-100 p-4 rounded-lg">
            <div className="p-[20px] bg-[#f9f9f9] rounded-[10px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] max-w-[400px] mx-auto">
              {/* Event Name */}
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-[#1976d2] text-xl" />
                <h3 className="text-xl font-bold">{payload?.eventName}</h3>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-300 my-[15px]"></div>

              {/* Total Price */}
              <div className="flex items-center gap-2 mb-[10px]">
                <FaMoneyBillWave className="text-[#2e7d32] text-xl" />
                <p className="text-[14px]">
                  Total Price:{" "}
                  <span className="font-bold">
                    {payload?.totalPrice} {payload?.currency}
                  </span>
                </p>
              </div>

              {/* Booked Seats */}
              <div className="flex items-center gap-2">
                <FaChair className="text-[#9c27b0] text-xl" />
                <p className="text-[14px]">
                  Reserved seats:{" "}
                  <span className="font-bold">
                    {payload?.seatNumbers.length > 0
                      ? payload?.seatNumbers.join(", ")
                      : "No seats selected"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start mt-5 gap-2 bg-white/50 p-3 rounded-lg">
              <input
                className="h-5 w-5 mt-1 cursor-pointer"
                type="checkbox"
                onChange={handleCheckboxChange}
                id="termsCheckbox"
              />
              <label
                htmlFor="termsCheckbox"
                className="text-[13px] leading-relaxed cursor-pointer text-gray-800"
              >
                I have verified the name, date, and time of the event before
                proceeding to payment. I accept the terms and conditions.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


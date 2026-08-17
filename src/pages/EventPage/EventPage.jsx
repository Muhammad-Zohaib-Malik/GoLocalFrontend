import React, { useEffect, useMemo, useState } from "react";

import {
  FaLocationArrow,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaChair,
  FaCheckCircle,
  FaTicketAlt,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DynamicGallery from "./components/DynamicGallery";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

import axiosClient from "../../api/axiosClient";

export default function EventPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userRole, setUserRole] = useState(null);

  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState(null);
  const [payments, setPayments] = useState([]);

  const fetchEventData = useMemo(() => {
    return async () => {
      const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/events/getsingleEvent?id=${id}`;
      try {
        const response = await axios.get(url, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setEventData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
  }, [id]);

  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchRole = async () => {
      try {
        const response = await axiosClient.get("/users/getUser");
        setUserRole(response.data.data.role);
      } catch (error) {
        setUserRole(null);
      }
    };

    if (document.cookie.includes("accessToken=")) {
      fetchRole();
    }
  }, []);

  useEffect(() => {
    if (eventData?._id && userRole !== "user") {
      const fetchPayments = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/booking/geteventbooking?event_id=${eventData._id}`,
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

      fetchPayments();
    }
  }, [eventData?._id, userRole]);

  const handleBookNow = () => {
    if (userRole !== "user" || !userRole) {
      Swal.fire({
        title: "Please log in or register",
        text: "To continue with the booking process, please log in or register your account.",
        icon: "info",
        confirmButtonText: "Ok",
        confirmButtonColor: "#007bff",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      Swal.fire({
        title: "Choose a date",
        html: `
 <div style="display: flex; flex-direction: column; gap: 10px; text-align: center;">
 <button id="firstDateBtn" style="padding: 10px; border-radius: 8px; border: 2px solid #007bff; background-color: #f7f7f7; cursor: pointer; font-weight: bold;">
 ${new Date(eventData?.eventDateSec).toDateString()} <br/> ${new Date(eventData?.eventTimeSec).toLocaleTimeString()}
 </button>
 <button id="secondDateBtn" style="padding: 10px; border-radius: 8px; border: 2px solid #007bff; background-color: #f7f7f7; cursor: pointer; font-weight: bold;">
 ${new Date(eventData?.eventDate).toDateString()} <br/> ${new Date(eventData?.eventTime).toLocaleTimeString()}
 </button>
 </div>
 `,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        didOpen: () => {
          document
            .getElementById("firstDateBtn")
            .addEventListener("click", () => {
              Swal.close();
              navigate("/seatMap", {
                state: { event: eventData, selectionDate: "first" },
              });
            });

          document
            .getElementById("secondDateBtn")
            .addEventListener("click", () => {
              Swal.close();
              navigate("/seatMap", {
                state: { event: eventData, selectionDate: "second" },
              });
            });
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#f4f8fb] p-5 mt-[85px]">
        <div className="w-full max-w-[1200px] bg-white rounded-[20px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] overflow-hidden">
          <img
            src={
              eventData?.photo ||
              "https://cdn.pixabay.com/photo/2021/01/01/12/44/concert-5878452_960_720.jpg"
            }
            alt="Event"
            className="w-full h-[200px] md:h-[300px] object-cover"
          />
          <div className="p-4 md:p-[20px] text-left">
            <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center mb-[20px] gap-2 md:gap-[20px]">
              <h1 className="text-2xl md:text-[28px] font-bold text-[#333333]">
                {eventData?.name}
              </h1>
              <div className="bg-[#eaf3ff] text-[#007bff] px-[10px] py-[5px] rounded-[10px] text-[12px] md:text-[14px] font-bold">
                Vip: {eventData?.vipprice} {eventData?.currency}
              </div>
              <div className="bg-[#eaf3ff] text-[#007bff] px-[10px] py-[5px] rounded-[10px] text-[12px] md:text-[14px] font-bold">
                Economy: {eventData?.economyprice} {eventData?.currency}
              </div>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-2 md:gap-[20px] mb-2">
              <p className="text-[14px] text-[#666666] flex items-center gap-1">
                <FaLocationArrow className="text-sm" /> {eventData?.venue},{" "}
                {eventData?.address}
              </p>
              <p className="text-[14px] text-[orangered] flex items-center gap-1">
                <FaTicketAlt className="text-sm" />{" "}
                {eventData?.ticket === "Online" ? "Online" : "WalkIn"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-2 md:gap-[20px] mb-[15px]">
              <p className="text-[14px] text-[#666666] flex items-center gap-1">
                <FaCalendarAlt className="text-sm" />{" "}
                {new Date(eventData?.eventDateSec).toDateString()} en{" "}
                {new Date(eventData?.eventTimeSec).toLocaleTimeString()}
              </p>
              <p className="text-[14px] text-[#666666] flex items-center gap-1">
                <FaCalendarAlt className="text-sm" />{" "}
                {new Date(eventData?.eventDate).toDateString()} en{" "}
                {new Date(eventData?.eventTime).toLocaleTimeString()}
              </p>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-2 md:gap-[20px] mb-[20px]">
              <div className="flex flex-col gap-1">
                <div className="text-[12px] md:text-[16px] text-[#333333] font-medium flex items-center gap-1 mt-[5px]">
                  <FaUsers className="text-sm" /> Capicity total:{" "}
                  {eventData?.TotalCapacity}
                </div>
                <div className="text-[12px] md:text-[16px] text-[#333333] font-medium flex items-center gap-1 mt-[5px]">
                  <FaChair className="text-sm" /> Vip Seats:{" "}
                  {eventData?.vipSize}, Economy Seats: {eventData?.economySize}
                </div>
                <div className="text-[12px] md:text-[16px] text-[#333333] font-medium flex items-center gap-1 mt-[5px]">
                  <FaChair className="text-sm" /> Seats available:{" "}
                  {eventData?.vipSize +
                    eventData?.economySize -
                    (eventData?.reservedSeats?.length || 0)}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-[12px] md:text-[16px] text-[orangered] font-medium flex items-center gap-1 mt-[5px]">
                  <FaCheckCircle className="text-lg" /> Economical options
                </div>
                <div className="text-[12px] md:text-[16px] text-[orangered] font-medium flex items-center gap-1 mt-[5px]">
                  <FaCheckCircle className="text-lg" /> Unforgettable
                  experiences
                </div>
                <div className="text-[12px] md:text-[16px] text-[orangered] font-medium flex items-center gap-1 mt-[5px]">
                  <FaCheckCircle className="text-lg" /> Stress-free planning
                </div>
              </div>
            </div>

            <div className="flex items-center my-[15px]">
              <img
                src="https://images.pexels.com/photos/91227/pexels-pho.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Organizer"
                className="w-[50px] h-[50px] rounded-full mr-[10px] object-cover"
              />
              <div className="text-[12px] md:text-[14px] text-[#666666]">
                <p className="font-bold text-[#333333]">
                  {eventData?.owner?.username}
                </p>
                <p>Event organizer</p>
              </div>
            </div>

            <div className="mb-[20px]">
              <h3 className="text-[16px] md:text-[18px] font-bold mb-[5px] text-[#333333]">
                Description
              </h3>
              <p className="text-[11px] md:text-[14px] text-[#666666] leading-[1.6]">
                {eventData?.desc} Join us for {eventData?.name}, an exciting
                event. It promises to inspire, educate, and entertain! Whether
                you're an industry/profession professional, an enthusiast, or
                simply looking for a unique experience, this event isn't one to
                be missed!
              </p>
            </div>

            <DynamicGallery gallery={eventData?.gallery} />

            {(userRole === "user" || !userRole) &&
              eventData?.ticket !== "Walk-in" && (
                <button
                  onClick={handleBookNow}
                  className="w-full bg-[#4CAF50] hover:bg-[#3e8e41] text-white p-[10px] md:p-[15px] text-center text-[12px] md:text-[16px] font-bold rounded-[10px] cursor-pointer mt-[15px] transition-colors"
                >
                  BOOK NOW
                </button>
              )}

            {userRole && userRole !== "user" && (
              <div className="p-3 mt-10">
                <h4 className="text-2xl text-center font-bold mb-6">
                  Payment history here{" "}
                  <span className="text-gray-500 italic text-lg font-normal">
                    (Total: {payments?.length})
                  </span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {payments.map((payment, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-5 border border-gray-100"
                    >
                      <h6 className="text-lg font-bold mb-2 border-b pb-2">
                        User: {payment?.user_id?.username}
                      </h6>
                      <div className="space-y-2 text-gray-700 text-sm">
                        <p>
                          <strong className="font-semibold">
                            Reserved seats:
                          </strong>{" "}
                          {payment.seatNumbers.join(", ")}
                        </p>
                        <p>
                          <strong className="font-semibold">Guest size:</strong>{" "}
                          {payment.guestSize}
                        </p>
                        <p>
                          <strong className="font-semibold">
                            Reservation date:
                          </strong>{" "}
                          {new Date(payment.bookingDate).toLocaleDateString()}
                        </p>
                        <p>
                          <strong className="font-semibold">
                            Total price:
                          </strong>{" "}
                          ${payment.totalPrice}
                        </p>
                        <p>
                          <strong className="font-semibold">
                            Payment status:
                          </strong>{" "}
                          <span
                            className={`ml-1 px-2 py-0.5 rounded text-xs ${payment.paymentStatus === "completed" || payment.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                          >
                            {payment.paymentStatus}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

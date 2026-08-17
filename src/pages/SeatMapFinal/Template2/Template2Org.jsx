import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";

const SeatMapPage = ({ formData, gallery, template }) => {
  const navigate = useNavigate();

  const economySize = Number(formData.economySize);
  const vipSeatsCount = Number(formData.vipSize); // Total VIP seats
  const economySeatsCount = economySize; // Total Economy seats
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  // Helper function to generate seat labels
  const generateSeats = (prefix, count) =>
    Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`).filter(
      Boolean,
    );

  const [seats, setSeats] = useState([
    ...generateSeats("VIP", vipSeatsCount),
    ...generateSeats("E", economySeatsCount),
  ]);
  const [draggedSeat, setDraggedSeat] = useState(null);

  // Handle dragging a seat
  const handleDragStart = (seat) => {
    setDraggedSeat(seat);
  };

  // Handle dropping a seat
  const handleDrop = (targetSeat) => {
    if (!draggedSeat || !targetSeat || draggedSeat === targetSeat) return;

    setSeats((prevSeats) => {
      const updatedSeats = [...prevSeats];
      const draggedIndex = updatedSeats.indexOf(draggedSeat);
      const targetIndex = updatedSeats.indexOf(targetSeat);

      // Swap the seats
      [updatedSeats[draggedIndex], updatedSeats[targetIndex]] = [
        updatedSeats[targetIndex],
        updatedSeats[draggedIndex],
      ];

      return updatedSeats;
    });

    setDraggedSeat(null); // Reset dragged seat
  };

  // Save seats and log the arrangement
  const handleSaveSeats = async () => {
    console.log("Saving seats...", template);
    console.log("Seats:", seats);

    const formDataPayload = new FormData();

    // Append other form data
    formDataPayload.append("name", formData.name);
    formDataPayload.append("template", template);
    formDataPayload.append("venue", formData.venue);
    formDataPayload.append("address", formData.address);
    formDataPayload.append("desc", formData.desc);
    formDataPayload.append("vipprice", formData.vipPrice);
    formDataPayload.append("vipSize", formData.vipSize);
    formDataPayload.append("economySize", formData.economySize);
    formDataPayload.append("economyprice", formData.economyPrice);
    formDataPayload.append("currency", formData.currency);
    formDataPayload.append("ticket", formData.paymentMethod);
    formDataPayload.append("category", formData.category);
    formDataPayload.append("photo", formData.photo); // Assuming `photo` is a file (Blob or File)
    formDataPayload.append("eventDate", formData.eventDate); // Assuming eventDate is a string
    formDataPayload.append("eventTime", formData.eventDate); // Combining event date and time
    formDataPayload.append("eventDateSec", formData.eventDate2); // Assuming eventDate is a string
    formDataPayload.append("eventTimeSec", formData.eventDate2); // Combining event date and time
    formDataPayload.append("finalSeats", seats); // Combining event date and time

    // Append gallery files as binary
    gallery.forEach((item, index) => {
      if (item.file) {
        formDataPayload.append(`gallery[${index}]`, item.file);
      }
    });
    // Token removed as cookies are used instead
    setIsLoading(true); // Set loading state to true when request starts
    try {
      // Make the API request using Axios
      const response = await axiosClient.post(
        "/events/createEvent",
        formDataPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Adjust header for FormData
          },
        },
      );

      // Check if the response status is 201 (Created)
      if (response.status === 201) {
        console.log("Event created successfully:", response.data);
        localStorage.removeItem("eventForm");
        navigate("/events");

        // Optionally, handle any further logic after success, e.g., navigate or show a success message
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (err) {
      console.error("Error creating event:", err);
      // Optionally, handle specific error cases, e.g., if err.response is defined
      if (err.response && err.response.status) {
        console.error(`API returned error status: ${err.response.status}`);
      }
    } finally {
      setIsLoading(false); // Set loading state to true when request starts
    }
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center flex flex-col items-center text-white overflow-y-auto p-4 z-50"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/7991158/pexels-pho.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-10 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors z-10"
      >
        <FaArrowLeft className="text-lg" />
      </button>

      {isLoading && <LoadingScreen />}

      {/* Title */}
      <h1 className="text-3xl mb-[10px] mt-10 font-bold">
        Personalizar y organizar asientos
      </h1>

      <div className="cursor-pointer text-center text-yellow-300 text-[14px] font-bold mb-4 whitespace-nowrap overflow-hidden relative font-['cursive']">
        <style>
          {`
 @keyframes marquee {
 from { transform: translateX(100%); }
 to { transform: translateX(-100%); }
 }
 .animate-marquee::after {
 content: "";
 position: absolute;
 top: 0;
 right: 0;
 width: 100%;
 height: 100%;
 animation: marquee 5s linear infinite;
 background: linear-gradient(to right, rgba(245, 245, 245, 0), rgba(245, 245, 245, 1));
 }
 `}
        </style>
        <span className="animate-marquee relative">
          Drag and drop to arrange VIP and economy seating as needed
        </span>
      </div>

      {/* Legend */}
      <div className="flex justify-center mb-5 gap-5 flex-wrap">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-[#ff0e0e] rounded-[3px]"></div>
          <span className="ml-[10px]">VIP seat</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-[#3960ba] rounded-[3px]"></div>
          <span className="ml-[10px]">Economy seat</span>
        </div>
      </div>

      {/* Stage */}
      <div
        className="bg-contain bg-center w-[30%] min-h-[100px] flex mb-4 justify-center items-center rounded-[10px] shadow-[0px_4px_20px_rgba(255,255,0,0.4)]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('https://media.istockphoto.com/id/104240908/photo/curtain-up.jpg?s=612x612&w=0&k=20&c=vvCztyBpepy2sadDp00VrUc_tMHTEGsxat1H-Mi7vs8=')`,
        }}
      >
        <h2 className="text-white font-bold text-[24px] bg-black/50 py-[10px] px-[20px] rounded-[5px]">
          Stage
        </h2>
      </div>

      {/* Seats */}
      <div className="grid grid-cols-10 gap-[12px] max-w-6xl mx-auto pb-4">
        {seats.map((seat) => (
          <button
            key={seat}
            draggable
            onDragStart={() => handleDragStart(seat)}
            onDragOver={(e) => e.preventDefault()} // Allow dropping
            onDrop={() => handleDrop(seat)}
            className={`text-white border border-black rounded-[5px] rounded-tl-[15px] text-[10px] flex items-center justify-center gap-1 px-1 py-1 cursor-grab active:cursor-grabbing ${seat.startsWith("VIP") ? "bg-[#ff0e0e]" : "bg-[#3960ba]"}`}
          >
            <MdEventSeat className="text-xs" /> {seat}
          </button>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveSeats}
        className="mt-5 bg-[#ff0e0e] hover:bg-red-700 text-white py-2 px-6 rounded font-bold transition-colors mb-10"
      >
        Continue creating
      </button>
    </div>
  );
};

export default SeatMapPage;

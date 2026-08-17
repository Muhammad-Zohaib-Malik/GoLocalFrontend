import React, { useState } from "react";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import axiosClient from "../../../../api/axiosClient";
import { FaArrowLeft } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SeatMapModal = ({ formData, gallery, template }) => {
  const navigate = useNavigate();
  const economySize = Number(formData.economySize);
  const vipSeatsCount = Number(formData.vipSize); // Total VIP seats
  const economySeatsCount = economySize; // Total Economy seats
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const generateSeats = (prefix, count) =>
    Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`).filter(
      Boolean,
    );

  // Combined seats array: VIP seats first, then Economy seats
  const [seats, setSeats] = useState([
    ...generateSeats("VIP", vipSeatsCount),
    ...generateSeats("E", economySeatsCount),
  ]);
  const [draggedSeat, setDraggedSeat] = useState(null);

  const handleDragStart = (seat) => {
    setDraggedSeat(seat);
  };

  const handleDrop = (targetSeat) => {
    if (!draggedSeat || !targetSeat || draggedSeat === targetSeat) return;

    setSeats((prev) => {
      const updatedSeats = [...prev];
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

  const renderSeats = (seatsToRender, gridTemplateColumns) => (
    <div style={{ gridTemplateColumns }} className="grid gap-[5px]">
      {seatsToRender.map((seat) => (
        <button
          key={seat}
          draggable
          onDragStart={() => handleDragStart(seat)}
          onDragOver={(e) => e.preventDefault()} // Allow dropping
          onDrop={() => handleDrop(seat)}
          className={`text-white border border-black rounded-tr-full text-[10px] flex items-center justify-center px-1 py-1 cursor-grab active:cursor-grabbing ${seat.startsWith("VIP") ? "bg-[#ff0e0e]" : "bg-[#3960ba]"}`}
        >
          <MdEventSeat /> {seat}
        </button>
      ))}
    </div>
  );

  // Split seats into sections
  const vipSeats = seats.slice(0, vipSeatsCount); // Middle VIP seats
  const economySeatsLeft = seats.slice(
    vipSeatsCount,
    vipSeatsCount + Math.ceil(economySeatsCount / 2),
  ); // Left Economy seats
  const economySeatsRight = seats.slice(
    vipSeatsCount + Math.ceil(economySeatsCount / 2),
  ); // Right Economy seats

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center flex flex-col items-center text-white overflow-y-auto p-4 z-50"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/7991158/pexels-pho.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      {isLoading && <LoadingScreen />}

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-10 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors z-10"
      >
        <FaArrowLeft className="text-lg" />
      </button>

      <h1 className="text-3xl mb-[10px] mt-10 font-bold">
        Personalize and organize seats
      </h1>

      <div className="cursor-pointer text-center text-yellow-300 text-[14px] mb-2">
        Drag and drop to arrange VIP and economy seats as needed
      </div>

      {/* Legend */}
      <div className="flex justify-center mb-5 gap-5 flex-wrap">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-[#ff0e0e] rounded-full"></div>
          <span className="ml-[10px]">Asiento VIP</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-[#3960ba] rounded-full"></div>
          <span className="ml-[10px]">Economy seat</span>
        </div>
      </div>

      {/* Stage */}
      <div
        className="bg-contain bg-center w-[30%] min-h-[100px] flex mb-4 justify-center items-center rounded-[10px] shadow-[0px_4px_20px_rgba(255,255,0,0.4)]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa9a29gnDVHA3V9PfL9-ciX4M69VSknuiP6w&s')`,
        }}
      >
        <h2 className="text-white font-bold text-[24px] bg-black/50 py-[10px] px-[20px] rounded-[5px]">
          Stage
        </h2>
      </div>

      {formData.vipSize && formData.economySize && (
        <div className="flex flex-col md:flex-row justify-center items-start gap-[50px] w-full max-w-5xl overflow-x-auto p-4">
          {/* Economy Left */}
          <div>{renderSeats(economySeatsLeft, "repeat(5, 1fr)")}</div>
          {/* VIP */}
          <div>{renderSeats(vipSeats, "repeat(5, 1fr)")}</div>
          {/* Economy Right */}
          <div>{renderSeats(economySeatsRight, "repeat(5, 1fr)")}</div>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSaveSeats}
        className="mt-5 text-[13px] font-bold py-[10px] px-[80px] bg-green-600 hover:bg-green-800 text-white rounded transition-colors mb-10"
      >
        Continue creating
      </button>
    </div>
  );
};

export default SeatMapModal;

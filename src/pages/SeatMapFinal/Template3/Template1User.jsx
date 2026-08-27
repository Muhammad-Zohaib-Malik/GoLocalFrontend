import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FinalSeatMapWithDynamicSections = ({ event, selectionDate }) => {
  const navigate = useNavigate();
  // Final array after drag-and-drop adjustments by the organizer
  const comingSeats = event?.finalSeats;
  const finalSeats = comingSeats[0].split(",");
  const reservedSeats =
    selectionDate !== "first" ? event?.reservedSeats : event?.reservedSeatsSec;
  const originalVipCount = Number(event?.vipSize); // Organizer-defined count of VIP seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  const middleSeats = finalSeats.slice(0, originalVipCount);
  const remainingSeats = finalSeats.slice(originalVipCount);

  // Divide the remaining seats into left and right sections
  const halfRemaining = Math.ceil(remainingSeats.length / 2);
  const leftSeats = remainingSeats.slice(0, halfRemaining);
  const rightSeats = remainingSeats.slice(halfRemaining);

  const handleSeatClick = (seat) => {
    if (reservedSeats.includes(seat)) return; // Prevent reserved seats from being selected

    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );
  };

  const calculateTotalPrice = () => {
    const vipPrice = event?.vipprice;
    const economyPrice = event?.economyprice;

    return selectedSeats.reduce((total, seat) => {
      const isVip = seat.startsWith("VIP");
      return total + (isVip ? vipPrice : economyPrice);
    }, 0);
  };

  const renderSeats = (seats, gridTemplateColumns) => (
    <div
      style={{ gridTemplateColumns }}
      className="grid gap-[5px] justify-items-center"
    >
      {seats.map((seat) => {
        const isVip = seat.startsWith("VIP");
        const isSelected = selectedSeats.includes(seat);
        const isReserved = reservedSeats.includes(seat);

        let bgColor = "#3960ba"; // economy
        if (isReserved) bgColor = "grey";
        else if (isSelected) bgColor = "green";
        else if (isVip) bgColor = "#ff0e0e";

        let title = isReserved
          ? "Reserved"
          : isSelected
            ? "Selected"
            : "Available";

        return (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            title={title}
            style={{ backgroundColor: bgColor }}
            className={`text-white border border-black rounded-full text-[8px] flex items-center justify-center p-[2px] ${isReserved ? "cursor-not-allowed" : "cursor-pointer hover:opacity-80"}`}
          >
            <MdEventSeat className="text-sm" />
          </button>
        );
      })}
    </div>
  );

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      Swal.fire({
        icon: "warning",
        title: " There are no seats selected",
        text: "Please select your seats before continuing with your reservation.",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        confirmButtonColor: "#d33",
      });
      return;
    }
    const payload = {
      event_id: event?._id,
      eventName: event?.name,
      bookingDate:
        selectionDate !== "first" ? event?.eventDate : event?.eventDateSec,
      guestSize: selectedSeats.length,
      seatNumbers: selectedSeats,
      totalPrice: calculateTotalPrice(),
      currency: event?.currency,
    };
    console.log(payload);
    navigate("/event/ordersummary", { state: { payload } });
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center flex flex-col items-center text-white overflow-y-auto p-4 z-50 rounded-[30px]"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('https://images.pexels.com/photos/22737901/pexels-pho.jpeg?auto=compress&cs=tinysrgb&w=600')`,
      }}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-[70px] bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors z-10"
      >
        <FaArrowLeft className="text-lg" />
      </button>

      <h1 className="text-3xl mt-5 mb-[10px] font-bold">Select your seats</h1>

      {/* Legend */}
      <div className="flex flex-wrap justify-center mb-5 gap-5">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-[#ff0e0e] rounded-full"></div>
          <span className="ml-[10px]">vip seat</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-[#3960ba] rounded-full"></div>
          <span className="ml-[10px]">economy seat</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-gray-500 rounded-full"></div>
          <span className="ml-[10px]">Reserved seat</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-green-600 rounded-full"></div>
          <span className="ml-[10px]">Selected seat</span>
        </div>
      </div>

      {/* Stage */}
      <div
        className="bg-contain bg-center w-[30%] min-h-[100px] flex mb-4 justify-center items-center rounded-[10px] shadow-[0px_4px_10px_rgba(255,255,255,0.5)]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz9-QuSeVQBmr3klIM5NxEBfJjbuiaSoKhmQ&s')`,
        }}
      >
        <h2 className="text-white font-bold text-[14px] bg-black/50 py-[10px] px-[20px] rounded-[5px]">
          swings
        </h2>
      </div>

      {/* Seats */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-[50px] w-full max-w-5xl overflow-x-auto p-4">
        {/* Left Section */}
        <div>{renderSeats(leftSeats, "repeat(5, 1fr)")}</div>

        {/* Middle (VIP) Section */}
        <div>{renderSeats(middleSeats, "repeat(5, 1fr)")}</div>

        {/* Right Section */}
        <div>{renderSeats(rightSeats, "repeat(5, 1fr)")}</div>
      </div>

      <div className="w-full max-w-3xl flex flex-col items-center mt-6 gap-4">
        {/* Selected Seats */}
        <div className="p-[10px] bg-white/80 text-black text-center rounded w-full">
          <h6 className="text-[15px] font-bold">Selected seats</h6>
          <p>
            {selectedSeats.length > 0
              ? selectedSeats.join(", ")
              : "There are no seats selected"}
          </p>
        </div>

        {/* Total Price */}
        <div className="p-[10px] bg-white/80 text-black text-center rounded w-full">
          <h6 className="text-lg font-bold">Total price</h6>
          <p className="text-xl font-semibold">{event?.currency ? `${event.currency} ` : "PKR "}{calculateTotalPrice()}</p>
        </div>

        {/* Confirm Booking */}
        <button
          onClick={handleConfirmBooking}
          disabled={selectedSeats.length === 0}
          className={`mt-[10px] text-[12px] font-bold py-[10px] px-[80px] rounded transition-colors mb-10 ${selectedSeats.length === 0 ? "bg-gray-400 cursor-not-allowed text-gray-200" : "bg-green-600 hover:bg-green-800 text-white"}`}
        >
          Confirm booking
        </button>
      </div>
    </div>
  );
};

export default FinalSeatMapWithDynamicSections;

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
  const vipPrice = event?.vipprice;
  const economyPrice = event?.economyprice;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (reservedSeats.includes(seat)) return; // Prevent reserved seats from being selected

    setSelectedSeats(
      (prev) =>
        prev.includes(seat)
          ? prev.filter((s) => s !== seat) // Remove seat if it's already selected
          : [...prev, seat], // Add seat if it's not selected
    );
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const isVip = seat.startsWith("VIP");
      return total + (isVip ? vipPrice : economyPrice);
    }, 0);
  };

  const renderSeats = (seats) => (
    <div className="grid grid-cols-10 justify-items-center gap-1">
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
            className={`text-white border border-black rounded-[5px] rounded-tl-[15px] m-[1px] text-[12px] font-bold flex items-center justify-center gap-1 px-1 py-1 ${isReserved ? "cursor-not-allowed" : "cursor-pointer hover:opacity-80"}`}
          >
            <MdEventSeat /> {seat}
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
      className="fixed inset-0 w-screen h-screen bg-cover bg-center flex flex-col items-center text-white overflow-y-auto p-4 z-50"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/7991158/pexels-pho.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-10 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors z-10"
      >
        <FaArrowLeft className="text-lg" />
      </button>

      {/* Title and Info */}
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
      <div className="w-full max-w-4xl mx-auto px-4 pb-4">
        {renderSeats(finalSeats)} {/* Render all seats in one grid */}
      </div>

      <div className="w-full max-w-3xl flex flex-col items-center mt-6 gap-4">
        {/* Selected Seats */}
        <div className="p-[10px] bg-white/80 text-black text-center rounded w-full">
          <h6 className="text-lg font-bold">Selected seats</h6>
          <p>
            {selectedSeats.length > 0
              ? selectedSeats.join(", ")
              : "There are no seats selected"}
          </p>
        </div>

        {/* Total Price */}
        <div className="p-[10px] bg-white/80 text-black text-center rounded w-full">
          <h6 className="text-lg font-bold">Total price</h6>
          <p className="text-xl font-semibold">${calculateTotalPrice()}</p>
        </div>

        {/* Confirm Booking */}
        <button
          onClick={handleConfirmBooking}
          className="mt-[10px] text-[16px] font-bold py-[10px] px-[80px] bg-green-600 hover:bg-green-800 text-white rounded transition-colors mb-10"
        >
          Confirm booking
        </button>
      </div>
    </div>
  );
};

export default FinalSeatMapWithDynamicSections;

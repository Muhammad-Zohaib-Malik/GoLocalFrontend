import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const SeatMapModal = ({ open, handleClose, event }) => {
  const navigate = useNavigate();

  // Static data for testing
  const reservedSeats = event?.reservedSeats || []; // Reserved seats
  const vipPrice = event?.vipprice; // Price for VIP seats
  const economyPrice = event?.economyprice; // Price for Economy seats

  // Number of seats for each section
  const vipSeatsCount = event?.vipSize || 0; // Total VIP seats
  const economySeatsCount = event?.economySize || 0; // Total Economy seats

  // Generate seat labels for VIP and Economy sections
  const generateSeats = (prefix, count) => {
    let seats = [];
    for (let i = 1; i <= count; i++) {
      seats.push(`${prefix}${i}`);
    }
    return seats;
  };

  // Generate seat arrays
  const vipSeats = generateSeats("VIP", vipSeatsCount);
  const economySeats = generateSeats("E", economySeatsCount);

  const [selectedSeats, setSelectedSeats] = useState([]); // User-selected seats

  const handleSeatClick = (seatNumber) => {
    if (reservedSeats.includes(seatNumber)) return; // Prevent reserved seats from being selected
    if (selectedSeats.includes(seatNumber)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // Select seat
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const isVip = seat.startsWith("VIP"); // VIP seat condition
      return total + (isVip ? vipPrice : economyPrice);
    }, 0);
  };

  const renderSeats = (seats) => (
    <div className="flex flex-wrap justify-center w-fit mx-auto">
      {seats.map((seat) => {
        const isReserved = reservedSeats.includes(seat);
        const isSelected = selectedSeats.includes(seat);
        const isVip = seat.startsWith("VIP");

        let bgColor = "#3960ba"; // Default Economy
        if (isReserved) bgColor = "#b0b0b0";
        else if (isSelected) bgColor = "green";
        else if (isVip) bgColor = "#ff0e0e";

        return (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            disabled={isReserved}
            className={`w-[30px] h-[30px] text-white border border-black rounded-[3px] p-0 text-[1.3rem] font-bold leading-none m-0 ${isReserved ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:opacity-90"}`}
            style={{ backgroundColor: bgColor }}
          >
            {seat}
          </button>
        );
      })}
    </div>
  );

  const handleConfirmBooking = () => {
    const payload = {
      event_id: event?._id,
      eventName: event?.name,
      bookingDate: new Date().toISOString().split("T")[0],
      guestSize: selectedSeats.length,
      seatNumbers: selectedSeats,
      totalPrice: calculateTotalPrice(),
      currency: event?.currency,
    };
    navigate("/event/ordersummary", { state: { payload } });
  };

  if (!open) return null;

  return (
    <div className="bg-black fixed inset-0 z-1300 flex flex-col text-white">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://cdn.pixabay.com/photo/2016/07/30/02/31/red-1556341_960_720.jpg')`,
        }}
      ></div>

      <div className="relative z-10 flex flex-col h-full overflow-y-auto">
        {/* Back Icon */}
        <button
          onClick={handleClose}
          className="absolute top-[10px] left-[10px] bg-white text-black rounded-full flex items-center px-4 py-2 hover:bg-gray-200 transition-colors shadow-md"
        >
          <FaArrowLeft className="text-[24px] mr-2" />
          <span className="text-xl font-bold">Back</span>
        </button>

        <h2 className="text-center mt-[80px] md:mt-[40px] text-3xl font-bold">
          Book Your Ticket
        </h2>
        <p className="text-center mb-[20px] text-lg opacity-90">
          Select the seats to book your ticket
        </p>

        <div className="px-4 md:px-[100px] pb-[40px]">
          <h4 className="text-2xl text-center text-black bg-white p-2 rounded-xl mb-6">
            Seat Picker{" "}
            <span className="italic text-[15px] font-normal">
              (VIP Price: ${vipPrice} | Economy Price: ${economyPrice})
            </span>
          </h4>

          {/* VIP Section */}
          <h6 className="mt-[10px] mb-[10px] text-center font-bold text-[12px] uppercase tracking-wider">
            VIP Section
          </h6>
          {renderSeats(vipSeats)}

          {/* Economy Section */}
          <h6 className="mt-[20px] mb-[10px] text-center font-bold text-[12px] uppercase tracking-wider">
            Economy Section
          </h6>
          {renderSeats(economySeats)}

          <div className="max-w-2xl mx-auto mt-8 space-y-4">
            {/* Selected Seats */}
            <div className="p-[10px] bg-white/80 text-black rounded-md shadow-sm">
              <h6 className="font-semibold text-lg">Selected Seats</h6>
              <p className="mt-1">
                {selectedSeats.length > 0
                  ? selectedSeats.join(", ")
                  : "No seats selected"}
              </p>
            </div>

            {/* Total Price */}
            <div className="p-[10px] bg-white/80 text-black rounded-md shadow-sm">
              <h6 className="font-semibold text-lg">Total Price</h6>
              <p className="mt-1 font-medium">${calculateTotalPrice()}</p>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmBooking}
              disabled={selectedSeats.length === 0}
              className={`w-full py-3 rounded-full text-white font-bold text-lg mt-4 transition-colors ${selectedSeats.length === 0 ? "bg-gray-500 cursor-not-allowed" : " from-[#FFD700] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FFD700] text-black shadow-lg"}`}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMapModal;

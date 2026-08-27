import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";

const SeatMapPage = ({ event }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Static data for testing
  const reservedSeats = event?.reservedSeats || []; // Reserved seats
  const vipPrice = event?.vipprice; // Price for VIP seats
  const economyPrice = event?.economyprice; // Price for Economy seats

  // Number of seats for each section
  const vipSeatsCount = event?.vipSize || 0; // Total VIP seats
  const economySeatsCount = event?.economySize || 0; // Total Economy seats
  const seatsPerRow = 10; // Number of seats in a row

  const handleBack = () => {
    navigate(`/event-detail/${event?._id}`);
  };

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

  const totalPricee = calculateTotalPrice();

  const renderSeats = (seats) => (
    <div className="flex flex-wrap justify-center w-fit mx-auto gap-0">
      {seats.map((seat) => {
        const isReserved = reservedSeats.includes(seat);
        const isSelected = selectedSeats.includes(seat);
        const isVip = seat.startsWith("VIP");

        let bgColor = "#3960ba"; // Economy
        if (isReserved) bgColor = "#b0b0b0";
        else if (isSelected) bgColor = "green";
        else if (isVip) bgColor = "#ff0e0e";

        return (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            disabled={isReserved}
            style={{ backgroundColor: bgColor }}
            className={`w-[30px] h-[30px] text-white border border-black rounded-[3px] p-0 text-[1.3rem] font-bold leading-none m-0 ${isReserved ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {seat}
          </button>
        );
      })}
    </div>
  );

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      Swal.fire({
        icon: "warning",
        title: " No hay asientos seleccionados",
        text: "Seleccione los asientos antes de continuar con la reserva.",
        confirmButtonText: "DE ACUERDO",
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
      bookingDate: new Date().toISOString().split("T")[0],
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
      className="flex-1 flex bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://cdn.pixabay.com/photo/2016/07/30/02/31/red-1556341_960_720.jpg')`,
      }}
    >
      <div className="mt-8 pb-5 w-full">
        {/* Back Icon */}
        <button
          onClick={handleBack}
          className="flex items-center justify-start m-4 bg-white text-black rounded-full px-4 py-2 hover:bg-gray-200 transition-colors"
        >
          <FaArrowLeft className="text-[24px] mr-2" />
          <span className="text-xl font-bold">Back</span>
        </button>

        <h2 className="bg-black text-center mt-5 text-3xl font-bold text-white">
          Book Your Ticket
        </h2>
        <p className="bg-black text-center mb-5 text-lg text-white">
          Select the seats to book your ticket
        </p>

        <div className="flex justify-center mb-5 flex-wrap gap-4 px-4">
          <div className="flex items-center mr-5">
            <div className="w-5 h-5 bg-[#ff0e0e] rounded-full"></div>
            <span className="bg-black ml-2 text-white">
              VIP Seat {event?.currency ? `${event.currency} ` : "PKR "}{vipPrice}
            </span>
          </div>

          <div className="flex items-center">
            <div className="w-5 h-5 bg-[#3960ba] rounded-full"></div>
            <span className="bg-black ml-2 text-white">
              Economy Seat {event?.currency ? `${event.currency} ` : "PKR "}{economyPrice}
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center mb-5">
          <div className="py-6 px-[100px] bg-white rounded text-black font-bold text-lg">
            Stage
          </div>
        </div>

        <div className="px-4 md:px-[100px] max-w-5xl mx-auto">
          {/* VIP Section */}
          <h6 className="bg-black mt-[10px] mb-[10px] text-center font-bold text-[12px] uppercase text-white">
            VIP Section
          </h6>
          {renderSeats(vipSeats)}

          {/* Economy Section */}
          <h6 className="bg-black mt-5 mb-[10px] text-center font-bold text-[12px] uppercase text-white">
            Economy Section
          </h6>
          {renderSeats(economySeats)}

          {/* Selected Seats */}
          <div className="p-[10px] mt-[10px] bg-white/80 rounded">
            <h6 className="text-lg font-semibold text-black">Selected Seats</h6>
            <p className="text-black">
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "No seats selected"}
            </p>
          </div>

          <button
            onClick={handleConfirmBooking}
            className="w-full bg-[#4CAF50] hover:bg-[#3e8e41] text-white p-[15px] text-center text-[16px] font-bold rounded-[10px] cursor-pointer mt-[15px] transition-colors"
          >
            Confirm Booking - {event?.currency ? `${event.currency} ` : "PKR "}{calculateTotalPrice()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatMapPage;

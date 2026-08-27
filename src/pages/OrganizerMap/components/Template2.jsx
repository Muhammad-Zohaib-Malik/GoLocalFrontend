import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SeatMapModal = ({ event }) => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const renderSeats = (seats, styleClass, inlineStyle) => {
    return (
      <div className={`grid gap-[5px] ${styleClass || ""}`} style={inlineStyle}>
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
              className={`w-[20px] h-[20px] text-white border border-black rounded-full text-[10px] font-bold leading-none ${isReserved ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {seat}
            </button>
          );
        })}
      </div>
    );
  };

  const renderSeatsDynamicRows = (seats) => {
    let rows = [];
    let seatIndex = 0;

    for (let row = 3; seatIndex < seats.length; row++) {
      const seatsInRow = seats.slice(seatIndex, seatIndex + row);
      rows.push(
        <div
          key={`row-${row}`}
          className="flex justify-center gap-[5px] mb-[10px]"
        >
          {seatsInRow.map((seat) => {
            const isReserved = reservedSeats.includes(seat);
            const isSelected = selectedSeats.includes(seat);

            let bgColor = "#ff0e0e"; // VIP
            if (isReserved) bgColor = "#b0b0b0";
            else if (isSelected) bgColor = "green";

            return (
              <button
                key={seat}
                onClick={() => handleSeatClick(seat)}
                disabled={isReserved}
                style={{ backgroundColor: bgColor }}
                className={`w-[20px] h-[20px] text-white border border-black rounded-full text-[10px] font-bold leading-none ${isReserved ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {seat}
              </button>
            );
          })}
        </div>,
      );
      seatIndex += row;
    }

    return rows;
  };

  const renderSeatsDynamicRowsForEconomy = (seats, vipRows, seatsPerRow) => {
    let rows = [];
    let seatIndex = 0;

    for (let row = 1; seatIndex < seats.length; row++) {
      const isVipRow = row <= vipRows; // Determine if the row should be VIP
      const seatsInRow = seats.slice(seatIndex, seatIndex + seatsPerRow);
      rows.push(
        <div
          key={`row-${row}`}
          className="flex justify-center gap-[5px] mb-[10px]"
        >
          {seatsInRow.map((seat) => {
            const isReserved = reservedSeats.includes(seat);
            const isSelected = selectedSeats.includes(seat);

            let bgColor = isVipRow ? "#ff0e0e" : "#3960ba";
            if (isReserved) bgColor = "#b0b0b0";
            else if (isSelected) bgColor = "green";

            return (
              <button
                key={seat}
                onClick={() => handleSeatClick(seat)}
                disabled={isReserved}
                style={{ backgroundColor: bgColor }}
                className={`w-[20px] h-[20px] text-white border border-black rounded-full text-[10px] font-bold leading-none ${isReserved ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {seat}
              </button>
            );
          })}
        </div>,
      );
      seatIndex += seatsPerRow;
    }

    return rows;
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No hay asientos seleccionados",
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

  const handleBack = () => {
    navigate(`/event-detail/${event?._id}`);
  };

  return (
    <div
      className="min-h-screen py-[10px] px-[30px] bg-cover bg-center text-white flex flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://cdn.pixabay.com/photo/2016/07/30/02/31/red-1556341_960_720.jpg')`,
      }}
    >
      <div className="w-full">
        {/* Back Icon */}
        <button
          onClick={handleBack}
          className="flex items-center justify-start mt-10 mb-4 mx-2 bg-white text-black rounded-full px-4 py-2 hover:bg-gray-200 transition-colors w-max"
        >
          <FaArrowLeft className="text-[24px] mr-2" />
          <span className="text-xl font-bold">Back</span>
        </button>

        <h2 className="text-center mt-5 text-3xl font-bold">
          Book Your Ticket
        </h2>
        <p className="text-center mb-5 text-lg">
          Select the seats to book your ticket
        </p>

        {/* Color Legend Boxes */}
        <div className="flex justify-center mb-5 flex-wrap gap-4">
          <div className="flex items-center mr-5">
            <div className="w-5 h-5 bg-[#ff0e0e] rounded-full"></div>
            <span className="ml-2">VIP Seat {event?.currency ? `${event.currency} ` : "PKR "}{vipPrice}</span>
          </div>

          <div className="flex items-center">
            <div className="w-5 h-5 bg-[#3960ba] rounded-full"></div>
            <span className="ml-2">Economy Seat {event?.currency ? `${event.currency} ` : "PKR "}{economyPrice}</span>
          </div>
        </div>

        {/* Stage Box */}
        <div className="flex justify-center items-center mb-5">
          <div className="py-6 px-[100px] bg-white rounded-[5px] text-black font-bold text-[16px]">
            Stage
          </div>
        </div>

        <div className="py-[10px] px-4 md:px-[50px] flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0">
          {/* Left Section */}
          <div className="flex flex-col items-center">
            {renderSeats(
              economySeats.slice(0, Math.ceil(economySeats.length / 2)),
              "",
              {
                gridTemplateColumns: "repeat(5, 1fr)",
                gridTemplateRows: "repeat(10, 1fr)",
                justifyItems: "center",
                transform: "rotate(10deg)",
                marginRight: "50px",
              },
            )}
          </div>

          {/* VIP Section */}
          <div className="flex flex-col items-center md:-mt-[100px]">
            {renderSeatsDynamicRows(vipSeats)}
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center">
            {renderSeats(
              economySeats.slice(Math.ceil(economySeats.length / 2)),
              "",
              {
                gridTemplateColumns: "repeat(5, 1fr)",
                gridTemplateRows: "repeat(10, 1fr)",
                justifyItems: "center",
                transform: "rotate(-10deg)",
                marginLeft: "51px",
              },
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 mt-8">
          {/* Selected Seats */}
          <div className="p-[10px] mt-[10px] bg-white/80 rounded">
            <h6 className="text-lg font-semibold text-black">Selected Seats</h6>
            <p className="text-black">
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "No seats selected"}
            </p>
          </div>

          {/* Confirm Button */}
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

export default SeatMapModal;

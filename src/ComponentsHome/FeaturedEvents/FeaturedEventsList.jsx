import React, { useState, useRef } from "react";
import EventCard from "../EventCard/EventCard";
import axios from "axios";
import Swal from "sweetalert2";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FeaturedEventsList = ({ events, loading, setEvents }) => {
  const userRole = localStorage.getItem("role");
  const [selectedTab, setSelectedTab] = useState(0);

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState({});

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/events/getAllEvents`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        },
      );
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handlePublish = async (eventId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/events/publishedEvent`,
        { eventId },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        },
      );
      await fetchAllEvents();
    } catch (error) {
      console.error("Error publishing event:", error);
    }
  };

  const handleFeature = async (eventId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/events/featuredEvent`,
        { eventId },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        },
      );
      await fetchAllEvents(eventId);
    } catch (error) {
      console.error("Error featuring event:", error);
    }
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setUpdatedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleChange = (e) => {
    setUpdatedEvent({
      ...updatedEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateEvent = async () => {
    const payload = {
      name: updatedEvent?.name,
    };
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/events/updateEvent?id=${selectedEvent._id}`,
        payload,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        },
      );
      await fetchAllEvents();
      handleClose();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async (eventId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/events/deleteEvent?id=${eventId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          },
        );

        Swal.fire({
          title: "Eliminated!",
          text: "The event has been successfully deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        await fetchAllEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while deleting the event.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  const filteredEvents =
    events?.length > 0
      ? events.filter((event) => {
          if (userRole === "user") {
            return event.published;
          }

          switch (selectedTab) {
            case 1:
              return event.published;
            case 2:
              return !event.published;
            case 3:
              return event.featured;
            default:
              return true;
          }
        })
      : [];

  const containerRef = useRef();
  const marqueeRef = useRef();
  const tweenRef = useRef();

  useGSAP(
    () => {
      if (filteredEvents.length >= 4) {
        tweenRef.current = gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: Math.max(15, filteredEvents.length * 5),
          ease: "linear",
        });
      } else if (tweenRef.current) {
        tweenRef.current.kill();
      }
    },
    { scope: containerRef, dependencies: [filteredEvents.length] },
  );

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.play();

  return (
    <div className="mt-10 relative">
      {(userRole === "admin" || userRole === "organizer") && (
        <div className="flex justify-center border-b border-gray-300 mb-6">
          <button
            onClick={() => setSelectedTab(0)}
            className={`px-4 py-3 text-lg lg:text-xl lg:font-bold transition-colors ${
              selectedTab === 0
                ? "border-b-2 border-[#3795d6] text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedTab(1)}
            className={`px-4 py-3 text-lg lg:text-xl lg:font-bold transition-colors ${
              selectedTab === 1
                ? "border-b-2 border-[#3795d6] text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setSelectedTab(2)}
            className={`px-4 py-3 text-lg lg:text-xl lg:font-bold transition-colors ${
              selectedTab === 2
                ? "border-b-2 border-[#3795d6] text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Pending
          </button>
          {userRole === "admin" && (
            <button
              onClick={() => setSelectedTab(3)}
              className={`px-4 py-3 text-lg lg:text-xl lg:font-bold transition-colors ${
                selectedTab === 3
                  ? "border-b-2 border-[#3795d6] text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Featured
            </button>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        className="w-full overflow-hidden my-12 py-4 -mx-4 px-4"
      >
        {filteredEvents.length > 0 ? (
          <div
            ref={marqueeRef}
            className={`flex gap-6 ${filteredEvents.length >= 4 ? "w-max" : "w-full flex-wrap justify-center md:justify-start"}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* If very few events, display them normally. Otherwise duplicate to fill screen for marquee */}
            {(filteredEvents.length >= 4
              ? [...filteredEvents, ...filteredEvents]
              : filteredEvents
            ).map((event, index) => (
              <div
                key={`${event._id}-${index}`}
                className="w-[350px] h-auto flex-shrink-0 flex"
              >
                <div className="w-full h-full">
                  <EventCard
                    event={event}
                    onPublish={() => handlePublish(event._id)}
                    onFeature={() => handleFeature(event._id)}
                    onUpdate={() => handleOpenModal(event)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full text-center mt-5 text-gray-500">
            <p>No events found.</p>
          </div>
        )}
      </div>

      {/* Update Event Modal */}
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[80vh] flex flex-col relative mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Event</h2>

            <div className="overflow-y-auto max-h-[50vh] pr-2 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={updatedEvent.name || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3795d6]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  value={updatedEvent.venue || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3795d6]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={updatedEvent.address || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3795d6]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Description
                </label>
                <textarea
                  name="desc"
                  value={updatedEvent.desc || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3795d6]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  VIP Price
                </label>
                <input
                  type="number"
                  name="vipprice"
                  value={updatedEvent.vipprice || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3795d6]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  VIP Size
                </label>
                <input
                  type="number"
                  name="vipSize"
                  value={updatedEvent.vipSize || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3795d6]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Economy Size
                </label>
                <input
                  type="number"
                  name="economySize"
                  value={updatedEvent.economySize || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3795d6]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Economy Price
                </label>
                <input
                  type="number"
                  name="economyprice"
                  value={updatedEvent.economyprice || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3795d6]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Divisa
                </label>
                <select
                  name="currency"
                  value={updatedEvent.currency || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3795d6]"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="PKR">PKR</option>
                </select>
              </div>

              <h3 className="text-lg font-semibold mt-4 text-gray-800">
                Date and time of the event
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold mb-1 text-gray-700">
                    Day 1
                  </label>
                  <input
                    type="datetime-local"
                    name="eventDate"
                    value={updatedEvent.eventDate || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3795d6]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold mb-1 text-gray-700">
                    Day 2
                  </label>
                  <input
                    type="datetime-local"
                    name="eventDate2"
                    value={updatedEvent.eventDate2 || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3795d6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mt-4 mb-2 text-gray-800">
                  Category
                </label>
                <select
                  name="category"
                  value={updatedEvent.category || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3795d6]"
                >
                  <option value="Música">Music</option>
                  <option value="Deportes">Sports</option>
                  <option value="Conferencia">Conferences</option>
                  <option value="Taller">Technology</option>
                  <option value="Teatro">Theater</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-lg font-semibold mb-2 text-gray-800">
                  Ticket payment method
                </label>
                <div className="flex gap-6 items-center mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Online"
                      checked={updatedEvent.paymentMethod === "Online"}
                      onChange={handleChange}
                      className="w-5 h-5 accent-[#3795d6]"
                    />
                    <span className="text-lg">Online payment</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Walk-in"
                      checked={updatedEvent.paymentMethod === "Walk-in"}
                      onChange={handleChange}
                      className="w-5 h-5 accent-[#3795d6]"
                    />
                    <span className="text-lg">Walk in</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-5 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateEvent}
                className="px-5 py-2 bg-[#3795d6] text-white hover:bg-[#287bb5] rounded font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedEventsList;

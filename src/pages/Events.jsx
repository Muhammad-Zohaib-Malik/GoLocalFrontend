import React, { useState, useEffect } from "react";
import SearchBar from "../ComponentsHome/SearchBarEvents/SearchBar";
import FeaturedEventsList from "../ComponentsHome/FeaturedEvents/FeaturedEventsList";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const userRole = localStorage.getItem("role");

      // Determine the appropriate URL based on the user role
      const url =
        userRole === "organizer"
          ? `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/events/getuserEvent`
          : `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/events/getAllEvents`;
      try {
        const response = await axios.get(url, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setEvents(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  return (
    <div>
      <div className="relative w-full h-[450px] lg:h-[500px] overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dqcimdgce/video/upload/v1734672993/events/2nd_video_evs_waqas_xzvrfw.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark Overlay for better contrast and header readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
      </div>

      {/* Search Bar - Overlapping */}
      <div className="relative z-20 w-full max-w-[1300px] mx-auto px-4 -mt-24 lg:-mt-28">
        <SearchBar setEvents={setEvents} />
      </div>

      {/* Add Margin to Push the FeaturedEventsList Section Down */}
      <div className="mt-16 w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingScreen />
        ) : (
          <FeaturedEventsList events={events} setEvents={setEvents} />
        )}
      </div>
    </div>
  );
};

export default Events;

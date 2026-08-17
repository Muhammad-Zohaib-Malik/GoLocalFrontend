import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../ComponentsHome/SearchBarEvents/SearchBar";
import FeaturedEventsList from "../ComponentsHome/FeaturedEvents/FeaturedEventsList";
import axiosClient from "../api/axiosClient";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { UserContext } from "../UserContext";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useContext(UserContext);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAllEvents = async () => {
      if (isLoading) return;
      const userRole = user?.role;

      // Determine the appropriate URL based on the user role
      const url =
        userRole === "organizer"
          ? `/events/getuserEvent`
          : `/events/getAllEvents`;
      try {
        const response = await axiosClient.get(url);
        setEvents(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, [user?.role, isLoading]);

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

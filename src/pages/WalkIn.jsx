import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import EventCard from "../ComponentsHome/EventCard/EventCard";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const WalkIn = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await axiosClient.get("/events/walk-in");
        setEvents(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingScreen />
      </div>
    );
  }

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

        {/* Title overlay */}
        <div className="relative z-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Walk-in Events
          </h1>
        </div>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-4 sm:mx-16 mb-12">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event._id}>
                <EventCard event={event} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center mt-5 text-gray-500">
              <p>No walk-in events found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalkIn;

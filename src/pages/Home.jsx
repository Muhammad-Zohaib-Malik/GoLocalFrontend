import React, { useEffect, useState, useContext } from "react";
import HeroSection from "../ComponentsHome/HeroSection/HeroSection.jsx";
import HighlightSection from "../ComponentsHome/HighlightSection/HighlightSection.jsx";
import Subtitle from "../ComponentsHome/Subtitle/Subtitle.jsx";
import EventTypes from "../ComponentsHome/EventTypes/EventTypes.jsx";
import Services from "../ComponentsHome/Services/Services.jsx";
// import FeaturedEventsList from '../ComponentsHome/FeaturedEvents/FeaturedEventsList.jsx'
import Experience from "../ComponentsHome/Experience/Experience.jsx";
import Testimonials from "../ComponentsHome/Testimonials/Testimonials.jsx";

import EventCategories from "../ComponentsHome/EventsCategories/EventCategories.jsx";
import axiosClient from "../api/axiosClient";
import FeaturedEventsList from "../ComponentsHome/FeaturedEvents/FeaturedEventsList.jsx";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen.jsx";
import { UserContext } from "../UserContext";
const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useContext(UserContext);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // GSAP Scroll Animations
  import("gsap").then((gsapModule) => {
    const gsap = gsapModule.default;
    import("@gsap/react").then((gsapReactModule) => {
      const { useGSAP } = gsapReactModule;
      import("gsap/ScrollTrigger").then((ScrollTriggerModule) => {
        const { ScrollTrigger } = ScrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);

        // Setup GSAP reveals globally for class 'gsap-reveal'
        setTimeout(() => {
          const elements = document.querySelectorAll(".gsap-reveal");
          elements.forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });
        }, 1000); // Wait for DOM to render
      });
    });
  });

  useEffect(() => {
    const fetchAllEvents = async () => {
      if (isLoading) return; // Wait until we know the user's role
      const userRole = user?.role;

      // if (!token) {
      // console.error("No token found, please login.");
      // setLoading(false);
      // return;
      // }

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

  // Render loader or main content
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingScreen />
      </div>
    );
  }
  return (
    <>
      {/* <Header/> */}
      {/* ----------------------------------- VideoSlider section ---------------------------------------- */}

      {(user?.role == "user" || !user?.role) && (
        <div className="w-full flex flex-col gap-12 pb-16">
          <HeroSection />
          <HighlightSection />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-16">
            <section className="gsap-reveal">
              <Subtitle title={"Events we organize"} />
              <EventTypes />
            </section>

            <section className="gsap-reveal">
              <EventCategories />
            </section>

            <section className="gsap-reveal">
              <Subtitle title={"Why choose us?"} />
              <Services />
            </section>
          </div>
        </div>
      )}
      {/* ------------------x---------------- Services section --------------x---------------------------- */}
      {/* ----------------------------------- Featured-Events section ------------------------------------ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
        <div className={`gsap-reveal mt-16`}>
          <Subtitle title={"Featured events"} />
          <FeaturedEventsList
            events={events}
            loading={loading}
            setEvents={setEvents}
          />
        </div>

        {/* ------------------x---------------- Featured-Events section --------------x--------------------- */}
        {/* -------------------------------------- Experience section -------------------------------------- */}
        {!user && (
          <div className="mt-24 gsap-reveal">
            <Experience />
          </div>
        )}
        {/* ------------------x------------------- Experience section ----------------x--------------------- */}
        {/* -------------------------------------- Testimonials section ------------------------------------- */}
        {!user && (
          <div className="mt-24 mb-24">
            <Subtitle title={"Testimonials"} />
            <Testimonials />
          </div>
        )}
        {/* ---------------------x---------------- Testimonials section ---------------x--------------------- */}
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Home;

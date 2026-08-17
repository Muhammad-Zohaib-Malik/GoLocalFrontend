import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HighlightSection = () => {
  const containerRef = useRef();
  const textRef = useRef();
  const marqueeRef = useRef();

  useGSAP(
    () => {
      // Parallax text reveal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );

      // Infinite Marquee
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    },
    { scope: containerRef },
  );

  const marqueeItems = [
    "LIVE CONCERTS",
    "TECH CONFERENCES",
    "ART EXHIBITIONS",
    "FOOD FESTIVALS",
    "SPORTS EVENTS",
    "THEATER PLAYS",
    "NETWORKING",
    "WORKSHOPS",
  ];

  return (
    <div
      ref={containerRef}
      className="w-full bg-white py-16 md:py-24 overflow-hidden flex flex-col items-center border-y border-gray-100"
    >
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <h2
          ref={textRef}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight"
        >
          Elevating{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
            Local Experiences
          </span>
        </h2>
        <p className="mt-6 text-gray-500 text-lg md:text-xl font-medium">
          Discover hand-picked events tailored to your interests and connect
          with your community like never before.
        </p>
      </div>

      <div className="w-full bg-red-50 py-6 mt-8 transform -rotate-2 scale-110 flex overflow-hidden shadow-sm border-y border-red-100">
        <div
          ref={marqueeRef}
          className="bg-red-50 flex gap-8 whitespace-nowrap font-black text-2xl md:text-4xl tracking-widest uppercase"
        >
          {/* Double the items to ensure seamless infinite scroll */}
          {[
            ...marqueeItems,
            ...marqueeItems,
            ...marqueeItems,
            ...marqueeItems,
          ].map((item, i) => (
            <React.Fragment key={i}>
              <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
                {item}
              </span>
              <span className="text-red-200">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightSection;

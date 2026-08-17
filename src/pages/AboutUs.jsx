import React, { useEffect } from "react";
import { FaCheckCircle, FaGlobe, FaUsers, FaTrophy } from "react-icons/fa";
import heroBg from "../assets/generated_hero_bg.png";
import eventt from "../assets/eventt.png";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] min-h-[550px] flex items-center justify-center overflow-hidden border-b border-neutral-900">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={heroBg}
            alt="About Go Local"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl py-16">
          <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight whitespace-nowrap">
            Connecting People Through <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
              Unforgettable Experiences
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto">
            We are more than just an event platform. We are the bridge between
            incredible moments and the people who want to live them.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="w-full bg-white py-20 px-4 md:px-[5%]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Trusted Partner in{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
                Event Excellence
              </span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              With a passion for innovation and a commitment to excellence, Go
              Local specializes in bringing communities together. We manage and
              elevate all types of events—from corporate conferences and grand
              exhibitions to intimate weddings and special celebrations.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our dedicated team of professionals works behind the scenes to
              transform your boldest visions into seamless realities, building
              lasting relationships and making every single occasion truly
              unforgettable.
            </p>
            <div className="flex flex-col gap-4">
              {[
                "Innovation in every detail",
                "Commitment to community",
                "Flawless end-to-end execution",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <FaCheckCircle className="text-red-500 text-xl" />
                  <span className="text-gray-800 font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-yellow-400/30 to-red-500/30 transform translate-x-4 translate-y-4 opacity-50 blur-xl"></div>
            <img
              src={eventt}
              alt="People celebrating"
              className="relative z-10 w-full h-[500px] object-cover rounded-3xl shadow-2xl border border-gray-100"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-gray-50 text-center relative overflow-hidden border-t border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to create something amazing?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of others who trust Go Local to bring their events to
            life.
          </p>
          <a
            href="/events"
            className="bg-gradient-to-r from-yellow-400 to-red-500 inline-block text-white font-bold px-10 py-4 rounded-full text-lg shadow-[0_10px_30px_rgba(244,63,94,0.3)] hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            Explore Events Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

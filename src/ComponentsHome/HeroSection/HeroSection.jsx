import { Link } from "react-router-dom";
import heroBg from "../../assets/i_want_dancing_video_too.mp4";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-black py-16 lg:py-24">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <video
          src={heroBg}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent h-48"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 text-center flex flex-col items-center mt-16 md:mt-0">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          Discover experiences worldwide
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 max-w-4xl">
          Find Your Next <br />
          <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
            Unforgettable Experience
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl font-light">
          Join millions of people discovering the best events, concerts, and
          festivals happening around you.
        </p>

        {/* Call to Action Button */}
        <div className="w-full flex justify-center mt-4">
          <Link
            to="/events"
            className="bg-black group relative inline-flex items-center justify-center gap-3 text-white font-bold text-lg px-10 py-5 rounded-full shadow-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 "></span>
            <span className="relative z-10 flex items-center gap-2">
              Explore All Events
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

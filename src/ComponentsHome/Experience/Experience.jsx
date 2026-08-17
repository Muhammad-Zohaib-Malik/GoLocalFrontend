import React from "react";

const Experience = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl mt-12 mb-12 bg-neutral-950 text-white px-8 py-16 md:py-20 shadow-2xl border border-neutral-800">
      <div className="absolute inset-0 opacity-90"></div>

      {/* Abstract gradient accent blobs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-around text-center gap-12">
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
            12k+
          </span>
          <h6 className="text-lg font-medium text-gray-300 mt-4 uppercase tracking-wider">
            Successful Events
          </h6>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-24 bg-neutral-800"></div>

        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
            2k+
          </span>
          <h6 className="text-lg font-medium text-gray-300 mt-4 uppercase tracking-wider">
            Regular Clients
          </h6>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-24 bg-neutral-800"></div>

        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
            15
          </span>
          <h6 className="text-lg font-medium text-gray-300 mt-4 uppercase tracking-wider">
            Years Experience
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Experience;

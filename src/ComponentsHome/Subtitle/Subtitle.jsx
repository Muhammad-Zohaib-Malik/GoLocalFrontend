import React from "react";

const Subtitle = ({ title }) => {
  return (
    <div className="w-full mb-12 mt-20 flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center relative bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text pb-2">
        {title}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"></div>
      </h2>
    </div>
  );
};

export default Subtitle;

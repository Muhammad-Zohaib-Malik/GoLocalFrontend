import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ review, imgSrc, name, title }) => {
  return (
    <div className="px-4 pb-8 h-full">
      <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-300 h-full flex flex-col relative">
        <FaQuoteLeft className="text-3xl text-gray-200 absolute top-6 right-6" />
        <p className="text-gray-600 leading-relaxed italic flex-grow min-h-[100px] z-10">
          "{review}"
        </p>

        <div className="flex items-center mt-6 pt-6 border-t border-gray-50">
          <img
            src={imgSrc}
            className="w-14 h-14 rounded-full object-cover shadow-sm"
            alt={name}
          />
          <div className="ml-4">
            <h6 className="text-lg font-bold text-gray-900">{name}</h6>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

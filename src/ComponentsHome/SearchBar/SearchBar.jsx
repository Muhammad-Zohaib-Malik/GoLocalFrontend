import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/events");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-8 md:mt-12 relative z-20">
      <div
        onClick={handleNavigate}
        className="bg-white/95 backdrop-blur-md shadow-2xl rounded-full p-2 md:p-3 flex flex-col md:flex-row items-center cursor-pointer transition-transform hover:scale-[1.01] duration-300 border border-gray-100"
      >
        <div className="flex-1 flex flex-col md:flex-row w-full divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="flex-1 px-6 py-3 flex flex-col justify-center">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
              Looking for
            </span>
            <input
              type="text"
              placeholder="Events, artists, venues..."
              className="w-full bg-transparent border-none outline-none text-gray-600 placeholder-gray-400 font-medium text-sm md:text-base pointer-events-none"
              readOnly
            />
          </div>

          <div className="flex-1 px-6 py-3 flex flex-col justify-center">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
              Where
            </span>
            <input
              type="text"
              placeholder="City or neighborhood"
              className="w-full bg-transparent border-none outline-none text-gray-600 placeholder-gray-400 font-medium text-sm md:text-base pointer-events-none"
              readOnly
            />
          </div>
        </div>

        <button className="mt-4 md:mt-0 w-full md:w-auto bg-black text-white hover:bg-gray-800 rounded-full px-8 py-4 flex items-center justify-center gap-3 font-semibold transition-colors shrink-0">
          <FaSearch className="text-lg" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

import React, { useRef, useState } from "react";
import axios from "axios";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ setEvents }) => {
  const [eventSuggestions, setEventSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const nameRef = useRef("");
  const areaRef = useRef("");
  const timeRef = useRef("");
  const startDateRef = useRef("");
  const endDateRef = useRef("");

  const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/events/getAllEvents`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        },
      );
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error fetching all events:", error);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setNameInput(value);

    if (!value) {
      setEventSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/events/search/getEventBySearch?name=${value}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        },
      );
      const suggestions = response.data.data.map((event) => event.name);
      setEventSuggestions([...new Set(suggestions)]);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching event suggestions:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setNameInput(suggestion);
    setShowSuggestions(false);
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    const name = nameInput;
    const area = areaRef.current.value;
    const eventTime = timeRef.current.value;
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;

    const queryParams = new URLSearchParams();
    if (name) queryParams.append("name", name);
    if (area) queryParams.append("area", area);
    if (eventTime) queryParams.append("eventTime", eventTime);
    if (startDate)
      queryParams.append(
        "startDate",
        new Date(startDate).toISOString().split("T")[0],
      );
    if (endDate)
      queryParams.append(
        "endDate",
        new Date(endDate).toISOString().split("T")[0],
      );

    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/events/search/getEventBySearch?${queryParams.toString()}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        },
      );
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error searching events:", error);
    }
  };

  const clearFilters = () => {
    setNameInput("");
    areaRef.current.value = "";
    timeRef.current.value = "";
    startDateRef.current.value = "";
    endDateRef.current.value = "";
    setEventSuggestions([]);
    setShowSuggestions(false);
    fetchAllEvents();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-12 mb-8 relative z-20">
      <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-6 md:p-8 border border-gray-100">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Find Events</h3>
            <p className="text-gray-500 text-sm mt-1">
              Search by name, location, or select a date range.
            </p>
          </div>
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm font-semibold text-black hover:text-black transition-colors mt-4 md:mt-0 px-4 py-2 rounded-full hover:bg-rose-50"
          >
            <FaTimes />
            Clear Filters
          </button>
        </div>

        <form
          onSubmit={searchHandler}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end"
        >
          {/* Event Name */}
          <div className="relative lg:col-span-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
              Event Name
            </label>
            <input
              type="text"
              placeholder="Enter event name"
              value={nameInput}
              onChange={handleInputChange}
              onFocus={() =>
                nameInput &&
                eventSuggestions.length > 0 &&
                setShowSuggestions(true)
              }
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all shadow-sm"
            />
            {showSuggestions && eventSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-100 mt-2 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] max-h-48 overflow-y-auto">
                {eventSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-5 py-3 hover:bg-rose-50 hover:text-black cursor-pointer font-medium text-gray-700 transition-colors border-b border-gray-50 last:border-0"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Place */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
              Place
            </label>
            <input
              type="text"
              placeholder="City or area"
              ref={areaRef}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all shadow-sm"
            />
          </div>

          {/* Start Date */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
              Start Date
            </label>
            <input
              type="date"
              ref={startDateRef}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all shadow-sm"
            />
          </div>

          {/* End Date */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
              End Date
            </label>
            <input
              type="date"
              ref={endDateRef}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all shadow-sm"
            />
          </div>

          {/* Search Button */}
          <div className="lg:col-span-1">
            <button
              type="submit"
              className="bg-black w-full h-[52px] flex items-center justify-center gap-2 hover: hover: text-white font-bold rounded-xl px-6 transition-all shadow-md hover:shadow-md active:scale-95"
            >
              <FaSearch />
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;

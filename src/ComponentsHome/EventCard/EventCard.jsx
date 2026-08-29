import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiStarFill, RiMapPinLine } from "react-icons/ri";
import { FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { UserContext } from "../../UserContext";

const EventCard = ({ event, onPublish, onFeature, onDelete, onUpdate }) => {
  const {
    _id,
    name,
    venue,
    address,
    photo,
    currency,
    category,
    vipprice,
    economyprice,
    featured,
    published,
    owner,
    ticket,
  } = event;

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userRole = user?.role;


  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-300 flex flex-col h-full group hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 md:h-52 overflow-hidden w-full shrink-0">
        <img
          src={
            photo ||
            "https://images.unsplash.com/pho?q=80&w=2070&auto=format&fit=crop"
          }
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 opacity-80"></div>

        {/* Badges Container */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          {ticket === "Walk-in" && (
            <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold text-xs px-3 py-1 rounded-full shadow-lg">
              Walk-in
            </span>
          )}
          {featured && (
            <span className="bg-black/90 backdrop-blur-md text-white font-semibold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <RiStarFill /> Featured
            </span>
          )}
          {!published && userRole !== "user" && (
            <span className="bg-amber-400/90 backdrop-blur-md text-amber-950 font-bold text-xs px-3 py-1 rounded-full shadow-lg">
              Pending
            </span>
          )}
        </div>

        {/* Floating Category */}
        {category && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-black/50 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/10">
              <BiCategory /> {category}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h5 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-black transition-colors duration-300">
          <Link to={`/events/${_id}`}>{name}</Link>
        </h5>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
          <RiMapPinLine className="text-black mt-1 shrink-0 text-base" />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{venue}</span>
            <span className="text-xs text-gray-500 line-clamp-1">
              {address}
            </span>
          </div>
        </div>

        <div className="flex-grow"></div>

        {/* Divider */}
        <hr className="border-gray-100 my-4" />

        {/* Status / Organizer (Admin view) */}
        {userRole !== "user" && (
          <div className="flex justify-between items-center text-xs text-gray-500 mb-3 bg-gray-50 p-2 rounded-lg">
            {published ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <FaCheckCircle /> Published
              </span>
            ) : (
              <span></span>
            )}
            {userRole === "admin" && (
              <span className="font-medium">Org: {owner?.username}</span>
            )}
          </div>
        )}

        {/* Bottom Section: Price and CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">
              From
            </span>
            <span className="text-lg font-extrabold text-gray-900">
              {economyprice} {currency}
            </span>
          </div>

          <button
            className="bg-gray-900 text-white hover:bg-black px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-md active:scale-95"
            onClick={() => {
              navigate(`/event-detail/${_id}`);
              setTimeout(() => {
                window.location.reload();
              }, 0);
            }}
          >
            {userRole === "user" ? "Get Tickets" : "View Details"}
          </button>
        </div>

        {/* Admin Action Buttons */}
        {(userRole === "admin" || userRole === "organizer") && (
          <div className="mt-4 pt-3 border-t border-gray-100 flex gap-3 text-sm">
            {!published && (
              <button
                onClick={onPublish}
                className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-1.5 rounded-lg font-semibold transition-colors"
              >
                Publish
              </button>
            )}
            {published && !featured && (
              <button
                onClick={onFeature}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-1.5 rounded-lg font-semibold transition-colors"
              >
                Feature
              </button>
            )}
            <button
              onClick={onUpdate}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-1.5 rounded-lg font-semibold transition-colors"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;

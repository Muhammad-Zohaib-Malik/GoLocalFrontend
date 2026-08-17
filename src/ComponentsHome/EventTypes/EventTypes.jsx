import React from "react";
import {
  GiLinkedRings,
  GiPartyFlags,
  GiBookCover,
  GiNetworkBars,
} from "react-icons/gi";

const iconsdata = [
  {
    icon: GiPartyFlags,
    title: "Entertainment",
  },
  {
    icon: GiLinkedRings,
    title: "Social",
  },
  {
    icon: GiBookCover,
    title: "Educational",
  },
  {
    icon: GiNetworkBars,
    title: "Conferences",
  },
];

const EventTypes = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
      {iconsdata.map((item, index) => (
        <div
          className="flex flex-col items-center justify-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-gray-100 transition-all duration-500 group cursor-pointer"
          key={index}
        >
          <div className="w-24 h-24 flex items-center justify-center bg-gray-50 text-gray-400 rounded-full mb-6 group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-500">
            <item.icon className="text-5xl" />
          </div>
          <h2 className="text-gray-900 text-center font-bold text-xl">
            {item.title}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default EventTypes;

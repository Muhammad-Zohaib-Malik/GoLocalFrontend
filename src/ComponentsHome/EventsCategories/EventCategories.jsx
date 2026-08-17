import React from "react";
import { MdEvent, MdLocationOn, MdEventAvailable } from "react-icons/md";

const ImageContentSection = () => {
  const cards = [
    {
      icon: <MdEvent className="bg-black text-3xl text-white" />,
      title: "On-site event",
      description: "Expertly managed events at your chosen location.",
    },
    {
      icon: <MdLocationOn className="bg-black text-3xl text-white" />,
      title: "Site management",
      description: "Comprehensive venue sourcing and management.",
    },
    {
      icon: <MdEventAvailable className="bg-black text-3xl text-white" />,
      title: "Event Coordination",
      description: "End- planning for a flawless experience.",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col items-start bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-gray-100"
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-900 group-hover:bg-black flex items-center justify-center mb-6 transition-colors duration-300 shadow-md">
              {card.icon}
            </div>
            <h6 className="font-bold text-2xl text-gray-900 mb-3">
              {card.title}
            </h6>
            <p className="text-gray-500 text-lg leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageContentSection;

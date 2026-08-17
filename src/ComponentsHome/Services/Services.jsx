import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";

const servicesData = [
  { title: "Expert and talented team" },
  { title: "Experience in diverse events" },
  { title: "Affordable options" },
  { title: "Extensive network of suppliers" },
  { title: "Stress-free planning" },
  { title: "Personalized service" },
  { title: "Unforgettable experiences" },
];

const Services = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-16 w-full items-center mt-8">
      {/* Image Grid */}
      <div className="flex-1 grid grid-cols-2 gap-4 au[14rem] lg:au[18rem] w-full">
        <img
          className="col-span-2 row-span-2 object-cover w-full h-full rounded-3xl shadow-lg hover:scale-[1.02] transition-transform duration-500"
          src="https://cdn.pixabay.com/photo/2019/04/13/22/50/concert-4125832_1280.jpg"
          alt="Expert Team"
        />
        <img
          className="object-cover w-full h-full rounded-3xl shadow-lg hover:scale-[1.02] transition-transform duration-500"
          src="https://cdn.pixabay.com/photo/2019/05/17/07/43/cinema-4209087_960_720.jpg"
          alt="Event Expertise"
        />
        <img
          className="object-cover w-full h-full rounded-3xl shadow-lg hover:scale-[1.02] transition-transform duration-500"
          src="https://cdn.pixabay.com/photo/2016/12/28/20/30/wedding-1937022_1280.jpg"
          alt="Budget-Friendly"
        />
      </div>

      {/* Features List */}
      <div className="flex-1 flex flex-col justify-center lg:pl-8">
        <div className="space-y-6">
          {servicesData.map((item, index) => (
            <div className="flex items-center gap-6 group" key={index}>
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-rose-50 text-black group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                <BsCheckCircleFill className="text-xl" />
              </div>
              <div className="text-xl md:text-2xl font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

import React, { useEffect, useState } from "react";
import Slide from "./Slide.jsx";
import videosData from "../../assetsHome/data/videosData.js";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const VideoSlider = () => {
  const [slideNo, setSlideNo] = useState(0);

  const nextSlide = () => {
    setSlideNo((prevSlide) => {
      return (prevSlide + 1) % videosData.length;
    });
  };

  const prevSlide = () => {
    setSlideNo((prevSlide) => {
      return prevSlide === 0 ? videosData.length - 1 : prevSlide - 1;
    });
  };

  useEffect(() => {
    setSlideNo(0);
  }, []);

  return (
    <section className="relative h-[83vh]">
      {videosData.map((item, index) => (
        <Slide
          key={index}
          title={item.title}
          description={item.description}
          videoSrc={item.videoSrc}
          active={index === slideNo}
        />
      ))}

      <div
        onClick={nextSlide}
        className="bg-black absolute top-[40%] right-0 z-[100] text-white h-[50px] w-[50px] cursor-pointer flex items-center justify-center"
      >
        <RiArrowRightSLine className="text-[4rem] bg-black/20" />
      </div>
      <div
        onClick={prevSlide}
        className="bg-black absolute top-[40%] left-6 z-[100] text-white h-[50px] w-[50px] cursor-pointer flex items-center justify-center"
      >
        <RiArrowLeftSLine className="text-[4rem] bg-black/20" />
      </div>
    </section>
  );
};

export default VideoSlider;

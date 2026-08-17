import ReactSlick from "react-slick";
const Slider = ReactSlick.default || ReactSlick;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TestimonialCard from "./TestimonialCard";
import testimonialData from "../../assetsHome/data/testimonials.js";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    slidesToShow: 3,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="my-12 w-full mx-auto max-w-7xl">
      <div className="px-4">
        <Slider {...settings}>
          {testimonialData.map((item, index) => (
            <div key={index} className="px-2 h-[280px]">
              <TestimonialCard
                review={item.review}
                imgSrc={item.imgSrc}
                name={item.name}
                title={item.title}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;

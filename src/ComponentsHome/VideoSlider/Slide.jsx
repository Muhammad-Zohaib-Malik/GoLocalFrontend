import { useNavigate } from "react-router-dom";

const Slide = ({ title, description, videoSrc, active }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/events");
  };

  return (
    <div
      className={`relative h-[83vh] w-full overflow-hidden ${active ? "block" : "hidden"}`}
    >
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 md:px-[14rem]">
        <h3 className="bg-black text-4xl sm:text-5xl md:text-[5rem] text-white font-semibold drop-shadow-lg mb-4 leading-tight">
          {title}
        </h3>
        <p className="bg-black text-xl sm:text-2xl text-white font-medium drop-shadow-lg mb-8">
          {description}
        </p>
      </div>
      <video
        src={videoSrc}
        muted
        autoPlay
        loop
        className="absolute inset-0 w-full h-full opacity-75 object-cover bg-black"
      ></video>
    </div>
  );
};

export default Slide;

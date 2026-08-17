import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const plans = [
  {
    title: "Basic",
    features: [
      "Event posting",
      "Seating options",
      "Banner image",
      "Ticket with QR code",
    ],
    price: "$300",
    description: "Perfect for small events and meetups.",
    buttonText: "Get Basic",
    isPopular: false,
  },
  {
    title: "Standard",
    features: [
      "Multiple events",
      "2 seating maps",
      "Featured requests (4x)",
      "Photo gallery",
      "Ticket with QR code",
    ],
    price: "$500",
    description: "Ideal for growing communities and organizers.",
    buttonText: "Get Standard",
    isPopular: true,
  },
  {
    title: "Premium",
    features: [
      "Event posting",
      "Featured requests",
      "Photo gallery",
      "Themed seating assignments",
      "Events without electronic tickets",
      "Ticket with QR code",
    ],
    price: "$1000",
    description: "For large scale events and enterprise needs.",
    buttonText: "Get Premium",
    isPopular: false,
  },
];

const CheckIcon = ({ className }) => (
  <svg
    className={`w-5 h-5 flex-shrink-0 mr-3 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default function Pricing() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlanClick = () => {
    const isAuthenticated = document.cookie.includes("accessToken=");
    if (isAuthenticated) {
      navigate("/create-event");
    } else {
      toast.error("Please login first");
      setTimeout(() => navigate("/login"), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          {/* Badge */}
          <div className="inline-flex items-center justify-center mb-6">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/10 to-red-500/10 text-yellow-500 text-sm font-semibold tracking-wide border border-red-500/20 uppercase">
              Subscription
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
              pricing
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500">
            Choose the plan that best fits your needs. Start organizing
            unforgettable experiences today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              onClick={handlePlanClick}
              className={`relative flex flex-col p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 bg-white ${
                plan.isPopular
                  ? "border-2 border-red-500 shadow-[0_20px_50px_rgba(244,63,94,0.15)] scale-100 lg:scale-105 z-20"
                  : "border border-gray-200 shadow-lg hover:shadow-xl z-10"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                  {plan.title}
                </h2>
                <p className="text-gray-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900">
                  {plan.price}
                </span>
              </div>

              <div className="h-px w-full bg-gray-100 mb-8" />

              <ul className="flex-1 space-y-4 mb-8 min-h-[200px]">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-600">
                    <CheckIcon className="text-red-500" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex justify-center items-center gap-2 ${
                  plan.isPopular
                    ? "bg-gradient-to-r from-yellow-400 to-red-500 text-white shadow-[0_10px_20px_rgba(244,63,94,0.3)] hover:shadow-[0_10px_30px_rgba(244,63,94,0.5)]"
                    : "bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {plan.buttonText}
                {plan.isPopular && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

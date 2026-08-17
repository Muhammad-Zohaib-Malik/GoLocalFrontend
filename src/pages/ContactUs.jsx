import React, { useEffect } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Subtitle from "../ComponentsHome/Subtitle/Subtitle";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Use Homepage Subtitle Component */}
        <Subtitle title="Contact Us" />

        <div className="text-center max-w-3xl mx-auto mb-16 -mt-4">
          <p className="text-lg text-gray-500 font-medium">
            Have a question about hosting an event or buying tickets? Our team
            is here to help you create unforgettable moments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Contact Information (Left Column) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Get In Touch
              </h3>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 text-black shadow-sm">
                    <FiMapPin className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      Our Office
                    </h4>
                    <p className="text-gray-500 leading-relaxed text-lg">
                      Rawalpindi, Punjab
                      <br />
                      Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 text-black shadow-sm">
                    <FiPhone className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      Phone
                    </h4>
                    <p className="text-gray-500 text-lg">+92 (000) 000-0000</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Mon-Fri from 9am to 6pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 text-black shadow-sm">
                    <FiMail className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      Email
                    </h4>
                    <p className="text-gray-500 text-lg">admin@golocal.com</p>
                    <p className="text-gray-400 text-sm mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h3>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="How can we help you today?"
                    rows={6}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-black group relative w-full flex items-center justify-center gap-3 text-white font-bold text-lg py-5 rounded-full shadow-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-full opacity-30 "></span>
                    <span className="relative z-10 flex items-center gap-2">
                      Send Message
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

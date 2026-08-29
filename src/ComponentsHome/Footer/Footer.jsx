import React from "react";
import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { RiMapPin2Line, RiPhoneLine, RiMailLine } from "react-icons/ri";

const quick__links = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About Us" },
  { path: "/events", display: "All Events" },
];

const discover__links = [
  { path: "/about", display: "Gallery" },
  { path: "/contact", display: "Contact Support" },
  { path: "/walk-in-events", display: "Walk-in Events" },
  { path: "/about", display: "Facilities" },
];

const contact_detail = [
  {
    title: "Address",
    icon: <RiMapPin2Line />,
    info: "Rawalpindi, Pakistan",
  },
  {
    title: "Phone",
    icon: <RiPhoneLine />,
    info: "+92 (000) 000-0000",
  },
  {
    title: "Email",
    icon: <RiMailLine />,
    info: "admin@golocal.com",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand & Social Column */}
          <div className="lg:col-span-4 pr-4">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              Go
              <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
                Local
              </span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Experience the world, one event at a time. We provide the best
              platform for organizers and attendees to connect and create
              unforgettable moments together.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaTwitter className="text-sm" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">
              Navigation
            </h3>
            <ul className="space-y-4">
              {quick__links.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">
              Discover
            </h3>
            <ul className="space-y-4">
              {discover__links.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">
              Contact Us
            </h3>
            <ul className="space-y-5">
              {contact_detail.map((item, index) => (
                <li className="flex items-start gap-4" key={index}>
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-red-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-200 text-sm font-semibold mb-1">
                      {item.title}
                    </p>
                    <p className="text-gray-400 text-sm">{item.info}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {year} GoLocal. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

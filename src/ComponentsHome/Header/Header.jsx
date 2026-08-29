import React, { useEffect, useRef, useState, useContext } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/mylogooo.png";
import { AiOutlineMenu } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
import { RxExit } from "react-icons/rx";
import axios from "axios";
import axiosClient from "../../api/axiosClient";
import { UserContext } from "../../UserContext";

const nav__links = [
  { path: "/", display: "Home" },
  { path: "/events", display: "Events" },
  { path: "/about", display: "About Us" },
  { path: "/contact", display: "Contact" },
  { path: "/walk-in-events", display: "Walk-In" },
];

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const isAuthenticated = !!user;

  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);
  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);

  const handleScroll = () => {
    setIsMenuOpen(false);
    setIsScrolled(window.scrollY > 50);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleLogout = async () => {
    try {
      await axiosClient.post(
        "/users/logout",
        {},
        {
          headers: {},
        },
      );
    } catch (err) {
      console.error("Logout failed:", err);
    }
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const isHomeWithHero =
    (location.pathname === "/") &&
    (!user || user?.role === "user");
  const isEventsPage = location.pathname === "/events";
  const isAboutPage = location.pathname === "/about";
  const isWalkInPage = location.pathname === "/walk-in-events";
  const hasDarkTopSection =
    isHomeWithHero || isEventsPage || isAboutPage || isWalkInPage;
  const useSolidHeader = isScrolled || !hasDarkTopSection;

  return (
    <header
      className={`fixed top-0 left-0 right-0 flex items-center justify-between px-4 md:px-[5%] py-4 md:py-0 md:h-24 z-1000 transition-colors duration-300 ${useSolidHeader ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"}`}
    >
      {/* Mobile menu toggle button */}
      <div
        className={`md:hidden text-2xl text-gray-700 cursor-pointer transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
        onClick={toggleMenu}
      >
        <AiOutlineMenu />
      </div>

      {/* Logo */}
      {!isMobile && (
        <div className="shrink">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-20 w-[100px] object-contain"
            />
          </Link>
        </div>
      )}

      {/* Navigation Links */}
      <nav
        className={`${
          isMenuOpen
            ? "absolute left-0 right-0 top-full bg-white shadow-lg pb-4"
            : "hidden"
        } md:static md:flex md:items-center md:bg-transparent md:shadow-none md:pb-0 w-full md:w-auto`}
      >
        <ul className="flex flex-col md:flex-row items-center m-0 p-0 list-none gap-6 md:gap-8 mt-4 md:mt-0">
          {nav__links.map((item, index) => (
            <li key={index} onClick={toggleMenu}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `font-semibold text-sm md:text-base cursor-pointer pb-1 border-b-2 transition-all ${
                    isActive
                      ? "bg-linear-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text border-red-500"
                      : `${useSolidHeader || isMenuOpen ? "text-gray-700 hover:text-black" : "text-gray-200 hover:text-white"} border-transparent`
                  }`
                }
              >
                {item.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right-side Buttons */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            {user?.role === "organizer" && (
              <Link to="/create-event">
                <button className="px-5 py-2 rounded-full font-semibold text-sm bg-black text-white hover:bg-gray-800 shadow-md transition-all duration-300">
                  {isMobile ? "Add Event" : "Create Event"}
                </button>
              </Link>
            )}

            {user?.username && (
              <div
                className="relative inline-block cursor-pointer"
                ref={dropdownRef}
              >
                <div
                  className="flex items-center gap-2"
                  onClick={toggleDropdown}
                >
                  <div className="flex items-center justify-center rounded-full bg-black text-white w-8 h-8 md:w-10 md:h-10 text-sm md:text-lg font-bold border-2 border-rose-500 shadow-sm">
                    {user?.username ? user?.username[0].toUpperCase() : "U"}
                  </div>
                  <div
                    className={`flex items-center font-bold text-sm ${useSolidHeader || isMenuOpen ? "text-gray-800" : "text-white"}`}
                  >
                    <span className="hidden md:block mr-1">
                      {user?.username}
                    </span>
                    <BsFillCaretDownFill
                      className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                {/* Custom Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-[120%] right-0 bg-white border border-gray-100 shadow-xl rounded-xl z-1000 min-w-[160px] py-2 overflow-hidden">
                    {user?.role === "user" && (
                      <Link
                        to="/wallet"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                      >
                        Wallet
                      </Link>
                    )}
                    <div
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black cursor-pointer transition-colors"
                      onClick={handleLogout}
                    >
                      <RxExit />
                      Log out
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="px-5 py-2 rounded-full font-semibold text-sm bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-md transition-all duration-300">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-5 py-2 rounded-full font-semibold text-sm bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-md transition-all duration-300">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

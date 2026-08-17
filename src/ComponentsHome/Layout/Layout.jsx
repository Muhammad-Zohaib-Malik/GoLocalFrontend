import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation, Outlet } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  const isTemplateRoute =
    location.pathname.includes("template") ||
    location.pathname.includes("congrtspaymentsuccess");
  const isTemplateRoutee =
    location.pathname.includes("seatMap") ||
    location.pathname.includes("congrtspaymentsuccess");

  const isHomeWithHero =
    (location.pathname === "/home" || location.pathname === "/") &&
    (!localStorage.getItem("role") || localStorage.getItem("role") === "user");
  const isEventsPage = location.pathname === "/events";
  const isAboutPage = location.pathname === "/about";
  const isWalkInPage = location.pathname === "/walk-in-events";
  const hasDarkTopSection =
    isHomeWithHero || isEventsPage || isAboutPage || isWalkInPage;

  return (
    <div className="flex flex-col min-h-screen">
      {!isTemplateRoute && !isTemplateRoutee && <Header />}
      <main
        className={`flex-1 flex flex-col ${!hasDarkTopSection && !isTemplateRoute && !isTemplateRoutee ? "pt-24" : ""}`}
      >
        <Outlet />
      </main>
      {!isTemplateRoute && !isTemplateRoutee && <Footer />}
    </div>
  );
};

export default Layout;

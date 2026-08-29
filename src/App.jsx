import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./ComponentsHome/Layout/Layout";
import { UserContextProvider } from "./UserContext";

// Pages
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import CreateEvent from "./pages/CreateEvent";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventPage from "./pages/EventPage/EventPage";
import OrderSummary from "./pages/OrderSummary/OrderSummary";
import Wallet from "./pages/Wallet/Wallet";
import PrivateRoute from "./router/PrivateRoute";
import SeatMapPage from "./pages/SeatMapPage/SeatMapPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import WalkIn from "./pages/WalkIn";
import OrganizorMapPage from "./pages/OrganizerMap/OrganizorMapPage";
import PaymentSuccess from "./pages/PaymentSuccess";

// Placeholder Pages
const About = () => (
  <div style={{ padding: "20px" }}>This is the About page</div>
);
const Notification = () => (
  <div style={{ padding: "20px" }}>This is the Notification page</div>
);
const SearchResultList = () => (
  <div style={{ padding: "20px" }}>This is the SearchResultList page</div>
);
const Gallery = () => (
  <div style={{ padding: "20px" }}>404: Page Not Found</div>
);
const Team = () => <div style={{ padding: "20px" }}>404: Page Not Found</div>;

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "create-event",
          element: <PrivateRoute element={<CreateEvent />} />,
        },
        { path: "events", element: <Events /> },
        { path: "event-detail/:id", element: <EventPage /> },
        {
          path: "seatMap",
          element: <PrivateRoute element={<SeatMapPage />} />,
        },
        {
          path: "event/ordersummary",
          element: <PrivateRoute element={<OrderSummary />} />,
        },
        { path: "wallet", element: <PrivateRoute element={<Wallet />} /> },
        { path: "about", element: <AboutUs /> },
        { path: "contact", element: <ContactUs /> },
        { path: "congrtspaymentsuccess", element: <PaymentSuccess /> },
        { path: "team", element: <PrivateRoute element={<Team />} /> },
        { path: "gallery", element: <PrivateRoute element={<Gallery />} /> },
        { path: "walk-in-events", element: <WalkIn /> },
        { path: "template", element: <OrganizorMapPage /> },
        { path: "events/search", element: <SearchResultList /> },
        { path: "notification", element: <Notification /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

const App = () => {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </UserContextProvider>
  );
};

export default App;

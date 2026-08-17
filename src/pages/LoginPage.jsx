import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import axiosClient from "../api/axiosClient";
import authImage from "../assets/event_auth_image.png";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: emailRef.current.value.toLowerCase(),
      password: passwordRef.current.value,
    };

    try {
      setLoading(true);
      const response = await axiosClient.post("/users/loginUser", user, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });

      const data = response.data;
      console.log("User signed in successfully:", data);
      navigate("/home");
    } catch (error) {
      console.log("Request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full font-sans bg-gray-50 overflow-hidden">
      {loading && (
        <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/50 backdrop-blur-md transition-opacity">
          <LoadingScreen />
        </div>
      )}

      <div className="flex flex-1 w-full">
        {/* Image Section */}
        <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center shadow-2xl">
          <img
            src={authImage}
            alt="Authentication Background"
            className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-purple-900/80 backdrop-blur-[2px]"></div>
          <div className="relative z-10 p-12 text-white flex flex-col items-center text-center">
            <div className="mb-6 p-4 rounded-full bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-5xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200 drop-shadow-sm">
              Welcome Back
            </h2>
            <p className="text-lg font-medium text-blue-100 max-w-md leading-relaxed opacity-90">
              Sign in to continue exploring incredible local events, connecting
              with your community, and creating unforgettable memories.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-60 -z-10 -translate-x-1/2 translate-y-1/2"></div>

          <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-all duration-500 z-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 w-full"
            >
              <div className="text-center mb-2">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Sign In
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                  Enter your credentials to access your account
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    ref={emailRef}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline transition-all"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    ref={passwordRef}
                    placeholder="••••••••"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl text-white text-base font-bold transition-all mt-4 transform active:scale-[0.98] ${
                  loading
                    ? "bg-gray-400 cursor-wait"
                    : "bg-black hover:bg-gray-800 shadow-lg shadow-black/30 hover:shadow-black/40"
                }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-all"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

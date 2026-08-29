import React, { useEffect, useState } from "react";
import { FaTrash, FaTimes, FaCloudUploadAlt, FaImage } from "react-icons/fa";
import axios from "axios";
import Template1 from "../assets/c2.png";
import Template2 from "../assets/c1.png";
import Template3 from "../assets/c3.png";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("eventForm");
    const parsedData = savedData ? JSON.parse(savedData) : null;
    
    return {
      name: "",
      venue: "",
      address: "",
      desc: "",
      vipPrice: "",
      vipSize: "",
      economySize: "",
      economyPrice: "",
      currency: "",
      eventDate: "",
      eventDate2: "",
      category: "",
      paymentMethod: "",
      ...parsedData,
      photo: null, // Files cannot be stored in localStorage
    };
  });
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const { photo, ...dataToSave } = formData;
    localStorage.setItem("eventForm", JSON.stringify(dataToSave));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGalleryAdd = () => {
    setGallery([...gallery, { id: Date.now(), file: null }]);
  };

  const handleGalleryFileChange = (e, id) => {
    const updatedGallery = gallery.map((item) =>
      item.id === id ? { ...item, file: e.target.files[0] } : item,
    );
    setGallery(updatedGallery);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleGalleryDelete = (id) => {
    setGallery(gallery.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowTemplates(true);
  };

  const handleTemplateSelection = (template) => {
    setShowTemplates(false);
    navigate("/template", { state: { template, formData, gallery } });
  };

  // Reusable input classes
  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all";
  const labelClass =
    "text-gray-700 font-semibold mb-2 block text-sm tracking-wide";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 py-24 px-4 bg-cover bg-center bg-blend-overlay"
      style={{
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg)",
      }}
    >
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/50 backdrop-blur-sm">
          <LoadingScreen />
        </div>
      )}

      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 md:p-10 max-w-[1100px] w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
        <div className="mb-10 border-b border-gray-200/50 pb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Create <span className="text-black ">New Event</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Fill in the details below to launch your next unforgettable
            experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Section 1: Basic Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-rose-100 text-black flex items-center justify-center mr-3 text-sm">
                1
              </span>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className={labelClass}>Event Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="e.g. Summer Music Festival"
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Music">Music</option>
                  <option value="Sports">Sports</option>
                  <option value="Conference">Conference</option>
                  <option value="Technology">Technology</option>
                  <option value="Theater">Theater</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Venue *</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="e.g. Madison Square Garden"
                />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200/50"></div>

          {/* Section 2: Location & Time */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-rose-100 text-black flex items-center justify-center mr-3 text-sm">
                2
              </span>
              Location & Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className={labelClass}>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Full address"
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Day 1 (Start) *</label>
                <input
                  type="datetime-local"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Day 2 (End) *</label>
                <input
                  type="datetime-local"
                  name="eventDate2"
                  value={formData.eventDate2}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200/50"></div>

          {/* Section 3: Ticketing */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-rose-100 text-black flex items-center justify-center mr-3 text-sm">
                3
              </span>
              Ticketing Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex flex-col">
                <label className={labelClass}>Currency *</label>
                <select
                  name="currency"
                  value={formData.currency || ""}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select Currency
                  </option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="PKR">PKR (Rs)</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>VIP Seats *</label>
                <input
                  type="number"
                  name="vipSize"
                  value={formData.vipSize}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Quantity"
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>VIP Price *</label>
                <input
                  type="number"
                  name="vipPrice"
                  value={formData.vipPrice}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Amount"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className={labelClass}>Payment Method *</label>
                <div className="flex items-center gap-4 h-full pt-1 pb-1">
                  <label className="flex items-center gap-3 cursor-pointer bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-rose-300 transition-colors flex-1">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Online"
                      checked={formData.paymentMethod === "Online"}
                      onChange={handleChange}
                      className="w-4 h-4 text-black focus:ring-rose-500"
                    />
                    <span className="font-medium text-gray-700">Online</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-rose-300 transition-colors flex-1">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Walk-in"
                      checked={formData.paymentMethod === "Walk-in"}
                      onChange={handleChange}
                      className="w-4 h-4 text-black focus:ring-rose-500"
                    />
                    <span className="font-medium text-gray-700">Walk-in</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Economy Seats *</label>
                <input
                  type="number"
                  name="economySize"
                  value={formData.economySize}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Quantity"
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Economy Price *</label>
                <input
                  type="number"
                  name="economyPrice"
                  value={formData.economyPrice}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Amount"
                />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200/50"></div>

          {/* Section 4: Details & Media */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-rose-100 text-black flex items-center justify-center mr-3 text-sm">
                4
              </span>
              Details & Media
            </h3>

            <div className="flex flex-col mb-8">
              <label className={labelClass}>Description *</label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                required
                rows={5}
                className={inputClass}
                placeholder="Tell attendees what your event is all about..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Banner Upload */}
              <div className="flex flex-col">
                <label className={labelClass}>Event Banner *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-rose-50/50 hover:border-rose-300 transition-colors cursor-pointer relative min-h-[200px]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <FaCloudUploadAlt className="text-5xl text-gray-300 mb-3" />
                  <span className="text-gray-600 font-semibold text-lg">
                    Click or drag banner image
                  </span>
                  <span className="text-gray-400 text-sm mt-2">
                    1920x1080 recommended
                  </span>
                </div>
                {formData.photo && (
                  <div className="mt-4 flex items-center justify-between bg-rose-50 border border-rose-100 p-3 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow-sm">
                        <FaImage className="text-black text-xl flex-shrink-0" />
                      </div>
                      <span className="text-sm text-gray-700 truncate font-medium max-w-[200px]">
                        {formData.photo.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, photo: null })}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>

              {/* Gallery Upload */}
              <div className="flex flex-col">
                <label className={labelClass}>Photo Gallery</label>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col gap-4 min-h-[200px]">
                  {gallery.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm italic py-4">
                      <FaImage className="text-3xl text-gray-300 mb-2" />
                      No gallery images added yet.
                    </div>
                  )}
                  {gallery.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm"
                    >
                      <div className="flex-1 relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleGalleryFileChange(e, item.id)}
                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-black hover:file:bg-rose-100 cursor-pointer transition-colors"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleGalleryDelete(item.id)}
                        className="text-gray-400 hover:text-red-500 p-2.5 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleGalleryAdd}
                    className="w-full py-3 px-4 border-2 border-dashed border-rose-300 text-black font-bold rounded-xl hover:bg-rose-50 transition-colors mt-auto flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FaCloudUploadAlt className="text-xl" /> Add Image
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              className="bg-black group relative w-full flex items-center justify-center gap-3 text-white font-bold text-xl py-5 rounded-full shadow-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-full opacity-30 "></span>
              <span className="relative z-10 flex items-center gap-2">
                Continue to Templates
              </span>
            </button>
          </div>
        </form>
      </div>

      {showTemplates && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center w-full max-w-[500px] lg:max-w-[1100px] max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setShowTemplates(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors bg-gray-100 hover:bg-rose-50 rounded-full p-3"
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-gray-900 tracking-tight">
              Select a template layout
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
              {[
                { image: Template1, label: "Modern Dark", id: "template1" },
                { image: Template2, label: "Classic Light", id: "template2" },
                { image: Template3, label: "Vibrant Color", id: "template3" },
              ].map((template, index) => (
                <div
                  key={index}
                  onClick={() => handleTemplateSelection(template.id)}
                  className="group relative border-2 border-gray-200 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:border-rose-500 hover:shadow-2xl hover:-translate-y-2 bg-gray-50"
                >
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-1.5 rounded-full font-bold z-10 shadow-sm text-sm border border-gray-200">
                    {template.label}
                  </div>
                  <div className="aspect-[4/3] w-full p-4 flex items-center justify-center">
                    <img
                      src={template.image}
                      alt={template.label}
                      className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-sm"
                    />
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                    <span className="text-white font-bold px-8 py-3 bg-black rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Select Theme
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventForm;

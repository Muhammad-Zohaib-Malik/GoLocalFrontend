import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-t-[#3795d6] border-r-transparent border-b-[#3795d6] border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
}

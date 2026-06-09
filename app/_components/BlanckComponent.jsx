import { ChevronUp } from "lucide-react";
import React from "react";

const BlanckComponent = () => {
  // Function to handle smooth scrolling to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This creates the smooth sliding animation
    });
  };

  return (
    <div className="h-screen w-full flex justify-end flex-col">
      <div className="flex justify-between font-poppins text-[12px] items-center bg-[#00000006] border border-[#0000000d] list-none p-4">
        <li className="text-gray-800 font-light">Release 1.0</li>

        {/* Added onClick handler and hover effects for better UX */}
        <button
          onClick={scrollToTop}
          className="h-10 w-10 rounded-full cursor-pointer bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 active:scale-95 transition-all border border-gray-100"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-4 h-4 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default BlanckComponent;

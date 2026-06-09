import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

const QrModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Backdrop Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 ">
      {/* Modal Container */}
      <div className="relative w-full max-w-xl mx-4 bg-white rounded-[2rem] p-8 shadow-2xl text-center flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-lg bg-[#112a36] text-white hover:bg-[#183a4d] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <h2 className="text-[#0e4b51] text-2xl font-poppins mt-2 mb-6 tracking-wide">
          Whatsapp QR Code
        </h2>

        {/* QR Code Wrapper */}
        <div className="bg-white p-2 mb-4">
          <Image
            src="/whatsapp.png" // Path to your QR asset
            alt="Whatsapp QR Code"
            width={180}
            height={180}
            className="object-contain"
          />
        </div>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm font-poppins tracking-tight mt-2">
          Chat with Our OSE Team
        </p>
      </div>
    </div>
  );
};

export default QrModal;

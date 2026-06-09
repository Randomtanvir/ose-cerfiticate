import Image from "next/image";
import React from "react";
// Assuming you are using lucide-react for icons.
// You can replace these with any icon library you use (e.g., react-icons)
import { QrCode, UserPlus, User, ChevronDown } from "lucide-react";
import { MessageSquareCheck } from "lucide-react";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = ({ onOpen, onFormOpen, isLogout, onOpenProfile }) => {
  console.log(isLogout);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between h-[48px] bg-[#233d4d] px-6 py-4 text-[#ebf4f9] font-poppins">
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <Link href="https://g4df6f77df30875-oseproddb.adb.me-dcc-muscat-1.dedicated.oraclecloudapps.com/ords/r/mercatono_001/ose/login?session=104020814604149">
          <Image
            src="/logo.png"
            alt="Oman Society of Engineers Logo"
            width={62}
            height={40}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Right Section: Navigation Links */}
      <div className="flex items-center gap-8 text-sm font-poppins">
        {/* Whatsapp QR Code */}
        <button
          onClick={onOpen}
          className="flex items-center hover:bg-[#1b2f3c] px-1 py-2 hover:rounded-sm gap-2 hover:opacity-80 transition-opacity"
        >
          <QrCode className="w-5 h-5 blink" />
          <span className="text-[13px] md:block hidden">Whatsapp QR Code</span>
        </button>

        {/* Add Membership */}
        <button
          onClick={onFormOpen}
          className="flex hover:bg-[#1b2f3c] px-1 py-2 hover:rounded-sm items-center gap-2 hover:opacity-80 transition-opacity relative"
        >
          <div className="relative">
            <MessageSquareCheck className="w-5 h-5 blink" />
            <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full border border-[#233d4d]">
              !
            </span>
          </div>
          <span className="text-[13px] md:block hidden ">Add Membership</span>
        </button>

        {/* User Profile Dropdown */}
        <button
          onClick={onOpenProfile}
          className="flex hover:bg-[#1b2f3c] px-1 py-2 hover:rounded-sm items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <User className="w-5 h-5 mr-1" />
          <span className="text-[13px] md:block hidden">nobody</span>
          <ChevronDown className="w-4 h-4 ml-1 text-gray-300" />
        </button>
        {isLogout && <ProfileDropdown isOpen={isLogout} />}
      </div>
    </nav>
  );
};

export default Navbar;

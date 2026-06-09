import React from "react";
import { LogOut } from "lucide-react"; // Using standard log-out icon
import Link from "next/link";

const ProfileDropdown = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-[100%] w-60 bg-white rounded-sm shadow-2xl p-2 z-[60] border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-150">
      <Link
        href="https://g4df6f77df30875-oseproddb.adb.me-dcc-muscat-1.dedicated.oraclecloudapps.com/ords/r/mercatono_001/ose/login?session=104020814604149"
        // onClick={onSignOut}
        className="w-full flex items-center gap-4 px-6 py-4 rounded-sm bg-[#d9eaf2] text-[#183a4d] hover:bg-[#c3deeb] transition-colors text-left"
      >
        <LogOut className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[15px] font-medium font-poppins">Sign Out</span>
      </Link>
    </div>
  );
};

export default ProfileDropdown;

import React from "react";
import { X, ChevronDown } from "lucide-react";

const MembershipModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="pt-8 pb-4 text-center">
          <h2 className="text-[#0e4b51] text-3xl font-semibold">
            Add Membership
          </h2>
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-1.5 rounded-lg bg-[#112a36] text-white hover:bg-opacity-90 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inner Form Area */}
        <div className="px-10 pb-6">
          <div className="border border-gray-100 rounded-[2rem] bg-[#fdfdfd] p-8 shadow-sm">
            <form className="space-y-4">
              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Membership Select with Red Corner */}
                <div className="relative">
                  <div className="absolute top-0 left-0 w-4 h-4 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-red-600 -rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                  <div className="relative">
                    <select className="w-full h-14 px-4 bg-white border border-gray-400 rounded-xl appearance-none text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0e4b51]">
                      <option>Membership</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Coupon Code */}
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="w-full h-14 px-4 bg-white border border-gray-400 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0e4b51]"
                />

                {/* Fees Fields */}
                <input
                  type="text"
                  placeholder="Total Fees - OMR"
                  className="w-full h-14 px-4 bg-[#f8f9fa] border border-gray-400 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Total After Discount - OMR"
                  className="w-full h-14 px-4 bg-[#f8f9fa] border border-gray-400 rounded-xl"
                />

                {/* Payment Fields */}
                <input
                  type="text"
                  placeholder="Pay Now - OMR"
                  className="w-full h-14 px-4 bg-[#f8f9fa] border border-gray-400 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Pay Later - OMR"
                  className="w-full h-14 px-4 bg-[#f8f9fa] border border-gray-400 rounded-xl"
                />
              </div>

              {/* Total Score - Full Width */}
              <div className="w-full bg-[#f8f9fa] border border-gray-400 rounded-xl p-3">
                <label className="block text-[11px] text-gray-500 ml-1">
                  Total Score
                </label>
                <input
                  type="text"
                  defaultValue="0"
                  className="w-full bg-transparent focus:outline-none text-lg ml-1"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-center gap-4 pb-10 pt-2 px-10">
          <button
            onClick={onClose}
            className="px-10 py-3 rounded-xl border border-gray-300 bg-blue-50/50 text-[#183a4d] font-bold text-sm hover:bg-blue-100 transition-colors"
          >
            Cancel
          </button>
          <button className="px-8 py-3 rounded-xl bg-[#183a4d] text-white font-bold text-sm hover:bg-[#112a36] transition-colors">
            I understand and agree to above statement
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipModal;

import React from "react";
import { HiOutlineRefresh, HiOutlineCurrencyRupee } from "react-icons/hi";

const TotalAmountcheck = ({ onResetClick, onEarningClick }) => {
  return (
    <div className="absolute top-16 right-7 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#1B1B1B] shadow-2xl z-50">
      <button
        onClick={onResetClick}
        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
      >
        <HiOutlineRefresh size={18} />
        <span>Reset Total Amount</span>
      </button>

      <div className="h-px bg-white/5" />
 
      <button
        onClick={onEarningClick}
        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
      >
        <HiOutlineCurrencyRupee size={18} />
        <span>Total Earnings</span>
      </button>
    </div>
  );
};

export default TotalAmountcheck;

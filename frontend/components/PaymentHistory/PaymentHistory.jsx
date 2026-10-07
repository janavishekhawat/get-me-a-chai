"use client";

import { useRouter } from "next/navigation";
import { FaReceipt } from "react-icons/fa";

const PaymentHistory = () => {
  const router = useRouter();
  
    return (
      <button
        onClick={() => router.push("/creator/paymentHistory")}
        className="w-full flex gap-2 items-center text-black p-2 rounded-lg mb-6 cursor-pointer whitespace-nowrap text-center border border-none hover:bg-gray-100 hover:scale-z-200 transition-all duration-150"
      >
        <FaReceipt/>
        Payment History
      </button>
    ); 
}

export default PaymentHistory

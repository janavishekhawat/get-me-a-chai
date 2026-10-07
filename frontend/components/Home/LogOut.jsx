"use client";

import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-hot-toast";

const LogOut = () => {
  const router = useRouter();

  const handleLogOut = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // router.replace("/");
    localStorage.clear();
  window.location.href = "/";
    toast("✅ Logout Successfully")
  };

  return (
    <button
      onClick={handleLogOut}
      className="w-full flex gap-2 items-center text-black p-2 rounded-lg mb-6 cursor-pointer whitespace-nowrap text-center border border-none hover:bg-gray-100 hover:scale-z-200 transition-all duration-150"
    >
      <FiLogOut />
      LOGOUT
    </button>
  );
};

export default LogOut;

import { deleteaccountEndpoints } from "@/services/api";
import { apiConnector } from "@/services/apiconnector";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Delete = () => {
  const router = useRouter();
  const [isConfirm, setisConfirm] = useState(false);

  const { DELETE_USER_ACCOUNT } = deleteaccountEndpoints;

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in");
      return;
    }

    try {
      const res = await apiConnector(
        "DELETE",
        DELETE_USER_ACCOUNT,
        null, // No body data
        Object.assign({}, { Authorization: `Bearer ${token}` }), // Correct headers position
      );

      // Axios puts the backend response inside res.data
      if (res?.data?.success) {
        localStorage.clear();
        window.location.href = "/";
        toast.success(res.data.message || "Account deleted successfully");
      } else {
        toast.error(res?.data?.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Deletion Error:", error);
      // Safely access Axios error message from backend
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <button
        onClick={() => setisConfirm(true)}
        className="w-full flex gap-2 items-center text-black p-2 rounded-lg mb-6 cursor-pointer whitespace-nowrap text-center border border-none hover:bg-gray-100 hover:scale-z-200 transition-all duration-150"
      >
        <FaTrash />
        Delete Account
      </button>
      {isConfirm && (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="w-[400px] max-w-[90%] rounded-2xl bg-white p-6 shadow-2xl">
      <h3 className="mb-3 text-xl font-semibold text-gray-900">
        Delete Account
      </h3>

      <p className="mb-6 text-sm leading-relaxed text-gray-600">
        Are you sure you want to delete your account permanently? This action
        cannot be undone and all your data will be removed.
      </p>

      <div className="flex justify-end gap-3">
        <button 
        onClick={()=>setisConfirm(false)}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
          Cancel
        </button>

        <button 
        onClick={handleDelete}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default Delete;

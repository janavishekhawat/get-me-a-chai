"use client";

import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";

const ProfileForm = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/creator/setup")}
      className="w-full flex gap-2 items-center text-black p-2 rounded-lg mb-6 cursor-pointer whitespace-nowrap text-center border border-none hover:bg-gray-100 hover:scale-z-200 transition-all duration-150"
    >
      <MdEdit/>
      Edit Profile
    </button>
  ); 
};

export default ProfileForm;
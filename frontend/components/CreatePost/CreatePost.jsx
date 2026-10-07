"use client";

import { useRouter } from "next/navigation";

const CreatePost = () => {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.push("/creator/createPost")}
      className="bg-blue-600 text-white p-2 mb-2 rounded-lg cursor-pointer whitespace-nowrap text-center border border-none hover:bg-blue-700 hover:scale-z-200 transition-all duration-150"
    >
      Create Post
    </button>
  );
};

export default CreatePost;

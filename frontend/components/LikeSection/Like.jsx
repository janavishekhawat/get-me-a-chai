import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IoMdArrowBack } from "react-icons/io";
import ProfileImage from "../ProfileImage/ProfileImage"

// Naming stays same as your original file
const Like = ({ post, currentUserId }) => {
  const router = useRouter();
  // State naming preserved: likedUsers, openLikeList
  const [likedUsers, setlikedUsers] = useState([]);
  const [openLikeList, setOpenLikeList] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes.length);
  const [userHasLiked, setUserHasLiked] = useState(
    post.likes.includes(currentUserId),
  );

  const handleLike = async () => {
    const isCurrentlyLiked = userHasLiked;
    setUserHasLiked(!isCurrentlyLiked);

    // Optional: You can even move the number here if you want to be "Optimistic"
  // setLocalLikes(prev => isCurrentlyLiked ? prev - 1 : prev + 1);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(
        `http://localhost:5000/api/posts/post/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const updatedLike = res.data.likes;

      setLocalLikes(updatedLike);
      return res.data.likedUsers;
    } catch (error) {
      setUserHasLiked(isCurrentlyLiked);
      console.error("Like failed:", err);
    }
  };

  // Logic naming preserved: handleFetchLikes
  // const handleFetchLikes = async (e) => {
  //   e.stopPropagation();
  //   setlikedUsers([]);
  //   const token = localStorage.getItem("token");
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:5000/api/posts/get/${post._id}/getLikes`,
  //       { headers: { Authorization: `Bearer ${token}` } },
  //     );
  //     // Data mapping stays exactly as your original
  //     setlikedUsers(res.data.likedUsers.likes);
  //     setOpenLikeList(true);
  //   } catch (err) {
  //     console.log("the error is : ", err);
  //   }
  // };

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          onClick={handleLike}
          className="cursor-pointer hover:scale-125 transition-transform duration-200 text-2xl"
        >
          {userHasLiked ? "❤️" : "🤍"}
        </div>
        <span
          onClick={() => setOpenLikeList(true)}
          className="text-[10px] font-black text-gray-500 hover:text-white cursor-pointer mt-1 tracking-widest"
        >
          {localLikes || 0} LIKES
        </span>
      </div>

      {/* 
          Yahan 'absolute inset-0' use kiya hai. 
          Ye exactly Comment.jsx ki tarah PostCard ke andar hi खुलेगा.
      */}
      {openLikeList && (
        <div className="absolute inset-0 bg-[#121212] z-50 flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Header logic same as yours */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-800 bg-[#1a1a1a]">
            <IoMdArrowBack
              onClick={() => setOpenLikeList(false)}
              className="cursor-pointer text-xl text-white hover:scale-110 transition-transform"
            />
            <h1 className="text-md font-bold text-white">Liked by</h1>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {likedUsers.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-gray-500 text-sm">
                <p>No likes yet.</p>
              </div>
            ) : (
              likedUsers.map((u) => (
                <div
                  key={u._id}
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => router.push(`/creator/${u.username}`)}
                  >
                    <ProfileImage
                      src={u.profileImage}
                      alt={u.username}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-800"
                    />
                    <span className="text-sm font-bold text-gray-200">
                      {u.username}
                    </span>
                  </div>
                  {/* Button for Profile with same logic */}
                  <button
                    onClick={() => router.push(`/creator/${u.username}`)}
                    className="text-[10px] font-bold text-gray-400 border border-gray-800 px-3 py-1 rounded-full hover:bg-gray-800 hover:text-white transition-all cursor-pointer"
                  >
                    Profile
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Like;

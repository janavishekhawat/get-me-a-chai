"use client";

import { useRouter } from "next/navigation";
import { followEndpoints } from "@/services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../CreatePost/CreatePost";
import { apiConnector } from "@/services/apiconnector";
import { toast } from "react-hot-toast";

const FollowButton = ({ creatorId }) => {
  const router = useRouter();
  const { FOLLOW_INFO_API, UNFOLLOW_API } = followEndpoints;
  const [isFollowing, setIsFollowing] = useState(false);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !creatorId) return;

    (async () => {
      try {
        const res = await apiConnector(
          "GET",
          `${FOLLOW_INFO_API}/${creatorId}/follow-status`,
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        setIsFollowing(res.data.isFollowing);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [creatorId, isFollowing]); // Optimized count updates

  const handleFollowing = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
      return;
    }

    try {
      const res = await apiConnector(
        "POST",
        `${FOLLOW_INFO_API}/${creatorId}/following`,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
      );
      setIsFollowing(true);
      toast.success(res.data.message);
    } catch (error) {
      console.log("the error is : ", error);
    }
  };

  const handleUnfollow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
      return; 
    }

    try {
      const res = await apiConnector(
        "DELETE",
        `${UNFOLLOW_API}/${creatorId}/unfollowing`,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
      );
      setIsFollowing(false);
      toast.success(res.data.message);
    } catch (error) {
      console.log("the error is : ", error);
    }
  };

  const isOwner = user?._id === creatorId;

  return (
    <>
      {isOwner ? (
        <div>
          <CreatePost className="mb-6"/>
        </div>
      ) : (
        <div>
          {isFollowing ? (
            <button
              onClick={handleUnfollow}
              className="px-6 py-2 bg-transparent text-white font-medium text-xs tracking-wider uppercase border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 mb-6 cursor-pointer"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={handleFollowing}
              className="px-6 py-2 bg-orange-500 text-black font-bold text-xs tracking-wider uppercase rounded-full hover:bg-orange-600 shadow-[0_4px_20px_rgba(249,115,22,0.3)] transition-all duration-300 mb-6 cursor-pointer"
            >
              Follow
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FollowButton;
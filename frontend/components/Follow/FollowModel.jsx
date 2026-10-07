"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiconnector";
import { followEndpoints } from "@/services/api";
import ConnectionModel from "./ConnectionModel";
import { RxArrowLeft, RxCross2 } from "react-icons/rx";
import ProfileImage from "../ProfileImage/ProfileImage"

const FollowModel = ({ creatorId, postsCount }) => {
  const router = useRouter();

  const {
    FOLLOW_INFO_API,
    FOLLOWER_LIST_API,
    FOLLOWING_LIST_API,
  } = followEndpoints;

  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  // ✅ fetch counts
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

        setFollowersCount(res.data.followersCount);
        setFollowingCount(res.data.followingCount);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [creatorId, showFollowersModal, showFollowingModal]); // Updated dependencies so it refreshes when models open/close

  // ✅ followers list
  const handleFollowerList = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
      return;
    }

    try {
      const res = await apiConnector(
        "GET",
        `${FOLLOWER_LIST_API}/${creatorId}/follower-list`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      setFollowers(res.data.followers);
      setShowFollowersModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ following list
  const handleFollowingList = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
      return;
    }

    try {
      const res = await apiConnector(
        "GET",
        `${FOLLOWING_LIST_API}/${creatorId}/following-list`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      setFollowings(res.data.followings);
      setShowFollowingModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ConnectionModel
        postsCount={postsCount}
        followersCount={followersCount}
        followingCount={followingCount}
        onFollowersClick={handleFollowerList}
        onFollowingClick={handleFollowingList}
      />

      {/* Followers Modal */}
      {showFollowersModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setShowFollowersModal(false)} // Click outside to close
        >
          <div 
            className="w-full h-full md:w-[480px] md:h-[600px] bg-[#121212] border-0 md:border border-white/10 md:rounded-2xl text-white flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside card
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#1a1a1a]">
              <button 
                onClick={() => setShowFollowersModal(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <RxArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-base font-semibold tracking-wide">Followers</h1>
              <button 
                onClick={() => setShowFollowersModal(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors hidden md:block"
              >
                <RxCross2 className="w-5 h-5" />
              </button>
              <div className="w-6 md:hidden" /> {/* Spacer for balance on mobile */}
            </div>

            {/* Modal Content / List */}
            <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2">
              {followers.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">No followers yet.</p>
              ) : (
                followers.map((u) => (
                  <div
                    key={u._id}
                    onClick={() => {
                      setShowFollowersModal(false);
                      router.push(`/creator/${u.username}`);
                    }}
                    className="p-3 flex items-center gap-3 cursor-pointer hover:bg-white/5 rounded-xl transition duration-200"
                  >
                    <ProfileImage 
                      src={u.profileImage}
                      className="w-11 h-11 rounded-full object-cover border border-white/10" 
                      alt={u.username}
                    />
                    <div className="flex flex-col text-left">
                      <p className="font-medium text-sm text-gray-200 hover:text-orange-500 transition-colors">{u.username}</p>
                      <p className="text-xs text-gray-500">@{u.username.toLowerCase()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowingModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setShowFollowingModal(false)} // Click outside to close
        >
          <div 
            className="w-full h-full md:w-[480px] md:h-[600px] bg-[#121212] border-0 md:border border-white/10 md:rounded-2xl text-white flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside card
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#1a1a1a]">
              <button 
                onClick={() => setShowFollowingModal(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <RxArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-base font-semibold tracking-wide">Following</h1>
              <button 
                onClick={() => setShowFollowingModal(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors hidden md:block"
              >
                <RxCross2 className="w-5 h-5" />
              </button>
              <div className="w-6 md:hidden" /> {/* Spacer for balance on mobile */}
            </div>

            {/* Modal Content / List */}
            <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2">
              {followings.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">Not following anyone yet.</p>
              ) : (
                followings.map((u) => (
                  <div
                    key={u._id}
                    onClick={() => {
                      setShowFollowingModal(false);
                      router.push(`/creator/${u.username}`);
                    }}
                    className="p-3 flex items-center gap-3 cursor-pointer hover:bg-white/5 rounded-xl transition duration-200"
                  >
                    <ProfileImage 
                      src={u.profileImage} 
                      className="w-11 h-11 rounded-full object-cover border border-white/10"
                      alt={u.username}
                    />
                    <div className="flex flex-col text-left">
                      <p className="font-medium text-sm text-gray-200 hover:text-orange-500 transition-colors">{u.username}</p>
                      <p className="text-xs text-gray-500">@{u.username.toLowerCase()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FollowModel;


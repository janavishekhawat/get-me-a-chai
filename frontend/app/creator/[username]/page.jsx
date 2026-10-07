"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

import Navbar from "@/components/Navbar";
import FollowModel from "@/components/Follow/FollowModel";
import FollowButton from "@/components/Follow/FollowButton";
import { setUser } from "@/redux/slices/authSlice";
import ActionLayout from "@/components/SupportSection/ActionLayout";
import { apiConnector } from "@/services/apiconnector";
import { creatorEndpoints, profileEndpoints } from "@/services/api";
import ProfileImage from "@/components/ProfileImage/ProfileImage.jsx";

const CreatorPage = () => {
  const { username } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  const [posts, setPosts] = useState([]);

  const { GET_USER_PROFILE_API } = profileEndpoints;
  const { GET_USER_DETAILS_API, GET_CREATOR_POST_API } = creatorEndpoints;

  useEffect(() => {
    fetchCreator();
  }, [username]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await apiConnector("GET", GET_USER_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(setUser(res.data.user));
    };
    fetchUser();
  }, []);

  if (!username) return;
  const fetchCreator = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${GET_USER_DETAILS_API}/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCreator(res.data.data);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 404) {
        setCreator(null);
      } else {
        console.error("Error fetching creator:", err);
      }
      setLoading(false);
      toast.error("Creator not Found");
    }
  };

  useEffect(() => {
    if (!username) return;
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${GET_CREATOR_POST_API}/${username}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setPosts(res.data.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [username]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!creator)
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-gray-500 font-sans">
        <p className="text-sm tracking-widest uppercase">Creator not found</p>
      </div>
    );

  const profile = creator.profile || {};

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200 overflow-x-hidden pb-24 font-sans">
      <nav className="sticky top-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-white/5">
        <Navbar />
      </nav>

      <main className="w-full">
        {/* Modern Mesh Banner - No Image */}
        <div className="relative w-full h-40 md:h-52 bg-[#0d0d0d]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-900/10 via-[#0d0d0d] to-[#0d0d0d]"></div>

          <div className="absolute -bottom-12 left-0 right-0 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-10"></div>
              <ProfileImage
                src={creator?.profileImage}
                alt={creator.username}
                className="relative w-32 h-32 md:w-32 md:h-32 rounded-full border-4 border-[#0d0d0d] shadow-2xl"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="max-w-5xl mx-auto px-4 pt-16 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {creator.username}
          </h1>
          <p className="text-orange-500 font-bold text-[10px] tracking-[0.3em] mt-1 uppercase">
            {creator.name}
          </p>

          <div className="mt-6 flex flex-col items-center gap-4">
            <FollowButton creatorId={creator._id} />
            <p className="text-gray-400 max-w-lg text-sm leading-relaxed font-light">
              {creator?.profile?.bio || "Welcome to my creative space!"}
            </p>
            <FollowModel creatorId={creator._id} postsCount={posts.length} />
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-10" />

          <ActionLayout
            creator={creator}
            setCreator={setCreator}
            creatorId={creator._id}
            profile={profile}
            refreshCreator={fetchCreator}
          />

          {/* Compact Gallery */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] flex-1 bg-white/5"></div>
              <h2 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
                Content Gallery
              </h2>
              <div className="h-[1px] flex-1 bg-white/5"></div>
            </div>

            <div className="grid grid-cols-3 gap-1 md:gap-2">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="relative aspect-square bg-[#1a1a1a] overflow-hidden cursor-pointer group"
                  onClick={() => router.push(`${username}/post/${post._id}`)}
                >
                  <img
                    src={`http://localhost:5000/${post.postimage.replace(/\\/g, "/")}`}
                    alt="post"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-75"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorPage;

"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiconnector";
import { exploreEndpoints } from "@/services/api";

const ExplorePage = () => {
  const router = useRouter();

  // 1. Tab State ('all' is default)
  const [activeTab, setActiveTab] = useState("all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { GET_ALL_EXPLORE_POSTS, GET_FOLLOWING_CREATOR_POST } =
    exploreEndpoints;

  // 2. Dynamic Fetching based on Active Tab
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let res;
        if (activeTab === "all") {
          // Public endpoint - no authorization needed
          res = await apiConnector("GET", GET_ALL_EXPLORE_POSTS, null);
        } else {
          // Protected following endpoint - token needed
          if (!token) {
            setPosts([]);
            setLoading(false);
            return;
          }
          res = await apiConnector("GET", GET_FOLLOWING_CREATOR_POST, null, {
            Authorization: `Bearer ${token}`,
          });
        }

        setPosts(res?.data?.posts || []);
      } catch (error) {
        console.error(`Error fetching ${activeTab} posts:`, error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab, GET_ALL_EXPLORE_POSTS, GET_FOLLOWING_CREATOR_POST]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar: Sticky and Top-level */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-900">
        <Navbar />
      </nav>

      {/* Main Content Area */}
      <main className="max-w-[935px] mx-auto pt-16 md:pt-20 mb-10 px-1 md:px-4">
        {/* Dynamic Tabs Navigation */}
        <div className="flex gap-4 justify-center p-5 select-none">
          <p
            onClick={() => setActiveTab("all")}
            className={`font-bold hover:text-yellow-500 cursor-pointer transition duration-200 ${
              activeTab === "all" ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            All Posts 
          </p>
              <p className="text-gray-600">|</p>
              <p
                onClick={() => setActiveTab("following")}
                className={`font-bold hover:text-yellow-500 cursor-pointer transition duration-200 ${
                  activeTab === "following"
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >Following</p>
        </div>

        {/* Unified Feed Display */}
        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <div className="w-10 h-10 border-4 border-t-yellow-500 border-gray-800 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400 animate-pulse">
              Fetching creativity...
            </p>
          </div>
        ) : (
          /* Shared Grid Layout */
          <div className="grid grid-cols-3 gap-[3px] md:gap-1">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  onClick={() => router.push(`/explore/Feed/${post._id}`)}
                  className="relative aspect-square bg-[#1a1a1a] overflow-hidden cursor-pointer group"
                >
                  <img
                    src={`http://localhost:5000/${post.postimage.replace(/\\/g, "/")}`}
                    alt="explore post"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-75"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <div className="flex gap-4 text-white font-bold">
                      {/* Stats/Likes layout can go here seamlessly */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Empty State */
              <div className="col-span-3 flex flex-col items-center justify-center py-20 text-gray-500">
                <div className="text-5xl mb-4 text-gray-700">📷</div>
                <p className="text-xl font-light">No Post</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ExplorePage;

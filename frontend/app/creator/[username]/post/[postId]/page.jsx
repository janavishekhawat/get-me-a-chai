"use client";

import { creatorEndpoints } from "@/services/api";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiconnector";
import { toast } from "react-hot-toast";
import PostCard from "@/components/PostModal/PostCard";

const PostDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { username, postId } = params;

  const [creator, setCreator] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [focusedPost, setFocusedPost] = useState(null);
  const [afterPosts, setAfterPosts] = useState([]);
  const [beforePosts, setBeforePosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [loading, setLoading] = useState(true);

  const { GET_CREATOR_POST_API, GET_USER_DETAILS_API, EDIT_POST_API } =
    creatorEndpoints;

  useEffect(() => {
    const fetchPostinfo = async () => {
      const res = await axios.get(`${GET_CREATOR_POST_API}/${username}`);
      const posts = res.data.data;
      setAllPosts(posts);
      const post = posts.find((p) => p._id === postId);
      setFocusedPost(post);
      setLoading(false);
    };
    fetchPostinfo();
  }, [username, postId]);

  useEffect(() => {
    if (!allPosts.length || !focusedPost) return;

    const after = allPosts
      .filter(
        (post) => new Date(post.createdAt) > new Date(focusedPost.createdAt),
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const before = allPosts
      .filter(
        (post) => new Date(post.createdAt) < new Date(focusedPost.createdAt),
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setAfterPosts(after);
    setBeforePosts(before);
  }, [allPosts, focusedPost]);

  useEffect(() => {
    const fetchCreator = async () => {
      const res = await axios.get(`${GET_USER_DETAILS_API}/${username}`);
      setCreator(res.data.data);
    };
    fetchCreator();
  }, [username]);

  const handleEditSubmit = async (postId, data) => {
    try {
      const token = localStorage.getItem("token");

      const res = await apiConnector(
        "PUT",
        `${EDIT_POST_API}/${postId}/editing`,
        data,
        { Authorization: `Bearer ${token}` },
      );

      const updatedPost = res.data.post;

      setFocusedPost((prev) =>
        prev?._id === updatedPost._id ? updatedPost : prev,
      );

      setAllPosts((prev) =>
        prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
      );

      setEditingPostId(null);
      toast("Post updated successfully");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (postId) => {
    try{

      const token = localStorage.getItem("token");
      
      await axios.delete(
        `http://localhost:5000/api/posts/post/${postId}/deleting`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      
      const updatedPosts = allPosts.filter((p) => p._id !== postId);
      setAllPosts(updatedPosts);
      
      if (updatedPosts.length > 0) {
        setFocusedPost(updatedPosts[0]); // Safe-guard: shift focus to the next available post immediately
        router.push(`/creator/${username}/post/${updatedPosts[0]._id}`);
      } else {
        setFocusedPost(null);
        router.push(`/creator/${username}`);
      }
      toast("Post Deleted successfully");
    }catch{
      toast.error("Something went wrong");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!creator) return null;

  return (
    <div className="bg-[#fff7f9] min-h-screen">
      <div className="bg-white border">
        {afterPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            creator={creator}
            editingPostId={editingPostId}
            setEditingPostId={setEditingPostId}
            onEdit={handleEditSubmit}
            onDelete={handleDelete}
          />
        ))}

        {focusedPost && (
          <div id="focused-post">
            <PostCard
              post={focusedPost}
              creator={creator}
              isFocused={true}
              editingPostId={editingPostId}
              setEditingPostId={setEditingPostId}
              onEdit={handleEditSubmit}
              onDelete={handleDelete}
            />
          </div>
        )}

        {beforePosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            creator={creator}
            editingPostId={editingPostId}
            setEditingPostId={setEditingPostId}
            onEdit={handleEditSubmit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PostDetailPage;

"use client";

import PostCard from "@/components/PostModal/PostCard";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { creatorEndpoints } from "@/services/api";
import { apiConnector } from "@/services/apiconnector";
import { toast } from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const { postId } = params;

  const [creator, setCreator] = useState(null);
  const [focusedPost, setFocusedPost] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);

  const { EDIT_POST_API } = creatorEndpoints;

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/explore/getfocusedpost/${postId}`,
      );

      setFocusedPost(res.data.post);
      setCreator(res.data.post.creator);
    };
    fetchPost();
  }, [postId]);

  // Explore page ke liye thoda sa badla hua function:
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
        prev?._id === updatedPost._id ? updatedPost : prev
      );

      setEditingPostId(null);
      toast.success("Post updated successfully"); // 'toast' ko change karke toast.success kar sakte hain
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (postId) => {
      const token = localStorage.getItem("token");
  
      await axios.delete(
        `http://localhost:5000/api/posts/post/${postId}/deleting`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
  
      router.push(`/explore`);
    };

  // const isOwner = (() => {
  //   try {
  //     const storedUser = localStorage.getItem("user");
  //     if (!storedUser || !creator?._id) return false;
  //     const user = JSON.parse(storedUser);
  //     return String(user._id) === String(creator._id);
  //   } catch {
  //     return false;
  //   }
  // })();

  return (
    <div className="bg-[#fff7f9] min-h-screen">
      <div className="bg-white border">
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
      </div>
    </div>
  );
};

export default page;

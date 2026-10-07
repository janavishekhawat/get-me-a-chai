"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdMoreVert, MdEdit, MdDelete } from "react-icons/md";
import EditPost from "./EditPost";
import Comment from "../CommentSection/Comment";
import Like from "../LikeSection/Like";
import ProfileImage from "../ProfileImage/ProfileImage"

const PostCard = ({
  post,
  creator,
  isFocused,
  editingPostId,
  setEditingPostId,
  onEdit,
  onDelete,
}) => {
  const router = useRouter();
  const [expandedPost, setExpandedPost] = useState(null);
  const [open, setOpen] = useState(false);

  const contentText = post.content || "";
  const isLong = contentText.length > 120;
  const isExpanded = isFocused ? true : expandedPost === post._id;

    const isOwner = (() => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser || !creator?._id) return false;
        const user = JSON.parse(storedUser);
        return String(user._id) === String(creator._id);
      } catch {
        return false;
      }
    })();

    console.log("the owner is :- ", isOwner);

  return (
    <div
      key={post._id}
      className="relative bg-[#121212] border border-gray-800 overflow-hidden shadow-2xl mb-8 mx-auto w-full max-w-md rounded-none sm:rounded-2xl transition-all duration-300"
    >
      {/* Top row */}
      <div className="flex items-center justify-between p-4 bg-[#1a1a1a]/50">
        <div className="flex items-center">
          <ProfileImage
            src={creator.profileImage}
            alt={creator.username || "username"}
            className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-orange-500 shadow-lg"
          />
          <span
            className="font-bold text-white cursor-pointer hover:text-orange-400 transition-colors"
            onClick={() => {
              // Using creator.username as defined in your profile data
              router.push(`/creator/${creator.username}`);
            }}
          >
            {creator.username || "Username"}
          </span>
        </div>

        {isOwner && (
          <div className="relative">
            <span
              className="p-2 cursor-pointer rounded-full hover:bg-white/10 hover:scale-110 transform transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <MdMoreVert size={22} />
            </span>
            {open && (
              <div className="absolute right-0 mt-2 w-32 bg-[#1c1c1c] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                <span
                  className="py-3 px-4 flex gap-3 items-center cursor-pointer hover:bg-white/10 text-gray-200 text-sm border-b border-gray-800 transition-all"
                  onClick={() => {
                    setEditingPostId(post._id);
                    setOpen(false);
                  }}
                >
                  <MdEdit className="text-blue-400" />
                  Edit
                </span>
                <span
                  className="py-3 px-4 flex gap-3 items-center cursor-pointer hover:bg-red-500/10 text-red-400 text-sm transition-all"
                  onClick={() => {
                    onDelete(post._id);
                    setOpen(false);
                  }}
                >
                  <MdDelete />
                  Delete
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Container */}
      <div className="w-full aspect-square bg-black group overflow-hidden">
        <img
          src={
            post.postimage
              ? `http://localhost:5000/${post.postimage.replace(/\\/g, "/")}`
              : "https://via.placeholder.com/500x500"
          }
          alt={post.title || "Post Image"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 bg-[#121212]">
        {editingPostId === post._id ? (
          <EditPost
            title={post.title}
            content={post.content}
            tags={post.tags}
            postId={post._id}
            setEditingPostId={setEditingPostId}
            onUpdatePost={onEdit}
          />
        ) : (
          <div className="space-y-2">
            <h2 className="font-extrabold text-white text-lg leading-tight tracking-tight">
              {post.title}
            </h2>
            <div className="relative">
              <p
                className={`text-gray-300 text-sm leading-relaxed whitespace-pre-line transition-all duration-300
              ${!isExpanded && isLong ? "line-clamp-2" : ""}`}
              >
                {contentText}
              </p>
              {isLong && (
                <span
                  onClick={() =>
                    setExpandedPost(expandedPost === post._id ? null : post._id)
                  }
                  className="cursor-pointer font-bold text-gray-500 hover:text-white text-[11px] uppercase mt-1 inline-block transition-all"
                >
                  {isExpanded ? "Show less" : "... Read more"}
                </span>
              )}
              <p className="text-blue-500 text-xs font-semibold mt-2 tracking-wide uppercase">
                {post.tags || ""}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Actions Row */}
      <div className="flex justify-between items-center p-4 border-t border-gray-900 bg-[#121212]">
        <Like post={post} currentUserId={creator._id} />
        <Comment postId={post._id} isOwner={isOwner} />
      </div>
    </div>
  );
};

export default PostCard;

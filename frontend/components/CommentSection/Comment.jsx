import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import ReplyComment from "./ReplyComment";
import CommentForm from "./CommentForm";
import ProfileImage from "../ProfileImage/ProfileImage";

const Comment = ({ postId, isOwner }) => {
  const router = useRouter();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllcomments] = useState([]);

  console.log("the owner is :- ", isOwner);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/comments/get/${postId}/getComments`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setAllcomments(res.data.comments);
      } catch (err) {
        console.log("the error is : ", err);
      }
    };
    
    fetchComment();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `http://localhost:5000/api/comments/post/${postId}/comment`,
      { text: comment },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setAllcomments((prev) => [...(prev || []), res.data.comment]);
    setComment("");
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `http://localhost:5000/api/comments/delete/${postId}/${commentId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    toast.success(res.data.message);
  };

  return (
    <>
      <div
        onClick={() => setShowComments(true)}
        className="text-sm font-medium text-gray-400 cursor-pointer hover:text-white transition-colors duration-200"
      >
        {allComments?.length || 0} Comments
      </div>

      {showComments && (
        <div className="absolute inset-0 bg-[#121212] z-50 flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-800 bg-[#1a1a1a]">
            <IoMdArrowBack
              onClick={() => setShowComments(false)}
              className="cursor-pointer text-xl text-white hover:scale-110 transition-transform"
            />
            <h1 className="text-md font-bold text-white">Comments</h1>
          </div>

          {/* Comments list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
            {allComments.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-gray-500 text-sm">
                <p>No comments yet.</p>
                <p className="text-xs">Start the conversation!</p>
              </div>
            ) : (
              allComments.map((u) => (
                <div
                  key={u._id}
                  className="group flex flex-col gap-1 border-b border-gray-900 pb-3 last:border-0"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <ProfileImage
                        src={u.user?.profileImage}
                        alt={u.user?.username}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-800"
                      />
                      <div className="flex flex-col min-w-0">
                        <span
                          onClick={() =>
                            router.push(`/creator/${u.user?.username}`)
                          }
                          className="cursor-pointer text-[12px] font-bold text-gray-300"
                        >
                          {u.user?.username}
                        </span>
                        <p className="text-sm text-gray-100 break-words leading-relaxed">
                          {u.text}
                        </p>
                      </div>
                    </div>
                    {/* Delete only if logic allows, simplified UI here */}
                      <button
                        onClick={() => handleDeleteComment(u._id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-600 hover:text-red-500 transition-all"
                      >
                        <MdDelete size={16} />
                      </button>
                  </div>

                  {/* Nested Replies Component */}
                  <div className="ml-11">
                    <ReplyComment postId={postId} commentId={u._id} isOwner={isOwner} />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input field Footer */}
          <div className="p-3 bg-[#1a1a1a] border-t border-gray-800">
            <CommentForm
              ParentId={null}
              onCommentSub={handleSubmit}
              comment={comment}
              setComment={setComment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;

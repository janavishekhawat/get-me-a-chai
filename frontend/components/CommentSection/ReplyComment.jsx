import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import CommentForm from "./CommentForm";
import { toast } from "react-hot-toast";
import axios from "axios";
import ProfileImage from "../ProfileImage/ProfileImage";

const ReplyComment = ({ postId, commentId, isOwner }) => {
  const [allComments, setAllComments] = useState([]);
  const [openBox, setOpenBox] = useState(false);
  const [rcomment, setrcomments] = useState("");

  const handleGetComments = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `http://localhost:5000/api/comments/get/${postId}/${commentId}/getReplies`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setAllComments(res.data.AllReplys);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `http://localhost:5000/api/comments/post/${postId}/${commentId}`,
      { text: rcomment },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setAllComments((prev) => [...(prev || []), res.data.rcomment]);
    setrcomments("");
  };

  const handleDeleteReply = async (replyId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:5000/api/comments/delete-reply/${postId}/${commentId}/${replyId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(res.data.message);
    } catch (error) {
      console.log("the error is : ", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-1">
      <button
        onClick={() => {
          if (!openBox) handleGetComments();
          setOpenBox(!openBox);
        }}
        className="text-[11px] font-bold text-gray-500 hover:text-white transition-colors"
      >
        {openBox ? "Hide replies" : "View replies"}
      </button>

      {openBox && (
        <div className="mt-2 space-y-3 border-l border-gray-800 pl-3">
          {allComments.length > 0 &&
            allComments.map((u) => (
              <div key={u._id} className="flex gap-2 items-start group">
                <ProfileImage
                  src={u.user?.profileImage}
                  alt={u.user?.username}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-gray-400">
                    {u.user?.username}
                  </p>
                  <p className="text-xs text-gray-200">{u.text}</p>
                </div>
                  <button
                    onClick={() => handleDeleteReply(u._id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-600 hover:text-red-500 transition-all"
                  >
                    <MdDelete size={16} />
                  </button>
              </div>
            ))}

          {/* Mini Input for Reply */}
          <div className="pt-1">
            <CommentForm
              commentId={commentId}
              onReplySub={handleSubmit}
              comment={rcomment}
              setComment={setrcomments}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyComment;

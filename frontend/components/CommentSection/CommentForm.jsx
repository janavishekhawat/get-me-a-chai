import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import ProfileImage from "../ProfileImage/ProfileImage";

const CommentForm = ({
  ParentId,
  onCommentSub,
  onReplySub,
  comment,
  setComment,
}) => {
  const { user } = useSelector((state) => state.auth);
  console.log("the user is :- ", user);

  return (
    <div>
      <div className="mt-4 pt-3 border-t border-gray-700">
        <form
          onSubmit={ParentId === null ? onCommentSub : onReplySub}
          className="flex items-center gap-3 bg-gray-900 p-3 rounded-xl"
        >
          <input
            type="text"
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm px-2"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all duration-200"
          >
            <IoSend className="text-white text-lg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;

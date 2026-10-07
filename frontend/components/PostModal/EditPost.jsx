"use client";

import React, { useState } from "react";

const EditPost = ({ title, content, tags, postId, setEditingPostId, onUpdatePost }) => {
  const [localTitle, setLocalTitle] = useState(title);
  const [localContent, setLocalContent] = useState(content);
  const [localTags, setLocalTags] = useState(tags);

  const handleSubmit = (e) => {
    e.preventDefault();

    // send data to parent
    onUpdatePost(postId, {
      title: localTitle,
      content: localContent,
      tags: localTags,
    });

    setEditingPostId(null);
  };

  return (
    <>
      <form className="w-full space-y-3" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          className="w-full bg-gray-50/50 border border-[#E5E7EB] p-4 rounded-2xl text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2F80ED] transition-all"
        />

        <label>Content:</label>
        <textarea
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          className="w-full bg-gray-50/50 border border-[#E5E7EB] p-4 rounded-2xl text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2F80ED] transition-all resize-none"
          rows={5}
        />

        <label>Tags:</label>
        <input
          value={localTags}
          onChange={(e) => setLocalTags(e.target.value)}
          className="w-full bg-gray-50/50 border border-[#E5E7EB] p-4 rounded-2xl text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2F80ED] transition-all"
        />

        <div className="w-full flex flex-col sm:flex-row justify-around">
          <button
            type="button"
            onClick={() => setEditingPostId(null)}
            className="cursor-pointer w-1/3 border rounded-2xl p-1 px-2 hover:bg-gray-800 transition-all duration-200"
          >
            cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer w-1/3 border rounded-2xl p-1 px-2 bg-blue-500 hover:bg-blue-800 transition-all duration-200"
          >
            submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditPost;

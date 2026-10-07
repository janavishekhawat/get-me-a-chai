"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineCloudUpload } from "react-icons/md";
import { PostContext } from "@/components/Providers/post-provider";

const CreatingPost = () => {
  const router = useRouter();
  const { setPostData } = useContext(PostContext);

  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  // ==========================
  // Mount + restore draft
  // ==========================
  useEffect(() => {
    setMounted(true);

    const savedDraft = localStorage.getItem("postDraft");
    if (!savedDraft) return;

    const draft = JSON.parse(savedDraft);
    setTitle(draft.title || "");
    setContent(draft.content || "");
    setCategory(draft.category || "");
    setOtherCategory(draft.otherCategory || "");
    setTags(draft.tags || "");
  }, []);

  // ==========================
  // Save draft (NO image)
  // ==========================
  useEffect(() => {
    if (!mounted) return;

    const draft = {
      title,
      content,
      category,
      otherCategory,
      tags,
    };
    localStorage.setItem("postDraft", JSON.stringify(draft));
  }, [title, content, category, otherCategory, tags, mounted]);

  // ==========================
  // Image handler
  // ==========================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== "other") setOtherCategory("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image again");
      return;
    }

    const finalCategory = category === "other" ? otherCategory : category;

    setPostData({
      title,
      content,
      image,
      category: finalCategory,
      tags,
    });

    router.push("/creator/createPost/preview");
  };

  if (!mounted) return null;

  return (
    <div className="bg-[#FFF8F2] min-h-screen flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Create a New Post</h1>
      <p className="text-gray-400 mb-8">Share your creation</p>

      <div className="bg-white py-2 md:p-10 rounded-3xl max-w-5xl w-full shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col items-center md:flex-row gap-10">
          {/* IMAGE */}
          <div className="w-2/5">
            <label className="font-bold text-sm">Cover Image</label>

            <div className="mt-3 h-[380px] rounded-2xl border-2 border-dashed flex items-center justify-center bg-gray-50 overflow-hidden relative">
              <input
                type="file"
                accept="image/*"
                hidden
                id="imageUpload"
                onChange={handleImageChange}
              />

              {!preview ? (
                <label
                    htmlFor="imageUpload"
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                  >
                    <div className="bg-white p-5 rounded-full shadow-sm text-[#2F80ED] text-4xl mb-4 group-hover:scale-110 transition-transform">
                      <MdOutlineCloudUpload />
                    </div>
                    <p className="font-bold text-[#2F80ED] text-lg">Upload Media</p>
                    {/* <p className="text-sm text-gray-400 mt-1">
                      Drag and drop or click to browse
                    </p> */}
                  </label>
              ) : (
                <>
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-contain bg-gray-100"
                  />

                  <label
                    htmlFor="imageUpload"
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-gray-700 cursor-pointer hover:bg-white shadow-sm transition-all"
                  >
                    Replace Image
                  </label>
                </>
              )}
            </div>

            {!image && (
              <p className="text-xs text-red-400 mt-2">
                Image must be reselected after refresh
              </p>
            )}
          </div>

          {/* DETAILS */}
          <div className="w-3/5 space-y-5">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="w-full bg-gray-50/50 border border-[#E5E7EB] p-4 rounded-2xl text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2F80ED] transition-all"
              required
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write something..."
              className="w-full bg-gray-50/50 border border-[#E5E7EB] p-4 rounded-2xl text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2F80ED] transition-all"
              rows={5}
            />

            <div className="flex gap-4">
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full bg-gray-50/50 border border-[#E5E7EB] p-4 rounded-2xl text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2F80ED] transition-all"
              >
                <option value="">Select category</option>
                <option value="nature">Nature</option>
                <option value="painting">Painting</option>
                <option value="abstract">Abstract</option>
                <option value="other">Other</option>
              </select>

              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags"
                className="w-full bg-gray-50/50 border border-[#E5E7EB] p-4 rounded-2xl text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2F80ED] transition-all"
              />
            </div>

            {category === "other" && (
              <input
                value={otherCategory}
                onChange={(e) => setOtherCategory(e.target.value)}
                placeholder="Custom category"
                className="w-full bg-gray-50/50 border border-[#E5E7EB] p-4 rounded-2xl text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2F80ED] transition-all"
              />
            )}

            <button
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue to Preview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatingPost;
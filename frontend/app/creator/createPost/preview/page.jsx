"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "@/components/Providers/post-provider";
import { toast } from "react-hot-toast";
import { apiConnector } from "@/services/apiconnector";
import { creatorEndpoints } from "@/services/api";
import { useRouter } from "next/navigation";

const { CREATE_POST_API } = creatorEndpoints;

/* ===========================
   REAL CROP USING CANVAS
=========================== */
const getCroppedImageBlob = async (imageSrc, cropX, cropY) => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const size = Math.min(image.naturalWidth, image.naturalHeight);

  const centerX = (cropX / 100) * image.naturalWidth;
  const centerY = (cropY / 100) * image.naturalHeight;

  const sx = Math.max(0, centerX - size / 2);
  const sy = Math.max(0, centerY - size / 2);

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, sx, sy, size, size, 0, 0, size, size);

  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.95)
  );
};

const PreviewPost = () => {
  const { postData, setPostData } = useContext(PostContext);
  const [mounted, setMounted] = useState(false);

  const [cropX, setCropX] = useState(50);
  const [cropY, setCropY] = useState(50);
  const [dragging, setDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const cropStart = useRef({ x: 50, y: 50 });

  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted || !postData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        No post data
        <button
          onClick={() => window.history.back()}
          className="text-blue-600 mt-2"
        >
          Back
        </button>
      </div>
    );
  }

  const imageUrl =
    postData.image instanceof File
      ? URL.createObjectURL(postData.image)
      : postData.image;

  /* ===========================
     DRAG LOGIC (SAFE & SIMPLE)
  =========================== */
  const handleMouseDown = (e) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    cropStart.current = { x: cropX, y: cropY };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    setCropX(Math.min(100, Math.max(0, cropStart.current.x - dx * 0.1)));
    setCropY(Math.min(100, Math.max(0, cropStart.current.y - dy * 0.1)));
  };

  const stopDrag = () => setDragging(false);

  /* ===========================
     CONFIRM & UPLOAD
  =========================== */
  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const croppedBlob = await getCroppedImageBlob(imageUrl, cropX, cropY);

      const croppedFile = new File([croppedBlob], "post.jpg", {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("postimage", croppedFile);
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("category", postData.category);
      formData.append("tags", postData.tags);

      await apiConnector("POST", CREATE_POST_API, formData, {
        Authorization: `Bearer ${token}`,
      });

      toast.success("Post created");
      setPostData(null);
      router.push(`/creator/${user.username}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#fff7f9] flex justify-center pt-10"
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      <div className="w-full max-w-md">
        <div className="bg-[#1a1a1a] border border-gray-800 overflow-hidden rounded-xl">
          <div className="p-3 text-white font-semibold">Preview</div>

          {/* IMAGE PREVIEW */}
          <div
            className="w-full aspect-square bg-black overflow-hidden cursor-grab"
            onMouseDown={handleMouseDown}
          >
            <img
              src={imageUrl}
              alt="preview"
              className="w-full h-full object-cover select-none"
              style={{
                objectPosition: `${cropX}% ${cropY}%`,
              }}
              draggable={false}
            />
          </div>

          <div className="p-3 text-white">
            <h2 className="font-bold">{postData.title}</h2>
            <p className="text-gray-400 text-sm">{postData.content}</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => window.history.back()}
            className="flex-1 bg-gray-200 py-4 rounded-xl"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-blue-600 text-white py-4 rounded-xl"
          >
            Confirm & Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPost;

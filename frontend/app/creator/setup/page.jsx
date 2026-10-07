"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { profileEndpoints } from "@/services/api";
import { useDispatch } from "react-redux";
import { setup } from "@/services/operations/setupAPI";
import {
  MdOutlineCloudUpload,
  MdAccountCircle,
  MdOutlineDescription,
} from "react-icons/md";
import ProfileImage from "@/components/ProfileImage/ProfileImage";

const { GET_USER_PROFILE_API } = profileEndpoints;

const CreatorSetup = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [bio, setBio] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [upi, setUpi] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isChanges, setisChanges] = useState(false);

  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }
        const res = await axios.get(GET_USER_PROFILE_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const u = res.data?.user;
        const profile = u?.profile;
        setBio(profile?.bio || "");
        setGoalAmount(profile?.goalAmount || "");
        setUpi(profile?.upi || "");
        setProfileImage(u?.profileImage || "");
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
    setisChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalFile = null;

      // ONLY attempt cropping if the user actually uploaded/changed a file
      if (isChanges && preview) {
        // 1. Generate the cropped file
        const croppedBlob = await getCroppedBlob(
          preview,
          position.x,
          position.y,
        );
        finalFile = new File([croppedBlob], "profile.jpg", {
          type: "image/jpeg",
        });
      } else {
        // If no changes, pass null or 'default' so the backend knows to ignore it
        finalFile = null;
      }

      // 2. Dispatch with the file (will be null if they didn't upload anything)
      const res = await dispatch(setup(bio, goalAmount, upi, finalFile));

      if (res?.success && res.username) {
        router.push(`/creator/${res.username}`);
      }
    } catch (err) {
      console.error("CROP ERROR:", err);
      alert("Failed to save profile changes");
    }
  };

  const handleStart = (e) => {
    setIsDragging(true);
    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    setOffset({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    const isTouch = e.type === "touchmove";
    const moveX = isTouch ? e.touches[0].clientX - offset.x : e.movementX;
    const moveY = isTouch ? e.touches[0].clientY - offset.y : e.movementY;
    setPosition((prev) => ({
      x: Math.max(
        0,
        Math.min(100, prev.x + (isTouch ? moveX * 0.1 : moveX * 0.5)),
      ),
      y: Math.max(
        0,
        Math.min(100, prev.y + (isTouch ? moveY * 0.1 : moveY * 0.5)),
      ),
    }));
  };

  const handleEnd = () => setIsDragging(false);

  const getCroppedBlob = async (imageSrc, posX, posY) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const size = 400; // Standard high-quality profile size
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Calculate aspect ratios to match 'object-cover' logic
    const imgRatio = image.naturalWidth / image.naturalHeight;
    let sourceWidth, sourceHeight, sx, sy;

    if (imgRatio > 1) {
      // Landscape: Height is the constraint
      sourceHeight = image.naturalHeight;
      sourceWidth = image.naturalHeight;
      sy = 0;
      sx = (posX / 100) * (image.naturalWidth - sourceWidth);
    } else {
      // Portrait: Width is the constraint
      sourceWidth = image.naturalWidth;
      sourceHeight = image.naturalWidth;
      sx = 0;
      sy = (posY / 100) * (image.naturalHeight - sourceHeight);
    }

    ctx.drawImage(image, sx, sy, sourceWidth, sourceHeight, 0, 0, size, size);

    return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.95));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  console.log("what is the preview we are getting", preview);

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-black to-black text-white flex items-center justify-center px-4 py-12">
      <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl w-full max-w-lg shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Creator Setup
          </h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Fine-tune your public profile presence
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-4">
            <div
              onMouseDown={handleStart}
              onTouchStart={handleStart}
              onMouseMove={handleMove}
              onTouchMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchEnd={handleEnd}
              className="group relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#1a1a1a] ring-2 ring-orange-500/20 overflow-hidden cursor-move shadow-2xl transition-transform hover:scale-[1.02]"
            >
              <ProfileImage
                src={isChanges ? preview : profileImage}
                alt="Profile Preview"
                style={{ objectPosition: `${position.x}% ${position.y}%` }}
                className="absolute w-full h-full"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  Drag to position
                </span>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              hidden
              id="imageUpload"
              onChange={handleImageChange}
            />
            <label
              htmlFor="imageUpload"
              className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-xs font-bold cursor-pointer hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-95"
            >
              <MdOutlineCloudUpload size={18} />
              Change Photo
            </label>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="relative">
              <label className="text-[11px] font-bold text-gray-500 uppercase ml-1 mb-1 block tracking-wider">
                Bio
              </label>
              <div className="relative">
                <MdOutlineDescription className="absolute left-3 top-3.5 text-gray-500" />
                <textarea
                  placeholder="Tell your fans something about yourself..."
                  className="w-full bg-[#1c1c1c] p-3 pl-10 rounded-2xl border border-white/5 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all h-28 outline-none text-sm leading-relaxed"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-[11px] font-bold text-gray-500 uppercase ml-1 mb-1 block tracking-wider">
                  Goal Amount
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-[#1c1c1c] p-3 pl-8 rounded-2xl border border-white/5 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-sm"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-[11px] font-bold text-gray-500 uppercase ml-1 mb-1 block tracking-wider">
                  UPI ID
                </label>
                <div className="relative flex items-center">
                  <MdAccountCircle className="absolute left-3 text-gray-500" />
                  <input
                    type="text"
                    placeholder="name@upi"
                    className="w-full bg-[#1c1c1c] p-3 pl-10 rounded-2xl border border-white/5 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-sm"
                    value={upi}
                    onChange={(e) => setUpi(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="group relative bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-400 hover:to-orange-600 p-4 rounded-2xl font-bold mt-2 shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] transition-all active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              Save Profile Changes
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatorSetup;

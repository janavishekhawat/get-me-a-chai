"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import axios from "axios";
import ProfileImage from "./ProfileImage/ProfileImage";

const Navbar = () => {
  const navRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [OpenList, setOpenList] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [openSearchList, setOpenSearchList] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const handleSearch = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/auth`);
      return;
    }
    const name = username.trim();
    if (!name) return;
    router.push(`/creator/${encodeURIComponent(name)}`);
    setUsername("");
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setUsername(value);
    if (value.trim().length > 0) {
      const res = await axios.get(
        `http://localhost:5000/api/creator/searchWord/${value}`,
      );
      setOpenSearchList(true);
      setSearchResults(res.data.selectedName);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="w-full h-[70px] fixed flex flex-row items-center justify-between top-0 left-0 z-50 transition-all duration-500 px-6 md:px-16"
        style={{
          backgroundColor: isHome
            ? scrolled
              ? "#FDFBF7"
              : "transparent"
            : "#FDFBF7",
          boxShadow:
            scrolled || !isHome ? "0 4px 12px -2px rgba(0,0,0,0.08)" : "none",
          borderBottom:
            scrolled || !isHome ? "1px solid rgba(0,0,0,0.05)" : "none",
        }}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/TeaLogo.png"
            alt="Navbar-logo"
            width={85}
            height={40}
            className="cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex w-full max-w-[350px] relative"
        >
          <IoSearch className="absolute text-gray-400 left-4 top-1/2 -translate-y-1/2 text-[20px]" />
          <input
            type="text"
            value={username}
            onChange={handleChange}
            placeholder="Search creators..."
            className="w-full pl-11 pr-4 h-[44px] rounded-full border border-gray-200 bg-[#F5F1EB] text-gray-800 placeholder-gray-400 
    outline-none focus:border-[#C47A2C] focus:ring-4 focus:ring-[#C47A2C]/10 transition-all duration-300 shadow-sm"
          />

          {/* ✅ Search Results Dropdown - UI IMPROVED */}
          {openSearchList && searchResults.length > 0 && (
            <div className="absolute top-[50px] left-0 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="py-2">
                {searchResults.map((u) => (
                  <div
                    key={u._id}
                    onClick={() => {
                      router.push(`/creator/${encodeURIComponent(u.username)}`);
                      setOpenSearchList(false);
                      setUsername("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#FDFBF7] cursor-pointer transition-colors duration-200 group"
                  >
                    <div className="relative w-10 h-10 shrink-0">
                      <ProfileImage
                        src={u.profileImage}
                        alt={u.username}
                        className="w-full h-full rounded-full object-cover border border-gray-100 shadow-sm group-hover:border-[#C47A2C]/30 transition-all"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-[#C47A2C] transition-colors">
                        {u.username}
                      </p>
                      <p className="text-[12px] text-gray-400">
                        View Creator Profile
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <Link href="/explore">
            <button className="px-6 py-2.5 rounded-full font-medium text-white bg-[#eba030] hover:bg-[#d48b1a] transition-all duration-300 shadow-md active:scale-95">
              Explore
            </button>
          </Link>
          {isLoggedIn ? (
            <div
              onClick={() => setOpenList(true)}
              className="flex items-center justify-center p-2 rounded-full cursor-pointer text-gray-500 hover:text-black hover:bg-gray-200 transition-all duration-300 ease-out"
            >
              <FaBars className="transition-colors duration-300 ease-out" />
            </div>
          ) : (
            <div className="flex flex-row gap-3">
              <Link href="/auth">
                <button className="px-6 py-2.5 rounded-full font-medium text-white bg-[#7A6A64] hover:bg-[#5d514c] transition-all duration-300 active:scale-95">
                  Log in
                </button>
              </Link>

              <Link href="/auth">
                <button className="px-6 py-2.5 rounded-full font-medium text-white bg-[#eba030] hover:bg-[#d48b1a] transition-all duration-300 shadow-md active:scale-95">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar Overlay Logic */}
      {OpenList && (
        <div className="fixed top-0 left-0 w-full h-screen z-[100] flex justify-end">
          {/* Transparent Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300"
            onClick={() => setOpenList(false)}
          />

          {/* Sidebar Container */}
          <div className="fixed top-0 right-0 bg-white h-screen shadow-2xl w-full sm:max-w-[350px] z-[110] flex flex-col border-l border-gray-100">
            {/* ✅ Sidebar Header: Menu Name + Cut Sign */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 ml-2">Menu</h2>

              <button
                className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition-all duration-200"
                onClick={() => setOpenList(false)}
              >
                <span className="text-2xl font-light">✕</span>
              </button>
            </div>

            {/* Sidebar Content (Tumhara Sidebar component yahan aayega) */}
            <div className="flex-1 overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

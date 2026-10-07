import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { SiYoutube } from "react-icons/si";
import { LuInstagram } from "react-icons/lu";
import { FaLinkedinIn } from "react-icons/fa6";


const Footer = () => {
  return (
    <div className="flex flex-row gap-6 p-7 text-center justify-evenly items-center mt-5 mb-10">
      <div>
        <p className="text-[#717171]">© Get me a Chai</p>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 text-center">
        <Link href="/About" className="text-black font-bold text-[14px] hover:text-[#717171] transition-all duartion-300">About US</Link>
        <Link href="/ContactUs" className="text-black font-bold text-[14px] hover:text-[#717171] transition-all duartion-300">Contact Us</Link>
        <Link href="/Privacy" className="text-black font-bold text-[14px] hover:text-[#717171] transition-all duartion-300">Privacy Policy</Link>
        <Link href="/Term&condition" className="text-black font-bold text-[14px] hover:text-[#717171] transition-all duartion-300">Terms & Conditions</Link>
        <Link href="/Cancellation&Refund" className="text-black font-bold text-[14px] hover:text-[#717171] transition-all duartion-300">Cancellation & Refund Policies</Link>
      </div>

      <div className="flex flex-row gap-5 justify-center items-center text-black">
        <FaXTwitter className="w-6 h-6 cursor-pointer hover:scale-120 transition-all duration-300"/>
        <SiYoutube className="w-6 h-6 cursor-pointer hover:scale-120 transition-all duration-300"/>
        <LuInstagram className="w-6 h-6 cursor-pointer hover:scale-120 transition-all duration-300"/>
        <FaLinkedinIn className="w-6 h-6 cursor-pointer hover:scale-120 transition-all duration-300"/>
      </div>
    </div>
  );
};

export default Footer;

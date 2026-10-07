"use client";

import React from "react";
import { BsStars } from "react-icons/bs";
import { useRouter } from "next/navigation";
import SupportChai from "./SupportChai"
import ForCreator from "./ForCreator";
import PlatformCard from './PlatformCard'

const Manager = () => {
  const router = useRouter();

  const handleStart = () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      router.push("/auth?redirectTo=/manager");
    } else {
      router.push("/authz");
    }
  };
  return (
    <div className="w-full overflow-x-hidden">
      <div className="w-full h-screen relative">
        <img
          src="/assets/Hello.png"
          alt="PinkCup"
          loading="lazy"
          className="w-full h-full object-cover inset-0 absolute z-10"
        />
        <div className="bg-black absolute inset-0 opacity-50 z-20"></div>

        <div className="absolute inset-0 z-30 h-full w-full flex flex-col gap-6 justify-center items-center">
          <div className="flex items-center gap-2 py-2 px-4 bg-[#e09f11] rounded-4xl text-[#4A3F35]">
            <BsStars className="text-[20px] font-bold"/>
            <p className="font-bold">
              Support creators you love
            </p>
          </div>
          <p className="text-6xl font-bold w-[40%] text-center">A <span className="text-[#eba030]">chai</span> for your favorite creators</p>
          <p className="text-xl w-[50%] text-center text-[#edeada]">
            The simplest way to support creators with a warm cup of chai. Share
            your work, receive support, and build a community that cares.
          </p>
          <div className="flex flex-row gap-4">
            <button className="bg-[#7A6A64] py-3 px-5 text-[18px] rounded-full font-bold text-white shadow-md hover:bg-[#655651] hover:shadow-lg active:scale-90 transition-all duration-300 cursor-pointer">Support with Chai</button>
            <button
             className="border-3 border-[#eba030] py-3 px-5 text-[18px] rounded-full font-bold text-[#eba030] shadow-md hover:bg-[#eba030] hover:text-white hover:shadow-lg active:scale-90 transition-all duration-300 cursor-pointer">Explore Creator</button>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <SupportChai
          heading="Support"
          title1={
            <>
              Give your audience <br/> an easy way to say thanks.
            </>
          }
          title2="Get Me a Chai makes supporting fun and easy. In just a couple of taps, 
          your fans can make the payment (buy you a coffee) and leave a message."
          title2Class="w-[90%]"
          image="/assets/Support.png"
        />

        <SupportChai
          heading="Memberships"
          title1={
            <>
              Start a membership for <br/> your biggest fans.
            </>
          }
          title2="Earn a recurring income by accepting monthly or yearly subscriptions. Share exclusive 
          content, or just give them a way to support your work on an ongoing basis."
          title2Class="w-[60%]"
          image="/assets/membership.png"
        />

        <SupportChai
          heading="Posts, audio & email"
          title1={"Publish your best work"}
          title2="Get Me a Chai makes it easy to publish free and exclusive content. Try different formats such 
          as audio, and make it members-only to drive more memberships."
          title2Class="w-[90%]"
          image="/assets/content.png"
        />

        <ForCreator/>

        <PlatformCard/>
      </div>
    </div>
  );
};

export default Manager;

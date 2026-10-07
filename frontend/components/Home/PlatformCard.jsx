"use client";

import { BsCalendar3 } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { TfiEmail } from "react-icons/tfi";
import { IoHeartCircleOutline } from "react-icons/io5";
import { BsShieldLock } from "react-icons/bs";

const PlatformData = [
  {
    id: 1,
    icon: BsCalendar3,
    heading: "Not just a membership",
    text: "Creators who previously only used Patreon noticed a massive increase in earnings after accepting one-off payments.",
  },
  {
    id: 2,
    icon: AiOutlineGlobal,
    heading: "6 new languages",
    text: "We now support Spanish, French, Italian, German and Ukrainian making it easier for your global audience to support you.",
  },
  {
    id: 3,
    icon: TfiEmail,
    heading: "Email marketing",
    text: "Instead of paying separately for email marketing tools like Mailchimp, send unlimited emails to your fans for free.",
  },
  {
    id: 4,
    icon: IoHeartCircleOutline,
    heading: "Being friendly converts",
    text: "ICYMI, we make it simple and fun for your supporters. While you cannot put a number on feelings, it tends to show on the results.",
  },
  {
    id: 5,
    icon: BsShieldLock,
    heading: "Your privacy comes first",
    text: "Receive fan support safely without disclosing your identity or address. We’ll do the heavy-lifting.",
  },
];

function PlatformCard() {
  return (
    <div className="w-[85%] mx-auto bg-white flex flex-col gap-20 px-10  py-12 justify-center items-center rounded-[50px] shadow-lg mt-32 mb-10">
      <div className="flex flex-col justify-center items-center text-center gap-5">
        <h1 className="text-black font-bold text-6xl">Make 20% or more,</h1>
        <h1 className="text-[#717171] font-bold text-6xl">
          compared to other platforms.
        </h1>
      </div>

      <div className="grid grid-cols-3 justify-center place-items-center gap-10">
        {PlatformData.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.id} className="flex flex-col justify-start gap-3 w-[75%]">
              <Icon className="w-10 h-10 text-black"/>
              <p className="text-black text-[20px] font-bold">
                {item.heading}
              </p>
              <p className="text-[#717171] text-[20px]">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlatformCard;

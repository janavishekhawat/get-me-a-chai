"use client";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";

function ForCreator() {
  return (
    <div className="w-[60%] mx-auto mt-24 flex flex-col gap-20 justify-center items-center">
      {/* Heading */}
      <div className="flex flex-col gap-5 justify-center items-center text-center">
        <h1 className="text-black font-bold text-6xl">
          Designed for creators,
        </h1>
        <h2 className="text-[#717171] font-bold text-6xl">
          not for businesses.
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-row gap-20">
        {/* Left column */}
        <div className="flex flex-col gap-12 w-[50%]">
          <div className="flex items-start gap-4">
            <IoIosCheckmarkCircleOutline className="w-10 h-10 text-black mt-1 shrink-0" />
            <p className="text-[#717171] text-[22px] leading-relaxed">
              We don't call them "customers" or transactions. They are your{" "}
              <span className="text-black font-bold">supporters.</span>
            </p>
          </div>

          <div className="flex items-start gap-4">
            <IoIosCheckmarkCircleOutline className="w-10 h-10 text-black mt-1 shrink-0" />
            <p className="text-[#717171] text-[22px] leading-relaxed">
              You get to{" "}
              <span className="text-black font-bold">talk to a human</span> for
              help, or if you just like some advice to hit the ground running.
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="w-[50%] flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <IoIosCheckmarkCircleOutline className="w-10 h-10 text-black mt-1 shrink-0" />
            <p className="text-[#717171] text-[22px] leading-relaxed">
              You have{" "}
              <span className="text-black font-bold">100% ownership</span> of
              your supporters. We never email them, and you can export the list
              any time you like.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <IoIosCheckmarkCircleOutline className="w-10 h-10 text-black mt-1 shrink-0" />
            <p className="text-[#717171] text-[22px] leading-relaxed">
              You get paid instantly to your bank account.{" "}
              <span className="text-black font-bold">
                No more 30-day delays.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForCreator;

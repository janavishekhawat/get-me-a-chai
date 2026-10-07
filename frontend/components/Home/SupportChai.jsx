"use client";
import Image from "next/image";


function SupportChai ({MainClass, heading, headingClassName, title1, title1Class, title2, title2Class, image}) {
    return(
        <div className={`w-[75%] mx-auto bg-white flex flex-col gap-5 px-10 py-12 justify-center items-center rounded-[50px] shadow-lg mt-20 ${MainClass}`}>
            <p className={`text-[#717171] uppercase font-bold ${headingClassName}`}>{heading}</p>

            <h1 className={`text-black text-6xl font-bold text-center ${title1Class}`}>{title1}</h1>

            <p className={`text-black text-[25px]  text-center ${title2Class}`}>{title2}</p>
            
            <Image
                src={image}
                alt="Support"
                width={800}
                height={10}
                className="object-cover"
                draggable="false"
            />
        </div>
    )
}

export default SupportChai
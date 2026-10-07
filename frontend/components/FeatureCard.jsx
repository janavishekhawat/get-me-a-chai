import React from "react";

const FeatureCard = ({ icon: Icon, title1, title2, description }) => {
  return (
    <div className="support bg-amber-950 cursor-pointer text-center w-3/5 flex flex-col items-center p-7 border-t-8 border-amber-600 rounded-3xl transform transition duration-400 hover:scale-105 hover:shadow-2xl">
      <Icon className="text-amber-500 text-8xl mb-2" />
      <h1 className="text-xl font-bold">{title1}</h1>
      <h1 className="text-xl font-bold">{title2}</h1>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default FeatureCard;

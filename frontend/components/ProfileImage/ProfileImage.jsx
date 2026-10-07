import Image from "next/image";

const ProfileImage = ({ src, alt, className = "w-10 h-10", style, draggable = false }) => {
  // If src is null/empty, use local fallback. Otherwise, point to the backend server.
  const imageSource = !src
    ? "/blank-profile.png"
    : (src.startsWith("http") || src.startsWith("blob"))
    ? src
    : `http://localhost:5000/${src.replace(/\\/g, "/")}`;

  return (
    <div 
      className={`relative overflow-hidden rounded-full shrink-0 ${className}`} 
      style={style}
    >
      <Image
        src={imageSource}
        alt={alt || "User Profile"}
        fill
        className="object-cover text-transparent"
        style={style}
        draggable={draggable}
        unoptimized
      />
    </div>
  );
};

export default ProfileImage;
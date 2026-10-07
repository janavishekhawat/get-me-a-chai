"use client";

const ConnectionModel = ({
  postsCount,
  followersCount,
  followingCount,
  onFollowersClick,
  onFollowingClick,
}) => {
  return (
    <div className="text-gray-400 text-xs md:text-sm mb-8 flex flex-wrap items-center justify-center gap-3">
      
      {/* Posts */}
      <span className="bg-[#141414] border border-white/5 px-4 py-2 rounded-full font-light tracking-wide select-none">
        <strong className="text-white font-semibold">{postsCount || 0}</strong> Posts
      </span>

      {/* Followers */}
      <span
        className="bg-[#141414] border border-white/5 px-4 py-2 rounded-full cursor-pointer hover:border-orange-500/30 hover:bg-[#1a1a1a] transition-all duration-200 font-light tracking-wide select-none"
        onClick={onFollowersClick}
      >
        <strong className="text-white font-semibold">{followersCount || 0}</strong> Followers
      </span>

      {/* Following */}
      <span
        className="bg-[#141414] border border-white/5 px-4 py-2 rounded-full cursor-pointer hover:border-orange-500/30 hover:bg-[#1a1a1a] transition-all duration-200 font-light tracking-wide select-none"
        onClick={onFollowingClick}
      >
        <strong className="text-white font-semibold">{followingCount || 0}</strong> Following
      </span>

    </div>
  );
};

export default ConnectionModel;
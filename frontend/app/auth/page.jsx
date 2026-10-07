"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthToken } from "@/components/Providers/AuthProvider";
import { login } from "../../services/operations/authAPI";
import { signup } from "../../services/operations/authAPI";
import { IoIosMail } from "react-icons/io";
import { TiLockClosed } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { User } from "lucide-react";

const AuthPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [Login, setLogin] = useState(true);
  const router = useRouter();
  const { saveToken } = useAuthToken();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const { username, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();  
    if (!Login && password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      let res;
      if (Login) {
        console.log("request is going for login");
        res = await dispatch(login(email, password));
        saveToken(res.data.token);
        router.push(`/creator/${res.data.user.username}`);
      } else {
        console.log("request is going for signup");
        res = await dispatch(
          signup(username, email, password, confirmPassword)
        );

        if (!res) return; // 👈 safety check

        saveToken(res.data.token);
        router.push(`/creator/setup`);
      }
    } catch (error) {
      console.log("error during submittion : ", error);
      // if (error.response?.data?.message) {
      //   toast.error(error.response.data.message);
      // } else {
      //   toast.error("Something went wrong!");
      // }
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="w-full min-h-screen overflow-y-auto relative flex justify-center items-center"
    >
      <img
        src="/assets/bg-chai.png"
        alt="Chai"
        loading="lazy"
        className="w-full h-full object-cover blur-sm absolute"
      />
      <div className="w-[60%] h-[60%] absolute  flex flex-row">
        <img
          src="/assets/bg-chai.png"
          alt="Chai-Cup"
          loading="lazy"
          className="w-[40%] h-full object-cover rounded-l-[60px]"
        />
        <div className="w-[60%] h-full bg-[#242424] flex flex-col gap-3 items-center rounded-r-[60px] py-4 shadow-lg">
          <div className="flex flex-col justify-center items-center gap-2 w-[65%]">
            <img
              src="/assets/cup_logo.png"
              alt="Chai-Logo"
              loading="lazy"
              className="object-cover h-[60px] "
            />

            <p className="text-lg font-bold text-white text-center">
              {Login
                ? "Welcome Back, Please login to your account"
                : "Join us today! Sign up to start your journey."}
            </p>
          </div>

          <div className="flex flex-col gap-3 w-[65%]">
            {!Login && (
              <label className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[22px]">
                  <User />
                </span>

                <input
                  required
                  type="text"
                  name="username"
                  onChange={handleOnChange}
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-2 rounded-xl bg-[#1f1f1f] text-white border border-[#3a3a3a]
                focus:outline-none focus:border-[#6f6f6f] focus:ring-2 focus:ring-[#6f6f6f]/40 transition-all duration-300"
                />
              </label>
            )}
            <label className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[22px]">
                <IoIosMail />
              </span>

              <input
                required
                type="email"
                name="email"
                onChange={handleOnChange}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-2 rounded-xl bg-[#1f1f1f] text-white border border-[#3a3a3a]
                focus:outline-none focus:border-[#6f6f6f] focus:ring-2 focus:ring-[#6f6f6f]/40 transition-all duration-300"
              />
            </label>

            <label className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[22px]">
                <TiLockClosed />
              </span>

              <input
                required
                type="password"
                name="password"
                onChange={handleOnChange}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-2 rounded-xl bg-[#1f1f1f] text-white border border-[#3a3a3a]
                focus:outline-none focus:border-[#6f6f6f] focus:ring-2 focus:ring-[#6f6f6f]/40 transition-all duration-300"
              />
            </label>

            {!Login && (
              <label className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[22px]">
                  <TiLockClosed />
                </span>

                <input
                  required
                  type="password"
                  name="confirmPassword"
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-4 py-2 rounded-xl bg-[#1f1f1f] text-white border border-[#3a3a3a]
                focus:outline-none focus:border-[#6f6f6f] focus:ring-2 focus:ring-[#6f6f6f]/40 transition-all duration-300"
                />
              </label>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-xl bg-white text-black font-semibold text-lg
              hover:bg-gray-200 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
            >
              {loading ? "Please wait..." : Login ? "Login" : "Sign up"}
            </button>
          </div>
          {Login ? (
            <div className="flex gap-1 text-sm">
              <p>Don't have an account?</p>
              <p
                onClick={() => setLogin(false)}
                className="font-bold cursor-pointer hover:underline"
              >
                Sign up
              </p>
              {/* for zooming we can add this :- transition-transform duration-300 hover:scale-110 */}
            </div>
          ) : (
            <div className="flex gap-1 text-sm">
              <p>already have an account?</p>
              <p
                onClick={() => setLogin(true)}
                className="font-bold cursor-pointer hover:underline"
              >
                Login
              </p>
              {/* for zooming we can add this :- transition-transform duration-300 hover:scale-110 */}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default AuthPage;

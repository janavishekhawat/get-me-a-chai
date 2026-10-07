import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../api";
import { setLoading, setUser } from "@/redux/slices/authSlice";

const { LOGIN_API, SIGNUP_API } = endpoints;

export function signup(username, email, password, confirmPassword) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        username,
        email,
        password,
        confirmPassword,
      });

      console.log("The response data is : ", response.data);

      console.log("SIGNUP_API Response : ", response);

      // Check backend success field if present
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Account created Successfully");

      dispatch(setUser({ ...response.data.user }));
      localStorage.setItem("user", JSON.stringify({ ...response.data.user }));

      localStorage.setItem("token", response.data.token);
      return response; // return response to caller if needed
    } catch (error) {
      console.log("SIGNUP_API Error.....", error);

      // Show backend message if available
      const errorMessage =
        error.response?.data?.message || error.message || "Signup Failed";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function login(email, password) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        console.log("the error is : ", response.data.message);
        throw new Error(response.data.message);
      }

      dispatch(setUser({ ...response.data.user }));

      // ✅ Add this line
      localStorage.setItem("user", JSON.stringify({ ...response.data.user }));

      // token bhi save kar lo agar saveToken hook ka use nahi kar rahe
      localStorage.setItem("token", response.data.token);

      toast.success("Login Successful");

      return response;
    } catch (error) {
      console.log("LOGIN_API Error......", error);
      toast.error("Login failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

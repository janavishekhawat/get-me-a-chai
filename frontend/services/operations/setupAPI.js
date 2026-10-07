import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../api";
import { setLoading, setUser } from "@/redux/slices/authSlice";

const { UPDATE_USER_PROFILE_API } = profileEndpoints;

export function setup(bio, goalAmount, upi, profileImage) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("bio", bio);
      formData.append("goalAmount", goalAmount);
      formData.append("upi", upi);
      formData.append("profileImage", profileImage);

      const response = await apiConnector(
        "PUT",
        UPDATE_USER_PROFILE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        },
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log("the response.user.profileImage is : ", response.data.user.profileImage);
      
      toast.success("Profile Edited Successfully");
      
      dispatch(setUser({ ...response.data.user }));

      return response.data;
    } catch (error) {
      console.log("the error is : ", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Profile Edit Failed";
      toast.error(errorMessage);

      throw error; // 🔹 Important: re-throw so frontend catch works
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

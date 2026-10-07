import { toast } from "react-hot-toast";
import {
  setpaymentDetails,
  setPaymentLoading,
  setPaymentError,
} from "@/redux/slices/paymentSlice";
import { apiConnector } from "../apiconnector";
import { paymentEndpoints } from "../api";

const {
  CAPTURE_PAYMENT_API,
  VERIFY_PAYMENT_API,
  GET_SUPPOTER_DATA_API,
  GET_PAYMENT_HISTORY_API,
} = paymentEndpoints;

export function capturePayment(formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Initializing payment...");
    dispatch(setPaymentLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        CAPTURE_PAYMENT_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      dispatch(setpaymentDetails(response?.data?.data));
      toast.success("Payment initiated");
    } catch (error) {
      console.log("CAPTURE_PAYMENT_API error : ", error);
      dispatch(
        setPaymentError(
          error?.response?.data?.message || "Payment initiation failed"
        )
      );
      toast.error("Payment initiation failed");
    }
    dispatch(setPaymentLoading(false));
    toast.dismiss(toastId);
  };
}

export function verifyPayment(verifyData) {
  return async (dispatch) => {
    const toastId = toast.loading("Verifying payment...");
    dispatch(setPaymentLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        VERIFY_PAYMENT_API,
        verifyData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      dispatch(setpaymentDetails(response?.data?.data));
      toast.success("Payment verified successfully");
    } catch (error) {
      console.log("VERIFY_PAYMENT_API error : ", error);
      dispatch(
        setPaymentError(
          error?.response?.data?.message || "Payment verification failed"
        )
      );
      toast.error("Payment verification failed");
    }
    dispatch(setPaymentLoading(false));
    toast.dismiss(toastId);
  };
}

export const getSuppoterData = async (creatorId) => {
  const toastId = toast.loading("Loading");
  let result = null;
  try {
    const response = await apiConnector("GET", GET_SUPPOTER_DATA_API, {
      creatorId,
    });

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could not get suppoters data"
      );
    }

    result = response?.data;
  } catch (error) {
    console.log("GET_SUPPOTER_DATA_API error : ", error);
    toast.error("Could not get suppoters data");
  }
  toast.dismiss(toastId);
  return result;
};

export const getPaymentHistory = async () => {
  const toastId = toast.loading("Loading");
  let result = null;
  try {
    const response = await apiConnector("GET", GET_PAYMENT_HISTORY_API, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could not get payment history"
      );
    }

    result = response?.data;
  } catch (error) {
    console.log("GET_PAYMENT_HISTORY_API error : ", error);
    toast.error("Could not get payment history");
  }
  toast.dismiss(toastId);
  return result;
};

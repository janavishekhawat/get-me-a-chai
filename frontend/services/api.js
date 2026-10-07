const BASE_URL = "http://localhost:5000/api";

export const endpoints = {
  LOGIN_API: BASE_URL + "/auth/login",
  SIGNUP_API: BASE_URL + "/auth/signup",
};

export const paymentEndpoints = {
  CREATE_ORDER_API: BASE_URL + "/razorpay/create-order",
  VERIFY_PAYMENT_API: BASE_URL + "/razorpay/verify-payment",
  GET_SUPPORTERS_API: BASE_URL + "/razorpay/supporterData",
  RESET_TOTALAMOUNT_API: BASE_URL + "/razorpay/resetamount",
};

export const creatorEndpoints = {
  GET_ALL_CREATORS_API: BASE_URL + "/creator/all",
  GET_USER_DETAILS_API: BASE_URL + `/creator/userDetails`,

  //posts
  CREATE_POST_API: BASE_URL + "/posts/create-post",
  GET_CREATOR_POST_API: BASE_URL + `/posts/postDetails`,

  //like and comments
  EDIT_POST_API: BASE_URL + "/posts",
};

export const followEndpoints = {
  FOLLOW_INFO_API: BASE_URL + "/follow",
  UNFOLLOW_API: BASE_URL + "/follow",
  FOLLOWER_LIST_API: BASE_URL + "/follow",
  FOLLOWING_LIST_API: BASE_URL + "/follow",
};

export const profileEndpoints = {
  GET_USER_PROFILE_API: BASE_URL + "/user/profile",
  UPDATE_USER_PROFILE_API: BASE_URL + "/user/update-profile",
};

export const exploreEndpoints = {
  GET_ALL_EXPLORE_POSTS: BASE_URL + "/explore/get-all-posts",
  GET_FOLLOWING_CREATOR_POST: BASE_URL + "/explore/getFollowingList",
};

export const deleteaccountEndpoints = {
  DELETE_USER_ACCOUNT: BASE_URL + "/deleteaccount/deleteMyaccount",
};

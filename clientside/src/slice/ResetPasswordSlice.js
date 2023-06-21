import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "reset-password";

export const ResetPasswordSlice = (set) => ({
  resetPasswordResponse: {},
  error_msg_reset_pasword: "",
  resetPassword: async (userData) => {
    const { data } = userData;

    // console.log(data);

    // const token = sessionStorage.getItem("token")
    try {
      const response = await axios.post(apiEndPoint, data, {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer "+token
        },
      });
      // console.log(response);
      set(
        { error_msg_reset_pasword: "", resetPasswordResponse: response.data },
        false,
        "resetPassword"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set(
        { error_msg_reset_pasword: data.message },
        false,
        "Reset Password Error Message"
      );
    }
  },
  resetPasswordReset: () => {
    set(
      { error_msg_reset_pasword: "", resetPasswordResponse: {} },
      false,
      "Reset reset Password State"
    );
  },
  ResetErrorMsgResetPassword: () => {
    set(
      { error_msg_reset_pasword: "" },
      false,
      "ResetErrorMsgResetPassword"
    );
  },
});

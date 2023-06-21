import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store.js";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customIdErrorMsg = "customIdErrorMsg";
const customIdloginSuccess = "customIdloginSuccess";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  newPassword: yup.string().min(8).max(32).required(),
  confirmedPassword: yup.string().min(8).max(32).required(),
});

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const resetPassword = useBoundStore((store) => store.resetPassword);
  const error_msg = useBoundStore((store) => store.error_msg_reset_pasword);
  const ResetErrorMsg = useBoundStore((store) => store.ResetErrorMsgResetPassword);
  const resetPasswordResponse = useBoundStore(
    (store) => store.resetPasswordResponse
  );
  const resetPasswordReset = useBoundStore((store) => store.resetPasswordReset);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const forgetPasswordReset = useBoundStore(
    (store) => store.forgetPasswordReset
  );

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (resetPasswordResponse.status === 200) {
      // alert(resetPasswordResponse.msg);
      toast.success(`${resetPasswordResponse.msg}`, {
        toastId: customIdloginSuccess,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      sessionStorage.removeItem("OTP")
      resetPasswordReset();
      forgetPasswordReset();
      navigate("/login");
    }
  }, [resetPasswordResponse, navigate, resetPasswordReset]);
  if(error_msg){
   
    toast.error(`${error_msg}` , {
      toastId: customIdErrorMsg,
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       })
       ResetErrorMsg()
   
}
  const onSubmitHandler = (data) => {
    console.log({ data });
    resetPassword({ data });
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-sm  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 flex-col p-10">
        <div className="flex">
          <div>
            <IoArrowBack
              className="text-gray-800 h-8 w-8"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>

        <div className=" bg-white px-6 sm:py-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold  text-orange-500 sm:text-4xl">
              Reset Password
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="mx-auto mt-16 max-w-xl "
          >
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <div>
                  <label htmlFor="email">Email</label>

                  <div className="mt-1.5">
                    <input
                      {...register("email")}
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      placeholder="abc@gmail.com"
                    />
                    <p className="text-red-500">{errors.email?.message}</p>
                  </div>
                </div>

                <div className="relative mt-5">
                  <label htmlFor="newPassword">New Password</label>

                  <input
                    {...register("newPassword")}
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    // className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="New Password"
                  />
                  <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer mt-3"
                    onClick={toggleNewPasswordVisibility}
                  >
                    {showNewPassword ? (
                      <AiFillEye className="h-6 w-6 " />
                    ) : (
                      <AiFillEyeInvisible className="h-6 w-6 " />
                    )}
                  </span>
                  <p className="text-red-500">{errors.newPassword?.message}</p>
                </div>
                <div className="relative mt-5">
                  <label htmlFor="confirmedPassword">Confirm Password</label>

                  <input
                    {...register("confirmedPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmedPassword"
                    id="confirmedPassword"
                    className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Confirm Password"
                  />
                  <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer mt-3"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <AiFillEye className="h-6 w-6 " />
                    ) : (
                      <AiFillEyeInvisible className="h-6 w-6 " />
                    )}
                  </span>
                  <p className="text-red-500">
                    {errors.confirmedPassword?.message}
                  </p>
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className=" font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out  items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <p className="text-red-500">{error_msg ? error_msg : null}</p>
      </div>
    </div>
  );
};
export default ResetPasswordForm;

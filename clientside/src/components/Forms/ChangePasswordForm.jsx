import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const customIdErrorMsg = "customIdErrorMsg";
const customIdloginSuccess = "customIdloginSuccess";

const schema = yup.object().shape({
  // email: yup.string().email().required(),
  currentPassword: yup.string().min(8).max(32).required(),
  newPassword: yup.string().min(8).max(32).required(),
  confirmedPassword: yup.string().min(8).max(32).required(),
});

const ChangePassword = ({ isChangePasswordModalOpen, handleModalClose }) => {
  const changePassword = useBoundStore((store) => store.changePassword);
  const error_msg = useBoundStore((store) => store.error_msg_change_password);
  const ResetErrorMsg = useBoundStore(
    (store) => store.ResetErrorMsgChangePassword
  );
  const user = useBoundStore((store) => store.user);
  const navigate = useNavigate();

  const changePasswordResponse = useBoundStore(
    (store) => store.changePasswordResponse
  );
  const changePasswordReset = useBoundStore(
    (store) => store.changePasswordReset
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if (changePasswordResponse.status === 200) {
      // alert(changePasswordResponse.msg);
      toast.success(`${changePasswordResponse.msg}`, {
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
      sessionStorage.removeItem("token");
      changePasswordReset();
      navigate("/login");
    }
  }, [changePasswordResponse, navigate, changePasswordReset]);

  const onSubmitHandler = (data) => {
    // console.log({ data });

    const { email } = user;
    const newData = { ...data, email };

    changePassword({ newData });
  };

  if (!isChangePasswordModalOpen) return null;
  if (error_msg) {
    toast.error(`${error_msg}`, {
      toastId: customIdErrorMsg,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    ResetErrorMsg();
  }

  return (
    <div
      id="modal-body"
      onClick={(e) => e.target.id === "modal-body" && handleModalClose()}
      className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
    >
      <div className="w-96 bg-white rounded-md px-6 py-6">
        <div className="flex justify-between">
          <h3 className="text-3xl font-bold text-center text-orange-500">
            Change Password
          </h3>
          <span
            onClick={() => handleModalClose()}
            className="text-red-500 text-2xl cursor-pointer hover:text-red-600 hover:scale-150"
          >
            &times;
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col space-y-4 mt-8">
            {/* <div className="flex">
              <label htmlFor="email" className="w-24">
                Email
              </label>
              <div className="flex-grow">
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="abc@gmail.com"
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
            </div> */}
            <div className="flex">
              <label htmlFor="currentPassword" className="w-24">
                Current Password
              </label>

              <div className="flex-grow">
                <input
                  {...register("currentPassword")}
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Current Password"
                />
                <span
                  className="absolute   transform -translate-y-1/2 cursor-pointer mt-5 -ml-8"
                  onClick={toggleCurrentPasswordVisibility}
                >
                  {showCurrentPassword ? (
                    <AiFillEye className="h-6 w-6 " />
                  ) : (
                    <AiFillEyeInvisible className="h-6 w-6 " />
                  )}
                </span>
                <p className="text-red-500">
                  {errors.currentPassword?.message}
                </p>
              </div>
            </div>
            <div className="flex">
              <label htmlFor="newPassword" className="w-24">
                New Password
              </label>

              <div className="flex-grow">
                <input
                  {...register("newPassword")}
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="New Password"
                />
                <span
                  className="absolute top-1/2  transform -translate-y-1/2 cursor-pointer  -ml-8"
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
            </div>
            <div className="flex">
              <label htmlFor="confirmedPassword" className="w-24">
                Confirm Password
              </label>

              <div className="flex-grow">
                <input
                  {...register("confirmedPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmedPassword"
                  id="confirmedPassword"
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Confirm Password"
                />
                <span
                  className="absolute top-1/2  transform -translate-y-1/2 cursor-pointer mt-16 -ml-8"
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
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-3 font-semibold bg-blue-500 text-gray-100 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none"
              >
                CHANGE
              </button>
            </div>
          </div>
        </form>
      </div>
      <p className="text-red-500">{error_msg ? error_msg : null}</p>
    </div>
  );
};

export default ChangePassword;

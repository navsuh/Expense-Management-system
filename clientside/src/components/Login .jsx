import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useBoundStore } from "../store";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./Forms/ForgetPasswordForm";
import OTPFORM from "./OTPForm";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const customIdErrorMsg = "customIdErrorMsg";
const customIdInActive = "customIdInActive";
const customIdloginSuccess = "customIdloginSuccess";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = useBoundStore((store) => store.loginUser);

  const token = useBoundStore((store) => store.token);
  const user = useBoundStore((store) => store.user);

  const error_msg = useBoundStore((store) => store.error_msg_login);
  const ResetErrorMsg = useBoundStore((store) => store.ResetErrorMsg);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    if (!sessionStorage.getItem("token")) return;
    if (!user.isActive && user.role !== "Admin") {
      sessionStorage.removeItem("token");
      // alert("user inActive Contact Admin");

      toast.error("user inActive Contact Admin", {
        toastId: customIdInActive,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return navigate(0);
    }
    if (user.role === "Admin") {
      // alert("login sucessfull");
      toast.success("login sucessfull", {
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
      navigate("/admin");
    } else if (user.role === "Primaryuser") {
      // alert("login sucessfull");
      toast.success("login sucessfull", {
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
      navigate("/primaryuser");
    } else if (user.role === "member") {
      // alert("login sucessfull");
      toast.success("login sucessfull", {
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
      navigate("/memberuser");
    }
  }, [token, navigate, user.role, user.isActive]);

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

  const onSubmitHandler = (data) => {
    loginUser({ data });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const modalOtpClose = () => {
    setModal(false);
  };

  const setModalOpen = () => {
    setIsModalOpen(true);
  };

  const setOtpModal = () => {
    setModal(true);
  };
  return (
    <>
      <ForgotPasswordForm
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        setOtpModal={setOtpModal}
        modalOtpClose={modalOtpClose}
        setModalOpen={setModalOpen}
      />
      <OTPFORM
        modal={modal}
        modalOtpClose={modalOtpClose}
        setModalOpen={setModalOpen}
      />
      <div className="min-h-fit bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl  sm:m-10 bg-white shadow-xl sm:rounded-lg flex justify-center flex-1 p-6">
          <div className="flex-1 text-center hidden lg:flex ml-20">
            <img src="/assests/images/homeimgae.png" alt="homeimage" />
          </div>

          <div className="lg:w-1/2  p-6">
            <div className="mt-12 flex flex-col items-center">
              <img src="/assests/images/logoexms.png" alt="logoimage" />

              <h1 className="text-xl xl:text-3xl font-bold">Log In</h1>
              <span className="mt-5">
                Don't have an account{"  "}
                <Link to={"/register"} className="signupspan">
                  Sign Up
                </Link>{" "}
                now
              </span>

              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="w-full flex-1 mt-8">
                  <div className="mx-auto max-w-xs">
                    <div>
                      <label htmlFor="email">Username</label>
                      <input
                        {...register("email")}
                        className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                      />
                      <p className="text-red-600">{errors.email?.message}</p>
                    </div>
                    <div className="relative mt-5">
                      <label htmlFor="password">Password</label>
                      <input
                        {...register("password")}
                        className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                      />
                      <span
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer mt-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <AiFillEye className="h-6 w-6 " />
                        ) : (
                          <AiFillEyeInvisible className="h-6 w-6 " />
                        )}
                      </span>
                      <p className="text-red-600">{errors.password?.message}</p>
                    </div>

                    <button
                      type="submit"
                      className="mt-5 mb-2 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <span className="ml-3">LOG IN</span>
                    </button>

                    {/* <Link to={"/forgotpassword"} className="text-blue-600 hover:text-blue-800 underline-offset-2">Forgot Password?</Link> */}
                    {/* {error_msg ? displayErrorMessage() : null} */}
                  </div>
                </div>
              </form>

              <button
                onClick={() => {
                  setIsModalOpen(true);
                  modalOtpClose();
                }}
                className="text-blue-600 hover:text-blue-800 underline-offset-2 mt-2"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

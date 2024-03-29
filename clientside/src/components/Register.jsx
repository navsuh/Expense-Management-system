import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useBoundStore } from "../store";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const customIdErrorMsg = "customIdErrorMsg";
const customIdRegistrationSuccess = "customIdRegistrationSuccess";

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(50).required(),
  lastName: yup.string().min(3).max(50).required(),
  email: yup.string().email().required(),
  phone: yup.string().max(10).required(),
  userName: yup.string().min(5).max(50).required(),
  password: yup.string().min(8).max(255).required(),
});
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const addPrimaryUser = useBoundStore((store) => store.addPrimaryUser);
  const primaryUser = useBoundStore((store) => store.primaryUser);
  const PrimaryUserReset = useBoundStore((store) => store.PrimaryUserReset);
  const error_msg = useBoundStore((store) => store.error_msg_register);
  const ResetErrorMsg = useBoundStore((store) => store.ResetErrorMsg);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Object.keys(primaryUser).length) return;
    toast.success('Registration successfull', {
      toastId: customIdRegistrationSuccess,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      PrimaryUserReset()
    navigate("/login");
  }, [primaryUser]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitHandler = (data) => {
    // console.log({ data });
    addPrimaryUser({ data });
  };
  if(error_msg){
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
      ResetErrorMsg()
  }

  return (
    <div className="min-h-screen b text-gray-900 flex justify-center">
      <div className="max-w-screen-xl  bg-white  flex justify-center flex-1 p-10">
        <div className="flex-1 text-center hidden lg:flex ml-20 mt-20">
          <img
            src="/assests/images/homeimgae.png"
            alt="homeimage"
            style={{ height: "600px" }}
          />
        </div>

        <div className="lg:w-1/2  p-6">
          <div className=" flex flex-col items-center  ">
            <img src="/assests/images/logoexms.png" alt="logoimage" />

            <h1 className="text-xl xl:text-3xl font-bold">Sign Up</h1>
            <p className="mt-6">
              Already have an account?
              <span className="loginspan">
                <Link to={"/login"}>Log in</Link>
              </span>
            </p>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <div>
                    <label htmlFor="firstName">First Name</label> <label htmlFor="" className="text-red-700">*</label>
                    <input
                      {...register("firstName")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="First Name"
                    />
                    <p className="text-red-500">{errors.firstName?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="lastName">Last Name</label> <label htmlFor="" className="text-red-700">*</label>
                    <input
                      {...register("lastName")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Last Name"
                    />
                    <p className="text-red-500">{errors.lastName?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="email">Email</label> <label htmlFor="" className="text-red-700">*</label>
                    <input
                      {...register("email")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                    />
                    <p className="text-red-500">{errors.email?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="phone">Phone Number</label> <label htmlFor="" className="text-red-700">*</label>
                    <input
                      {...register("phone")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Phone Number"
                    />
                    <p className="text-red-500">{errors.phone?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="userName">UserName</label> <label htmlFor="" className="text-red-700">*</label>
                    <input
                      {...register("userName")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="User Name"
                    />
                    <p className="text-red-500">{errors.userName?.message}</p>
                  </div>
                  <div className="relative mt-5">
                    <label htmlFor="password">Password</label> <label htmlFor="" className="text-red-700">*</label>
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
                    <p className="text-red-500">{errors.password?.message}</p>
                  </div>
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">ADD</span>
                  </button>
                </div>
              </div>
            </form>
            <p className="text-red-500">{error_msg ? error_msg : null}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;

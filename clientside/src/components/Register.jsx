import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(50).required(),
  lastName: yup.string().min(3).max(50).required(),
  email: yup.string().min(3).max(50).required(),
  phone: yup.string().min(8).max(10).required(),
  userName: yup.string().min(6).max(20).required(),
  password: yup.string().min(8).max(32).required(),
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitHandler = (data) => {
    console.log({ data });
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 p-10">
        <div className="flex-1 text-center hidden lg:flex ml-20 mt-40">
          <img
            src="/assests/images/homeimgae.png"
            alt="homeimage"
            style={{ height: "600px" }}
          />
        </div>

        <div className="lg:w-1/2  p-6">
          <div className="mt-12 flex flex-col items-center  ">
            <img src="/assests/images/logoexms.png" alt="logoimage" />

            <h1 className="text-xl xl:text-3xl font-bold">Sign Up</h1>
            <span className="mt-6">
              Already have an account?{" "}
              <Link to={"/login"} className="loginspan">
                Log in
              </Link>{" "}
            </span>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <div>
                    <p>First Name</p>
                    <input
                      {...register("firstName")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="First Name"
                    />
                    <p>{errors.firstName?.message}</p>
                  </div>
                  <div>
                    <p className="mt-5">Last Name</p>
                    <input
                      {...register("lastName")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Last Name"
                    />
                    <p>{errors.lastName?.message}</p>
                  </div>
                  <div>
                    <p className="mt-5">Email</p>
                    <input
                      {...register("email")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                    />
                    <p>{errors.email?.message}</p>
                  </div>
                  <div>
                    <p className="mt-5">Phone Number</p>
                    <input
                      {...register("phone")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Phone Number"
                    />
                    <p>{errors.phone?.message}</p>
                  </div>
                  <div>
                    <p className="mt-5">UserName</p>
                    <input
                      {...register("userName")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="User Name"
                    />
                    <p>{errors.userName?.message}</p>
                  </div>
                  <div className="relative">
                    <p className="mt-5">Password</p>
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
                    <p>{errors.password?.message}</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;

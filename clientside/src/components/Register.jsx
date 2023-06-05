import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useBoundStore } from "../store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";

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

  const addPrimaryUser=useBoundStore(store=>store.addPrimaryUser)

  const primaryUser=useBoundStore(store=>store.primaryUser)

  const error_msg=useBoundStore(store=>store.error_msg)

  const navigate = useNavigate();

  // useEffect(()=>{
   
  if(!primaryUser.firstName) return
  // console.log("1f");
  // console.log(primaryUser);
  toast.success('Registration Successful', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  pauseOnFocusLoss: false,
  toastId: "customId",
    theme: "light",
    });    
  // if(!primaryUser.firstName) return
  
 
  // console.log("1f");
  // console.log(primaryUser);

  // // toast.success('Registration Successful', {
  // //   position: "top-right",
  // //   autoClose: 5000,
  // //   hideProgressBar: false,
  // //   closeOnClick: true,
  // //   pauseOnHover: true,
  // //   draggable: true,
  // //   progress: undefined,
  // //   theme: "light",
  // //   });    
  // alert("Registration successfull please login")

 
  // navigate("/login")

  // },[primaryUser,navigate])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const displayErrorMessage=()=>{
  //   toast.error(error_msg, {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //     });
  // }

 


  const onSubmitHandler = (data) => {
    // console.log({ data });
    addPrimaryUser({data})

    if(!primaryUser.firstName) {
       toast.success('Registration Successful', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });    
          setTimeout(() => {
            
          }, 5000);
    }
    else {
      console.log(error_msg);
      toast.error(error_msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
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
                    <label htmlFor="firstName">First Name</label>
                    <input
                      {...register("firstName")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="First Name"
                    />
                    <p>{errors.firstName?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      {...register("lastName")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Last Name"
                    />
                    <p>{errors.lastName?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="email">Email</label>
                    <input
                      {...register("email")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                    />
                    <p>{errors.email?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      {...register("phone")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Phone Number"
                    />
                    <p>{errors.phone?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="userName">UserName</label>
                    <input
                      {...register("userName")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="User Name"
                    />
                    <p>{errors.userName?.message}</p>
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
            
            {/* {error_msg?displayErrorMessage():null} */}
            <ToastContainer/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;

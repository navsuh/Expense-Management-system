import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useBoundStore } from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
  //   const showToastMessage = () => {
  //     toast.success('Successfully Login !', {
  //         position: toast.POSITION.TOP_RIGHT
  //     });
  // };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = useBoundStore((store) => store.loginUser);

  const token = useBoundStore((store) => store.token);
  const role = useBoundStore((store) => store.role);

  const error_msg = useBoundStore((store) => store.error_msg);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    if (!sessionStorage.getItem("token")) return;

    if (role === "Admin") {
      alert("login sucessfull");
      navigate("/admin");
    } else if (role === "Primaryuser") {
      alert("login sucessfull");
      navigate("/primaryuser");
    } else if (role === "member") {
      alert("login sucessfull");
      navigate("/memberuser");
    }

    // toast.success('Registration Successful', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   });
  }, [token, navigate, role]);
  const customId = "custom-id-yes";

  const onSubmitHandler = (data) => {
    console.log({ data });
    // toast.success('Success Notification !', {
    //   position: toast.POSITION.TOP_RIGHT
    // })
    loginUser({ data });
  };

  const displayErrorMessage = () => {
    toast.error(error_msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: customId,
      limit: 1,
      theme: "light",
    });
  };

  return (
    <div className="min-h-full bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl   bg-white shadow-xl sm:rounded-lg flex justify-center flex-1 p-6">
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
                  {error_msg ? displayErrorMessage() : null}

                  <Link to={"/forgotpassword"} className="text-blue-600 hover:text-blue-800 underline-offset-2">Forgot Password?</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

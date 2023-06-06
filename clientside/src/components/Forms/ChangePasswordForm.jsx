import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store.js";


const schema = yup.object().shape({
  email: yup.string().email().required(),
  currentPassword: yup.string().min(8).max(32).required(),
  newPassword: yup.string().min(8).max(32).required(),
  confirmedPassword: yup.string().min(8).max(32).required(),
});

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const changePassword=useBoundStore(store=>store.changePassword)
  const error_msg=useBoundStore(store=>store.error_msg)
  const changepasswordresponse=useBoundStore(store=>store.changepasswordresponse)

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

useEffect(()=>{
if(changepasswordresponse.status===200){
  alert(changepasswordresponse.msg)
  sessionStorage.removeItem("token")
  navigate("/login")
}
},[changepasswordresponse,navigate])


  


  const onSubmitHandler = (data) => {
    console.log({ data });
    changePassword({data})
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
              Change Password
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="mx-auto mt-16 max-w-xl "
          >
            <div className="flex flex-col">
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
              <div className="mt-4">
                <label htmlFor="currentPassword">Current Password</label>
                <div className="mt-1.5">
                  <input
                    {...register("currentPassword")}
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Current Password"
                  />
                  <p className="text-red-500">
                    {errors.currentPassword?.message}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="newPassword">New Password</label>
                <div className="mt-1.5">
                  <input
                    {...register("newPassword")}
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="New Password"
                  />
                  <p className="text-red-500">{errors.newPassword?.message}</p>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="confirmedPassword">Confirm Password</label>
                <div className="mt-1.5">
                  <input
                    {...register("confirmedPassword")}
                    type="password"
                    name="confirmedPassword"
                    id="confirmedPassword"
                    className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Confirm Password"
                  />
                  <p className="text-red-500">
                    {errors.confirmedPassword?.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className=" font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out  items-center justify-center focus:shadow-outline focus:outline-none"
              >
                CHANGE
              </button>
            </div>
          </form>
          <p className="text-red-500">{error_msg?error_msg:null}</p>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;

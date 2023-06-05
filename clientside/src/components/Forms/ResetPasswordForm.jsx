import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";



const schema = yup.object().shape({
    email: yup.string().email().required(),
    currentPassword: yup.string().min(8).max(32).required(),
    newPassword: yup.string().min(8).max(32).required(),
    confirmedPassword: yup.string().min(8).max(32).required(),
});

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
 
  }, []);

  const onSubmitHandler = (data) => {
    console.log({ data });
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
            <div className="flex flex-col ">
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
                <label htmlFor="newPassword">New Password</label>

                <div className="mt-1.5">
                  <input
                    {...register("newPassword")}
                    type="text"
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
                    type="text"
                    name="confirmedPassword"
                    id="confirmedPassword"
                    className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Confirm Password"
                  />
                  <p className="text-red-500">{errors.confirmedPassword?.message}</p>
                </div>
              </div>

              
            </div>
            <div className="mt-10">
              <button
                type="submit"
                onClick={()=> navigate("/login")}
                className=" font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out  items-center justify-center focus:shadow-outline focus:outline-none"
              >
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResetPasswordForm;

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {IoArrowBack} from "react-icons/io5"
import {  useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(50).required(),
  frequency: yup.string().min(3).max(50).required(),
  amount: yup.string().min(1).required(),
  userName: yup.string().min(6).max(20).required(),
  description: yup.string().min(6).max(20).required(),
  paidThrough: yup.string().min(6).max(20).required(),
  paidBy: yup.string().min(6).max(20).required(),

});
const PeriodicExpenseForm = () => {
  const navigate =useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    console.log({ data });
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 p-10">
         <IoArrowBack className="text-gray-800 h-8 w-8" style={{cursor:"pointer"}} onClick={()=>navigate(-1)}/>

        <div className="flex-1 text-center hidden lg:flex ml-20 mt-40">

          <img
            src="/assests/images/Periodicexpense.png"
            alt="homeimage"
            style={{ height: "600px" }}
          />
        </div>

        <div className="lg:w-1/2  p-6">
          <div className="mt-12 flex flex-col items-center">
          
            <h1 className="text-xl xl:text-3xl font-bold">Add Periodic Expense</h1>
          
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
                    <label htmlFor="frequency">Frequency</label>
                    <input
                      {...register("frequency")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="frequency"
                    />
                    <p>{errors.frequency?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="amount">Amount</label>
                    <input
                      {...register("amount")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="number"
                      placeholder="amount"
                    />
                    <p>{errors.amount?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="description">Description</label>
                    <input
                      {...register("description")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="policy name, emi account"
                    />
                    <p>{errors.description?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="paidThrough">Paid Through</label>
                    <input
                      {...register("paidThrough")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Upi, Sbi bank"
                    />
                    <p>{errors.paidThrough?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="paidBy">Paid By</label>
                    <input
                      {...register("paidBy")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Person name"
                    />
                    <p>{errors.paidBy?.message}</p>
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
export default PeriodicExpenseForm;

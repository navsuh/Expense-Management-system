import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";

const periodicExpenseList = [
  {
    _id: "1",
    periodicExpense: "periodicExpense 1",
    frequency: "frequency Name 1",
    amount: "amount 1",
    dueDate: "expense due date 1",
    expensetype: "pediodic expense type 1",
    paymentDetails: "details 1",
    description: "description 1",
    paidThrough: "bank details 1",
    paidBy: "user 1 ",
  },
  {
    _id: "2",
    periodicExpense: "periodicExpense 2",
    frequency: "frequency Name 2",
    amount: "amount 2",
    dueDate: "expense due date 2",
    expensetype: "pediodic expense type 2",
    paymentDetails: "details 2",
    description: "description 2",
    paidThrough: "bank details 2",
    paidBy: "user 2 ",
  },
];

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(50).required(),
  frequency: yup.string().min(3).max(50).required(),
  amount: yup.string().min(1).max(50).required(),
  dueDate: yup.date().required(),
  paymentDetails: yup.object().shape({
    amounts: yup.string().min(1).max(50).required(),
    date: yup.date().required(),
    method: yup.string().min(3).max(50).required(),
  }),
  description: yup.string().min(6).max(20).required(),
  paidThrough: yup.string().min(6).max(20).required(),
  paidBy: yup.string().min(6).max(20).required(),
});
const PeriodicExpenseForm = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!id) return;
    console.log(id);
    const periodicExpense = periodicExpenseList.find((p) => p._id === id);
    console.log(periodicExpense);
    setValue("_id", periodicExpense._id);
    setValue("firstName", periodicExpense.periodicExpense);
    setValue("frequency", periodicExpense.frequency);
    setValue("amount", periodicExpense.amount);

    setValue("description", periodicExpense.description);
    setValue("paidThrough", periodicExpense.paidThrough);
    setValue("paidBy", periodicExpense.paidBy);
  }, [id, setValue]);

  const onSubmitHandler = (data) => {
    console.log({ data });
    
  };
  console.log(errors);
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 p-10">
        <IoArrowBack
          className="text-gray-800 h-8 w-8"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />

        <div className="flex-1 text-center hidden lg:flex ml-20 mt-40">
          <img
            src="/assests/images/Periodicexpense.png"
            alt="homeimage"
            style={{ height: "600px" }}
          />
        </div>

        <div className="lg:w-1/2  p-6">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-xl xl:text-3xl font-bold">
              Add Periodic Expense
            </h1>

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
                      type="text"
                      placeholder="amount"
                    />
                    <p>{errors.amount?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                      {...register("dueDate")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="date"
                      placeholder=""
                    />
                    {/* <p>{errors.dueDate?.message}</p> */}
                  </div>
{/* ------------------------------------------------------------------------------------------------------------------ */}
                   <div className="mt-5  border  pl-4 pr-4 h-80">
                  <label htmlFor="paymentDetails">Payment Details:-</label>
                      <br />
                   <div className="mt-5">
                   <label htmlFor="amounts">Amount</label>
                   
                    <input
                      {...register('paymentDetails.amounts')}
                      className="w-70 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="amounts"
                    />
                    <p>{errors.paymentDetails?.amounts.message}</p>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="date">Date</label>
                    <input
                      {...register("paymentDetails.date")}
                      className="w-70 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="date"
                      placeholder=""
                    />
                    <p>{errors.paymentDetails?.date.message}</p>
                  </div>
                   
                  <div className="mt-5">
                    <label htmlFor="method">Method</label>
                    <input
                      {...register("paymentDetails.method")}
                      className="w-70 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="policy name, emi account"
                    />
                    <p>{errors.paymentDetails?.method.message}</p>
                  </div>


                   </div>

{/* --------------------------------------------------------------------------------------------------------------- */}
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

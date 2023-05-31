import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";

const dailyExpensesList = [
  {
    _id: "1",
    household: "household 1",
    dueDate: "expense due date 1",
    expensetype: "daily expense type 1",
    paymentDetails: "details 1",
    description: "description 1",
    paidThrough: "bank details 1",
    paidBy: "user 1 ",
  },
  {
    _id: "2",
    household: "household 2",
    dueDate: "expense due date 2",
    expensetype: "daily expense type 2",
    paymentDetails: "details 2",
    description: "description 2",
    paidThrough: "bank details 2",
    paidBy: "user 2 ",
  },
];

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(50).required(),
  lastName: yup.string().min(3).max(50).required(),
  paymentDetails: yup.object().shape({
    amounts: yup.string().min(1).max(50).required(),
    date: yup.date().required(),
    method: yup.string().min(3).max(50).required(),
  }),
  description: yup.string().min(6).max(20).required(),
  paidThrough: yup.string().min(6).max(20).required(),
  paidBy: yup.string().min(6).max(20).required(),
});
const DailyExpenseForm = () => {
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

    const dailyExpense = dailyExpensesList.find((p) => p._id === id);

    setValue("_id", dailyExpense._id);
    setValue("description", dailyExpense.description);
    setValue("paidThrough", dailyExpense.paidThrough);
    setValue("paidBy", dailyExpense.paidBy);
  }, [id, setValue]);

  const onSubmitHandler = (data) => {
    console.log({ data });
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 flex-col p-10">
        <div className="flex flex-row justify-between border">
          <div>
            <IoArrowBack
              className="text-gray-800 h-8 w-8"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="flex-1 hidden lg:flex ml-15 mt justify-end">
            <img
              src="/assests/images/Dailyexpense.png"
              alt="homeimage"
              style={{ height: "300px", width: "320px" }}
            />
          </div>
        </div>
        <div className="lg:w-1/2  p-6">
          <div className="mt-12 flex flex-col items-center ">
            <h1 className="text-xl xl:text-3xl font-bold">Add Daily Expense</h1>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="w-screen flex-1 flex-row mt-8 border flex-wrap">
                <div className="mx-auto max-w-xs">
                  <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                      {...register("firstName")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="First Name"
                    />
                    <p className="text-red-500">{errors.firstName?.message}</p>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      {...register("lastName")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Last Name"
                    />
                    <p className="text-red-500">{errors.lastName?.message}</p>
                  </div>
                  {/* ------------------------------------------------------------------------------------------------------------------ */}
                  <div className="mt-5  border  pl-4 pr-4 h-80">
                    <label htmlFor="paymentDetails">Payment Details:-</label>
                    <br />
                    <div className="mt-5">
                      <label htmlFor="amounts">Amount</label>

                      <input
                        {...register("paymentDetails.amounts")}
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
                    <p className="text-red-500">
                      {errors.description?.message}
                    </p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="paidThrough">Paid Through</label>
                    <input
                      {...register("paidThrough")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Upi, Sbi bank"
                    />
                    <p className="text-red-500">
                      {errors.paidThrough?.message}
                    </p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="paidBy">Paid By</label>
                    <input
                      {...register("paidBy")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Person name"
                    />
                    <p className="text-red-500">{errors.paidBy?.message}</p>
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
export default DailyExpenseForm;

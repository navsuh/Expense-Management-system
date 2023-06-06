import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
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
  selectHousehold: yup.string().required(),
  selectExpense: yup.string().required(),
  frequency: yup.string().required(),
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
      <div className="max-w-screen-md  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 flex-col p-10">
        <div className="flex flex-row justify-between  ">
          <div>
            <IoArrowBack
              className="text-gray-800 h-8 w-8"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
          </div>
          {/* <div className="flex-1 hidden lg:flex ml-15 mt justify-end">
          <img
            src="/assests/images/Dailyexpense.png"
            alt="homeimage"
            style={{ height: "300px", width: "320px" }}
          />
        </div> */}
        </div>

        <div className=" bg-white px-6 sm:py-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold  text-orange-500 sm:text-4xl">
              Add Periodic Expense
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="mx-auto mt-16 max-w-xl "
          >
            <div className="grid gap-x-8 gap-y-4 grid-cols-2">
              <div className="w-full mt-2 h-32 ">
                <label htmlFor="selectHousehold" className="">
                  Household
                </label>

                <div className="relative border rounded-lg border-gray-300 text-gray-800 bg-gray-200 ">
                  <select
                    className="appearance-none w-full py-1 px-2 h-14 rounded-lg bg-gray-100 focus:outline-none focus:border-gray-400 focus:bg-white"
                    name="selectHousehold"
                    id="selectHousehold"
                    {...register("selectHousehold")}
                  >
                    <option value="">Select...</option>
                    <option value="1">Item 1</option>
                    <option value="2">Item 2</option>
                    <option value="3">Item 3</option>
                    <option value="1">Item 1</option>
                    <option value="2">Item 2</option>
                    <option value="3">Item 3</option>
                  </select>
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                    <p className="h-4 w-4">
                      <RiArrowDownSLine />
                    </p>
                  </div>
                </div>
                <p className="text-red-500">
                  {errors.selectHousehold?.message}
                </p>
              </div>
              <div className="w-full mt-2 h-32 ">
                <label htmlFor="selectExpense" className="">
                  Expense Type
                </label>

                <div className="relative border rounded-lg border-gray-300 text-gray-800  ">
                  <select
                    className="appearance-none w-full py-1 px-2 h-14 rounded-lg bg-gray-100 focus:outline-none focus:border-gray-400 focus:bg-white"
                    name="selectExpense"
                    id="selectExpense"
                    {...register("selectExpense")}
                  >
                    <option value="">Select...</option>
                    <option value="1">Item 1</option>
                    <option value="2">Item 2</option>
                    <option value="3">Item 3</option>
                    <option value="1">Item 1</option>
                    <option value="2">Item 2</option>
                    <option value="3">Item 3</option>
                  </select>
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 ">
                    <p className="h-4 w-4">
                      <RiArrowDownSLine />
                    </p>
                  </div>
                </div>
                <p className="text-red-500">{errors.selectExpense?.message}</p>
              </div>

              <div className="flex mb-4  col-span-2">
                <div className="w-1/3  h-12 mr-2">
                  <label htmlFor="amounts">Amount</label>

                  <div className="mt-2.5">
                    <input
                      {...register("amount")}
                      type="text"
                      name="amounts"
                      id="amounts"
                      className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      placeholder="Amount"
                    />
                    <p className="text-red-500">{errors.amount?.message}</p>
                  </div>
                </div>
                <div className="w-1/3  h-12 mr-2">
                  <label htmlFor="dueDate">Due Date</label>

                  <div className="mt-2.5">
                    <input
                      {...register("dueDate")}
                      type="date"
                      name="dueDate"
                      id="dueDate"
                      className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      placeholder="Paid By"
                    />
                    <p className="text-red-500">
                      {errors.dueDate?.message.slice(55, 70)}
                    </p>
                  </div>
                </div>
                <div className="w-1/3  h-12 mt-0.5">
                  <div className="relative  rounded-lg border-gray-300 text-gray-800  ">
                    <label htmlFor="frequency">Frequency</label>

                    <select
                      className="appearance-none w-full mt-2 py-1 px-2 h-14 border-gray-300 rounded-lg bg-gray-100 focus:outline-gray-200 focus:border-gray-400 focus:bg-white"
                      name="frequency"
                      id="frequency"
                      {...register("frequency")}
                    >
                      <option value="">Select...</option>
                      <option value="1">Weekly</option>
                      <option value="2">Monthly</option>
                      <option value="3">Yearly</option>
                    </select>
                    <p className="text-red-500">{errors.frequency?.message}</p>

                    <div className="pointer-events-none absolute right-0 top-8 bottom-0 flex items-center px-2 text-gray-700 ">
                      <p className="h-4 w-4">
                        <RiArrowDownSLine />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------------------------------------------------------------ */}

              <label htmlFor="paymentDetails" className="mt-14">
                Payment Details:-
              </label>

              <div className={`flex mb-4  col-span-2 ${errors.paymentDetails?'h-40':'h-28'} border rounded-lg border-gray-300 px-2`}>
                <div className="w-1/3  h-12 mr-2">
                  <label htmlFor="amount">Amount</label>

                  <div className="mt-2.5">
                    <input
                      {...register("paymentDetails.amounts")}
                      type="text"
                      name="amount"
                      id="amount"
                      className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      placeholder="Amount"
                    />
                    <p className="text-red-500">
                      {errors.paymentDetails?.amounts.message.slice(15)}
                    </p>
                  </div>
                </div>
                <div className="w-1/3  h-12 mr-2">
                  <label htmlFor="date">Date</label>

                  <div className="mt-2.5">
                    <input
                      {...register("paymentDetails.date")}
                      type="date"
                      name="date"
                      id="date"
                      className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      placeholder="Paid By"
                    />
                    <p className="text-red-500">
                      {errors.paymentDetails?.date.message.slice(15, 41)}
                    </p>
                  </div>
                </div>
                <div className="w-1/3  h-12 mr-2">
                  <label htmlFor="method">Method</label>

                  <div className="mt-2.5">
                    <input
                      {...register("paymentDetails.method")}
                      type="text"
                      name="method"
                      id="method"
                      className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      placeholder="upi,debit card"
                    />
                    <p className="text-red-500">
                      {errors.paymentDetails?.method.message.slice(15)}
                    </p>
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------------------------------------------------------------- */}

              <div className="col-span-2 ">
                <label htmlFor="description">Description</label>
                <div className="mt-2.5">
                  <textarea
                    {...register("description")}
                    name="description"
                    id="description"
                    rows="4"
                    className="block w-full rounded-lg  px-4 py-4 font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Payment Description(policy name, emi account)"
                  ></textarea>
                  <p className="text-red-500">{errors.description?.message}</p>
                </div>
              </div>
              <div>
                <label htmlFor="paidThrough">Paid Through</label>

                <div className="mt-2.5">
                  <input
                    {...register("paidThrough")}
                    type="text"
                    name="paidThrough"
                    id="paidThrough"
                    className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="icicibank, sbi bank etc."
                  />
                  <p className="text-red-500">{errors.paidThrough?.message}</p>
                </div>
              </div>
              <div>
                <label htmlFor="paidBy">Paid By</label>

                <div className="mt-2.5">
                  <input
                    {...register("paidBy")}
                    type="text"
                    name="paidBy"
                    id="paidBy"
                    className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Paid By"
                  />
                  <p className="text-red-500">{errors.paidBy?.message}</p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className=" font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out  items-center justify-center focus:shadow-outline focus:outline-none"
              >
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PeriodicExpenseForm;
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
// import { IoCaretDownSharp } from "react-icons/io5";
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
        <div className="flex flex-row justify-between ">
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

        <div className=" bg-white px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold  text-gray-900 sm:text-4xl">
              Add Daily Expense
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="mx-auto mt-16 max-w-xl "
          >
            <div className="grid gap-x-8 gap-y-6 grid-cols-2">
              <div>
                <label htmlFor="firstName">First Name</label>

                <div className="mt-2.5">
                  <input
                   {...register("firstName")}
                    type="text"
                    name="firstName"
                    id="first-name"
                    className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>

                <div className="mt-2.5">
                  <input
                   {...register("lastName")}
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              {/* ------------------------------------------------------------------------------------------------------------------ */}
        <div >
        <label htmlFor="paymentDetails">Payment Details:-</label>

             <div className="flex flex-row ">
              <br />
              <div>
                <label htmlFor="paymentDetails.amounts">Amounts</label>

                <div className="mt-2.5">
                  <input
                   {...register("amounts")}
                    type="text"
                    name="amounts"
                    id="amounts"
                    className="block w-30 px-4 py-4 mr-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Amount"
                    
                  />
                    <p className="text-red-500">{errors.paymentDetails?.amounts.message.slice(15)}</p>

                </div>
              </div>
              <div>
                <label htmlFor="date">Date</label>

                <div className="mt-2.5">
                  <input
                  {...register("paymentDetails.date")}
                    type="date"
                    name="date"
                    id="date"
                    className="block w-30 px-4 mr-2 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  />
                    <p className="text-red-500">{errors.paymentDetails?.date.message.slice(15,41)}</p>

                </div>
              </div>
              <div>
                <label htmlFor="method">Method</label>

                <div className="mt-2.5">
                  <input
                   {...register("paymentDetails.method")}
                    type="text"
                    name="method"
                    id="method"
                    className="block w-30 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Netbanking"
                  />
                    <p className="text-red-500">{errors.paymentDetails?.method.message.slice(15)}</p>

                </div>
              </div>
              </div>
              </div>
              {/* --------------------------------------------------------------------------------------------------------------- */}

              <div className="col-span-2">
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
export default DailyExpenseForm;

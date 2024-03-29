import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useNavigate, Navigate } from "react-router-dom";

import { RiArrowDownSLine } from "react-icons/ri";
import { useBoundStore } from "../../store";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customIdErrorMsg = "customIdErrorMsg";
// const customIdloginSuccess = "customIdloginSuccess";

const schema = yup.object().shape({
  households: yup.string().required(),
  selectExpense: yup.string().required(),
  amount: yup.number().min(0).required(),
  date: yup.string().required(),
  method: yup.string().min(3).max(50).required(),
  description: yup.string().min(6).max(80).required(),
  paidThrough: yup.string().min(3).max(50).required(),
  paidBy: yup.string().min(3).max(50).required(),
});

const DailyExpenseForm = ({ isDailyExpenseModalOpen, handleModalClose }) => {
  const user = useBoundStore((store) => store.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const houseHoldsOptions = useBoundStore((store) => store.households);

  const dailyExpensesList = useBoundStore((store) => store.dailyExpense);
  const expenseTypes = useBoundStore((store) => store.expenseTypes);
  const updateDailyExpense = useBoundStore((store) => store.updateDailyExpense);
  const createDailyExpense = useBoundStore((store) => store.createDailyExpense);
  const error_msg = useBoundStore((store) => store.error_msg_daily_expense);
  const ResetErrorMsg = useBoundStore((store) => store.ResetErrorMsgDailyExpense);
  const getAllExpenseTypes = useBoundStore((store) => store.getAllExpenseTypes);
  // const getAllDailyExpense =useBoundStore(store=>store.getAllDailyExpense)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getAllExpenseTypes();
  }, []);

  useEffect(() => {
    if (!id) return;

    const dailyExpense = dailyExpensesList.find((p) => p._id === id);

    setValue("_id", dailyExpense._id);
    setValue("description", dailyExpense.description);
    setValue("paidThrough", dailyExpense.paidThrough);
    setValue("paidBy", dailyExpense.paidBy);
    setValue("households", dailyExpense.household);
    setValue("selectExpense", dailyExpense.selectExpense);
    setValue("amount", dailyExpense.paymentDetails.amount);
    setValue("date", dailyExpense.paymentDetails.date);
    setValue("method", dailyExpense.paymentDetails.method);
  }, [id, setValue, dailyExpensesList]);

  useEffect(() => {
    if (user.role === "Primaryuser") navigate("/primaryuser/dailyexpenses");
    else if (user.role === "member") navigate("/memberuser/dailyexpenses");
    handleModalClose();
  }, [dailyExpensesList]);

  const closeAndReset = () => {
    if (user.role === "Primaryuser") navigate("/primaryuser/dailyexpenses");
    else if (user.role === "member") navigate("/memberuser/dailyexpenses");
    handleModalClose();
    reset();
  };

  const onSubmitHandler = (data) => {
    reset();

    if (data._id) {
      const { amount, date, method, selectExpense } = data;
      const paymentDetails = { amount, date, method };
      delete data.amount;
      delete data.date;
      delete data.method;
      delete data.selectExpense;
      const newData = { ...data, paymentDetails, expensetypes: selectExpense };
      updateDailyExpense({ newData });
      closeAndReset()
    } else {
      reset();
      const { amount, date, method, selectExpense } = data;
      const paymentDetails = { amount, date, method };
      delete data.amount;
      delete data.date;
      delete data.method;
      delete data.selectExpense;
      const newData = { ...data, paymentDetails, expensetypes: selectExpense };

      createDailyExpense({ newData });
    }
  };
  

  if (user.role === "Admin") {
    sessionStorage.removeItem("token");
    return <Navigate to="/login" replace={true} />;
  }

  if (!isDailyExpenseModalOpen) return null;
  if(error_msg){
   
    toast.error(`${error_msg}` , {
      toastId: customIdErrorMsg,
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       })
       ResetErrorMsg()
}


  return (
    <div
      id="modal-body"
      onClick={(e) => e.target.id === "modal-body" && closeAndReset()}
      className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center p-5 items-center bg-[rgba(0,0,0,0.5)]"
    >
      <div
        className={` ${
          errors.paidBy ? "w-[39rem] " : "w-[30rem]"
        } bg-white rounded-md px-6 py-4`}
      >
        <div className="flex justify-between">
          <h3 className="text-3xl font-bold text-center text-orange-500 ml-4">
            Add Daily Expense
          </h3>

          <span
            onClick={() => {
              closeAndReset();
            }}
            className="text-red-500 text-2xl cursor-pointer hover:text-red-600 hover:scale-150"
          >
            &times;
          </span>
        </div>

        <div className="lg:w-full p-4 mt-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="w-full lg:flex-grow"
            >
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-1/2 mr-3">
                  <label htmlFor="households" className="mb-1">
                    HouseHold
                  </label>
                  <label htmlFor="" className="text-red-700">*</label>
                  <div className="relative border rounded-lg border-gray-300 text-gray-800 bg-gray-200">
                    <select
                      className="appearance-none w-full py-2 px-4 rounded-lg bg-gray-100 focus:outline-none focus:border-gray-400 focus:bg-white"
                      name="households"
                      id="households"
                      {...register("households")}
                    >
                      <option value="" hidden>
                        Select Household
                      </option>
                      {houseHoldsOptions.map((house) => (
                        <option key={house._id} value={house.name}>
                          {house.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 ">
                      <p className="h-4 w-4">
                        <RiArrowDownSLine />
                      </p>
                    </div>
                  </div>
                  <p className="text-red-500">{errors.households?.message}</p>
                </div>
                <div className="w-full lg:w-1/2">
                  <label htmlFor="selectExpense" className="mb-1">
                    Expensetype
                  </label>
                  <label htmlFor="" className="text-red-700">*</label>
                  <div className="relative border rounded-lg border-gray-300 text-gray-800 bg-gray-200">
                    <select
                      className="appearance-none w-full py-2 px-4 rounded-lg bg-gray-100 focus:outline-none focus:border-gray-400 focus:bg-white"
                      name="selectExpense"
                      id="selectExpense"
                      {...register("selectExpense")}
                    >
                      <option value="" hidden>
                        Select Expenses
                      </option>
                      {expenseTypes.map((expense) => (
                        <option key={expense._id} value={expense.name}>
                          {expense.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 ">
                      <p className="h-4 w-4">
                        <RiArrowDownSLine />
                      </p>
                    </div>
                  </div>
                  <p className="text-red-500">
                    {errors.selectExpense?.message.slice(6, 40)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between mt-4">
                <div className="w-full lg:w-1/2 mr-3">
                  <label htmlFor="amount" className="mb-1">
                    Amount
                  </label>
                  <label htmlFor="" className="text-red-700">*</label>
                  <input
                    {...register("amount")}
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="number"
                    placeholder="Amount"
                  />
                  <p className="text-red-500">
                    {errors.amount?.message.slice(0, 25)}
                  </p>
                </div>
                <div className="w-full lg:w-1/2">
                  <label htmlFor="date" className="mb-1">
                    Date
                  </label>
                  <label htmlFor="" className="text-red-700">*</label>
                  <input
                    {...register("date")}
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="date"
                  />
                  <p className="text-red-500">{errors.date?.message}</p>
                </div>
                <div className="w-full lg:w-1/2 ml-3">
                  <label htmlFor="method" className="mb-1">
                    Method
                  </label>
                  <label htmlFor="" className="text-red-700">*</label>
                  <input
                    {...register("method")}
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Netbanking"
                  />
                  <p className="text-red-500">{errors.method?.message}</p>
                </div>
              </div>

              <div className="w-full mt-2">
                <label htmlFor="description" className="mb-1">
                  Description
                </label>
                <label htmlFor="" className="text-red-700">*</label>
                <textarea
                  {...register("description")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="policy name, emi account"
                />
                <p className="text-red-500">{errors.description?.message}</p>
              </div>

              <div className="flex flex-col lg:flex-row justify-between mt-2">
                <div className="w-full lg:w-1/2 mr-3">
                  <label htmlFor="paidThrough" className="mb-1">
                    Paid Through
                  </label>
                  <label htmlFor="" className="text-red-700">*</label>
                  <input
                    {...register("paidThrough")}
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="icicibank,sbi bank etc."
                  />
                  <p className="text-red-500">{errors.paidThrough?.message}</p>
                </div>
                <div className="w-full lg:w-1/2">
                  <label htmlFor="paidBy" className="mb-1">
                    Paid By
                  </label>
                  <label htmlFor="" className="text-red-700">*</label>
                  <input
                    {...register("paidBy")}
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Paid By"
                  />
                  <p className="text-red-500">{errors.paidBy?.message}</p>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <span className="ml-3">ADD</span>
              </button>
            </form>
          </div>
          <p className="text-red-500">{error_msg ? error_msg : null}</p>
        </div>
      </div>
    </div>
  );
};
export default DailyExpenseForm;

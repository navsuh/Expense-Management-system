import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate,Navigate } from "react-router-dom";
import { useBoundStore } from "../../store.js";

// const expenseList = [
//   { _id: "1", name: "Expense type 1" },
//   { _id: "2", name: "Expense type 2" },
// ];

const schema = yup.object().shape({
  name: yup.string().min(3).max(50).required(),
});
const ExpenseTypeForm = () => {
  const user = useBoundStore((store) => store.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const expenseList = useBoundStore((store) => store.expenseTypes);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createExpenseTypes = useBoundStore((store) => store.createExpenseTypes);
  // const token=useBoundStore(store=>store.token)
  const updateExpenseTypes = useBoundStore((store) => store.updateExpenseTypes);

  const error_msg = useBoundStore((store) => store.error_msg);

  useEffect(() => {
    if (!id) return;
    console.log(id);
    const expensetype = expenseList.find((e) => e._id === id);
    console.log(typeof id);
    console.log(expensetype);
    setValue("_id", expensetype._id);
    setValue("name", expensetype.name);
  }, [id, setValue, expenseList]);

  const onSubmitHandler = (data) => {
    if (data._id) {
      // console.log("here");
      updateExpenseTypes({ data });
      return navigate("/admin/expensetype");
    } else {
      createExpenseTypes({ data });
      // console.log("dispatched");
      return navigate("/admin/expensetype");
    }
  };
  
  if(user.role!=="Admin"){
    sessionStorage.removeItem("token")
return <Navigate to="/login" replace={true} />
  }
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center items-center flex-1 p-10">
        <IoArrowBack
          className="self-start w-8 h-8 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="flex-1 text-center hidden lg:flex ml-20 mt-20">
          <img
            src="/assests/images/expenseTypeForm.png"
            alt="homeimage"
            style={{ height: "500px", width: "400px" }}
          />
        </div>

        <div className="lg:w-1/2  p-6">
          <div className="flex flex-col justify-center items-center ">
            {/* <img src="/assests/images/logoexms.png" alt="logoimage" /> */}

            <h1 className="text-xl xl:text-3xl font-bold text-orange-500">
              ADD EXPENSE TYPE
            </h1>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <div>
                    <label htmlFor="expenseTypeName" className="mb-1">
                      Expense Type
                    </label>
                    <input
                      id="expenseTypeName"
                      {...register("name")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Expense Type"
                    />
                    <p>{errors.name?.message}</p>
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
            <p className="text-red-500">{error_msg ? error_msg : null}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExpenseTypeForm;

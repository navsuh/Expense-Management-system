import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useNavigate,Navigate } from "react-router-dom";
import { useBoundStore } from "../../store.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customIdErrorMsg = "customIdErrorMsg";
// const customIdloginSuccess = "customIdloginSuccess";

const schema = yup.object().shape({
  name: yup.string().min(3).max(50).required(),
});
const ExpenseTypeForm = ({ isExpenseTypeModalOpen, handleModalClose })  => {
  const user = useBoundStore((store) => store.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const expenseList = useBoundStore((store) => store.expenseTypes);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createExpenseTypes = useBoundStore((store) => store.createExpenseTypes);
  // const token=useBoundStore(store=>store.token)
  const updateExpenseTypes = useBoundStore((store) => store.updateExpenseTypes);

  const error_msg = useBoundStore((store) => store.error_msg_expense_type);
  const ResetErrorMsg = useBoundStore((store) => store.ResetErrorMsgExpenseType);
  useEffect(()=>{
    navigate("/admin/expensetype");
    handleModalClose()
    reset()
    return () => {
      console.log("cleaned up getAll ExpenseTypes Form useeffect1");
    };
  },[expenseList])

  useEffect(() => {
    if (!id) return;
    console.log(id);
    const expensetype = expenseList.find((e) => e._id === id);
    // console.log(typeof id);
    // console.log(expensetype);
    setValue("_id", expensetype._id);
    setValue("name", expensetype.name);
    return () => {
      console.log("cleaned up getAll ExpenseTypes Form useeffect2");
    };
  }, [id, setValue, expenseList]);

  const closeAndReset =()=>{
    navigate("/admin/expensetype")
    reset()
    handleModalClose()
  }
  const onSubmitHandler = (data) => {
    if (data._id) {
      // console.log("here");
      updateExpenseTypes({ data });
      closeAndReset()
    } else {
      createExpenseTypes({ data });
    }
    reset()
    
  };

 
  
  
  if(user.role!=="Admin"){
    sessionStorage.removeItem("token")
return <Navigate to="/login" replace={true} />
  }
  if(!isExpenseTypeModalOpen) return null;
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
    <div id="modal-body" onClick={(e) => e.target.id === "modal-body" && closeAndReset()} className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
    <div className="w-96 h-72 bg-white rounded-md px-6 py-4">
      <div className="flex justify-between">
      <h3 className="text-3xl font-bold text-center text-orange-500 ml-4">Add Expense Type</h3>
  
      <span onClick={() => {
        closeAndReset()
        }} className="text-red-500 text-2xl cursor-pointer hover:text-red-600 hover:scale-150">&times;</span>
      </div>
  
      <div className="lg:w-full p-4 mt-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full lg:flex-grow">
            <div className="w-full mt-4">
            <label htmlFor="name" className="mb-1 mt-2">Expense Type</label> <label htmlFor="" className="text-red-700">*</label>
                <input
                  {...register("name")}
                  className="w-full px-4 mt-5 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="name"
                />
                <p className="text-red-500">{errors.name?.message}</p>
            </div>
  
            <button
              type="submit"
              className="mt-6 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
export default ExpenseTypeForm;

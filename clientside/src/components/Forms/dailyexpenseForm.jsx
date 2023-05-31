import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useParams ,useNavigate} from "react-router-dom";

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
  email: yup.string().min(3).max(50).required(),
  phone: yup.string().min(8).max(10).required(),
  userName: yup.string().min(6).max(20).required(),
  description: yup.string().min(6).max(20).required(),
  paidThrough: yup.string().min(6).max(20).required(),
  paidBy: yup.string().min(6).max(20).required(),
  
});
const DailyExpenseForm = () => {
  const navigate =useNavigate()
  const {id}=useParams()
   
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(()=>{
    if(!id) return;
    
    const dailyExpense=dailyExpensesList.find((p)=>p._id===id)
    
    setValue("_id",dailyExpense._id)
    
    
    
    setValue("description",dailyExpense.description)
    setValue("paidThrough",dailyExpense.paidThrough)
    setValue("paidBy",dailyExpense.paidBy)
    

  },[id,setValue])

  const onSubmitHandler = (data) => {
    console.log({ data });
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 p-10">
         <IoArrowBack className="text-gray-800 h-8 w-8" style={{cursor:"pointer"}} onClick={()=>navigate(-1)} />

        <div className="flex-1 text-center hidden lg:flex ml-15 mt-40">

          <img
            src="/assests/images/Dailyexpense.png"
            alt="homeimage"
            style={{ height: "550px", width:"600px" }}
          />
        </div>

        <div className="lg:w-1/2  p-6">
          <div className="mt-12 flex flex-col items-center  ">
          
            <h1 className="text-xl xl:text-3xl font-bold">Add Daily Expense</h1>
          
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
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                      {...register("dueDate")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="date"
                      placeholder=""
                    />
                    <p>{errors.dueDate?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="email">Email</label>
                    <input
                      {...register("email")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                    />
                    <p>{errors.email?.message}</p>
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
export default DailyExpenseForm;

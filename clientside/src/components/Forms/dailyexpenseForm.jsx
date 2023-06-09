import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate,Navigate } from "react-router-dom";
// import { IoCaretDownSharp } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";
import { useBoundStore } from "../../store";


const schema = yup.object().shape({
  households: yup.string().required(),
  selectExpense: yup.string().required(),
  // paymentDetails: yup.object().shape({
    amount: yup.number().min(0).required(),
    date: yup.string().required(),
    method: yup.string().min(3).max(50).required(),
  // }),
  description: yup.string().min(6).max(80).required(),
  paidThrough: yup.string().min(3).max(50).required(),
  paidBy: yup.string().min(3).max(50).required(),
});

const DailyExpenseForm = () => {
  const user = useBoundStore((store) => store.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const houseHoldsOptions =useBoundStore(store=>store.households)
  // console.log(houseHoldsOptions);
  const dailyExpensesList = useBoundStore(store=>store.dailyExpense)
  const expenseTypes=useBoundStore(store=>store.expenseTypes)
  const updateDailyExpense =useBoundStore(store=>store.updateDailyExpense)
  const createDailyExpense =useBoundStore(store=>store.createDailyExpense)


  const getAllExpenseTypes =useBoundStore(store=>store.getAllExpenseTypes)
  const getAllDailyExpense =useBoundStore(store=>store.getAllDailyExpense)
  //  console.log(expenseTypes);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  useEffect(()=>{
    getAllExpenseTypes()
  },[])


  useEffect(() => {
    if (!id) return;

    const dailyExpense = dailyExpensesList.find((p) => p._id === id);
    console.log(dailyExpense);

     const newDate =new  Date(dailyExpense.paymentDetails.date )
     dailyExpense.paymentDetails.date = newDate
    setValue("_id", dailyExpense._id);
    setValue("description", dailyExpense.description);
    setValue("paidThrough", dailyExpense.paidThrough);
    setValue("paidBy", dailyExpense.paidBy);
    setValue("households",dailyExpense.household)
    setValue("selectExpense",dailyExpense.selectExpense)
    setValue("amount",dailyExpense.paymentDetails.amount)
    setValue("date",dailyExpense.paymentDetails.date)
    setValue("method",dailyExpense.paymentDetails.method)
    
  }, [id, setValue,dailyExpensesList]);


  const onSubmitHandler =(data) => {
   
      if (data._id) {
        const householdId = houseHoldsOptions.find(house => house.name === data.households)?._id;
        const expenseTypeId = expenseTypes.find(expense => expense.name === data.selectExpense)?._id;
         
        // let objectDate = data.paymentDetails.date;
        // let day = objectDate.getDate();
        // console.log(day); // 23
       
        // let month = objectDate.getMonth()+1;
        // console.log(month + 1); // 8
        
        // let year = objectDate.getFullYear();
      

        // let format3 = year + "-" +"0"+ month + "-" + "0"+ day;
        // console.log(typeof format3);

        // data.paymentDetails.date =format3

        console.log(data);
        console.log(houseHoldsOptions);
        console.log(expenseTypes);
        console.log(householdId);
        console.log(expenseTypeId);


        const updatedData = {
          ...data,
          households: householdId,
          expenseTypes: expenseTypeId,
          
        };
        
        console.log(updatedData);
        
         updateDailyExpense({updatedData});
      } else {
        // console.log(data);
        const{amount,date,method,selectExpense}=data
        const paymentDetails={amount,date,method}
        delete data.amount
        delete data.date
        delete data.method
        delete data.selectExpense
        const newData={...data,paymentDetails,expensetypes:selectExpense}
        // console.log(newData);
        createDailyExpense({newData});
      }
  
      navigate("/primaryuser/dailyexpenses");
 
  };
  

  if(user.role==="Admin"){
    sessionStorage.removeItem("token")
return <Navigate to="/login" replace={true} />
  }
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-md  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 flex-col p-10">
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

        <div className=" bg-white px-6 sm:py-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold  text-orange-500 sm:text-4xl">
              Add Daily Expense
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="mx-auto mt-16 max-w-xl "
          >
            <div className="grid gap-x-6 gap-y-4 grid-cols-2 ">
              <div className="w-full mt-2 h-24 ">
                <label htmlFor="households" className="mb-0">
                  Household
                </label>

                <div className="relative border rounded-lg border-gray-300 text-gray-800 bg-gray-200 ">
                  <select
                    className="appearance-none w-full py-1 px-2 h-14 rounded-lg bg-gray-100 focus:outline-none focus:border-gray-400 focus:bg-white"
                    name="households"
                    id="households"
                    {...register("households")}
                  >
               {houseHoldsOptions.map(house=><option key={house._id} value={house.name}>{house.name}</option>)}

                  </select>
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                    <p className="h-4 w-4">
                      <RiArrowDownSLine />
                    </p>
                  </div>
                </div>
                <p className="text-red-500">
                  {errors.households?.message}
                </p>
              </div>
              <div className="w-full mt-2 h-24">
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
                  {expenseTypes.map(expense=><option key={expense._id} value={expense.name}>{expense.name}</option>)}
                  {/* <option value="">Select...</option>
                    <option value="1">Item 1</option>
                    <option value="2">Item 2</option>
                    <option value="3">Item 3</option>
                    <option value="1">Item 1</option>
                    <option value="2">Item 2</option>
                    <option value="3">Item 3</option> */}

                  </select>
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 ">
                    <p className="h-4 w-4">
                      <RiArrowDownSLine />
                    </p>
                  </div>
                </div>
                <p className="text-red-500">{errors.selectExpense?.message}</p>
              </div>

             

              {/* ------------------------------------------------------------------------------------------------------------------ */}
              
                <label htmlFor="paymentDetails" >Payment Details:-</label>

                <div 
                // className={`flex mb-4  col-span-2 ${errors.paymentDetails?'h-40':'h-28'} border rounded-lg border-gray-300 px-2`}>
                className={`flex mb-4  col-span-2 'h-40' border rounded-lg border-gray-300 px-2`}>
                <div className="w-1/3  h-12 mr-2">
                
                <label htmlFor="amount">Amount</label>

                <div className="mt-2.5">
                  <input
                    // {...register("paymentDetails.amount")}
                    {...register("amount")}
                    type="number"
                    name="amount"
                    id="amount"
                    className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Amount"
                  />
                  {/* <p className="text-red-500">{errors.paymentDetails?.amount.message.slice(15)}</p> */}
                  <p className="text-red-500">{errors.amount?.message.slice(15)}</p>
                </div>
                </div>
                <div className="w-1/3  h-12 mr-2">
                
                <label htmlFor="date">Date</label>

                <div className="mt-2.5">
                  <input
                    // {...register("paymentDetails.date")}
                    {...register("date")}
                    type="date"
                    name="date"
                    id="date"
                    className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Paid By"
                  />
                  {/* <p className="text-red-500">{errors.paymentDetails?.date.message.slice(15,41)}</p> */}
                  <p className="text-red-500">{errors.date?.message}</p>
                </div>
                </div>
                <div className="w-1/3  h-12 mr-2">
                
                <label htmlFor="method">Method</label>

                <div className="mt-2.5">
                  <input
                    // {...register("paymentDetails.method")}
                    {...register("method")}
                    type="text"
                    name="method"
                    id="method"
                    className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="upi,debit card"
                  />
                  {/* <p className="text-red-500">{errors.paymentDetails?.method.message.slice(15)}</p> */}
                  <p className="text-red-500">{errors.method?.message.slice(15)}</p>
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
export default DailyExpenseForm;

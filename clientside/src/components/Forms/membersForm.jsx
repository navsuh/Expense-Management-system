import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { Link } from "react-router-dom";
import {IoArrowBack} from "react-icons/io5"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useParams , useNavigate,Navigate } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import { useBoundStore } from "../../store";

// const memberList = [
//   { _id: "1", household: "household 1", user: "user 1" },
//   { _id: "2", household: "household 1", user: "user 2" },
// ];

const userList = [
  {
    _id: "1",
    firstName: "user 1 fName",
    lastName: "user 1 lName",
    email: "user 1 email",
    phone: "user 1 phone",
    userName: "user 1 userName",
    role: "user 1 role",
    lastLoggedIn: "user 1 lastLoggedIn",
    isActive: true,
    updatedBy: "user 1 updatedBy",
    updatedAt: "user1 updatedAt",
  },
  {
    _id: "2",
    firstName: "user 2 fName",
    lastName: "user 2 lName",
    email: "user 2 email",
    phone: "user 2 phone",
    userName: "user 2 userName",
    role: "user 2 role",
    lastLoggedIn: "user 2 lastLoggedIn",
    isActive: true,
    updatedBy: "user 2 updatedBy",
    updatedAt: "user2 updatedAt",
  },
];

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(50).required(),
  lastName: yup.string().min(3).max(50).required(),
  email: yup.string().min(3).max(50).required(),
  phone: yup.string().min(8).max(10).required(),
  userName: yup.string().min(6).max(20).required(),
  password: yup.string().min(8).max(32).required(),
});
const MemberForm = () => {
  const user = useBoundStore((store) => store.user);
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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const householdList =useBoundStore(store=>store.households)
console.log(householdList);
  useEffect(()=>{
    if(!id) return;
    console.log(id);
    const member=userList.find((m)=>m._id===id)
    
    setValue("_id",member._id)
    setValue("firstName",member.firstName)
    setValue("lastName",member.lastName)
    setValue("email",member.email)
    setValue("phone",member.phone)
    setValue("userName",member.userName)
    // setValue("isActive",member.isActive)
    
  },[id,setValue])

  const onSubmitHandler = (data) => {
    console.log({ data });
  };
  if(user.role!=="Primaryuser"){
    sessionStorage.removeItem("token")
return <Navigate to="/login" replace={true} />
  }
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 p-10">
         <IoArrowBack className="text-gray-800 h-8 w-8" style={{cursor:"pointer"}}  onClick={()=>navigate(-1)}/>

        <div className="flex-1 text-center hidden lg:flex ml-20 mt-20">

          <img
            src="/assests/images/addMember.png"
            alt="homeimage"
            style={{ height: "600px" }}
          />
        </div>

        <div className="lg:w-1/2  p-6">
          <div className="mt-12 flex flex-col items-center  ">
          
            <h1 className="text-xl xl:text-3xl font-bold text-orange-500">Add Member</h1>
          
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
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      {...register("lastName")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Last Name"
                    />
                    <p>{errors.lastName?.message}</p>
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
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      {...register("phone")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Phone Number"
                    />
                    <p>{errors.phone?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="userName">UserName</label>
                    <input
                      {...register("userName")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="User Name"
                    />
                    <p>{errors.userName?.message}</p>
                  </div>
                  <div className="relative mt-5">
                    <label htmlFor="password">Password</label>
                    <input
                      {...register("password")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <span
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer mt-3"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <AiFillEye className="h-6 w-6 " />
                      ) : (
                        <AiFillEyeInvisible className="h-6 w-6 " />
                      )}
                    </span>
                    <p>{errors.password?.message}</p>
                  </div>
                  <div className="w-full mt-2 h-24 ">
                <label htmlFor="selectHousehold" className="mb-0">
                   Select House
                </label>

                <div className="relative border rounded-lg border-gray-300 text-gray-800 bg-gray-200 ">
                  <select
                    className="appearance-none w-full py-1 px-2 h-14 rounded-lg bg-gray-100 focus:outline-none focus:border-gray-400 focus:bg-white"
                    name="selectHousehold"
                    id="selectHousehold"
                    {...register("selectHousehold")}
                  >
                    {householdList.map(house=><option key={house._id} value="">{house.name}</option>)}
             
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
export default MemberForm;

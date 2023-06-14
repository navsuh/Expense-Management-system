import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {  useNavigate, Navigate } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import { useBoundStore } from "../../store";

// const memberList = [
//   { _id: "1", household: "household 1", user: "user 1" },
//   { _id: "2", household: "household 1", user: "user 2" },
// ];

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(50).required(),
  lastName: yup.string().min(3).max(50).required(),
  email: yup.string().min(3).max(50).required(),
  phone: yup.string().min(8).max(10).required(),
  userName: yup.string().min(6).max(20).required(),
  password: yup.string().min(8).max(32).required(),
  householdName: yup.string().required(),
});
const CreateMemberForm = ({ isModalOpen, handleModalClose }) => {
  const user = useBoundStore((store) => store.user);
  // const memberList = useBoundStore(store=>store.memberData)
  const houseHoldList = useBoundStore((store) => store.households);
  const addMember = useBoundStore((store) => store.addMember);
  const navigate = useNavigate();
  const error_msg = useBoundStore((store) => store.error_msg);
  const getAllMembers = useBoundStore(store=>store.getAllMembers)

  // const {id}=useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(()=>{
    getAllMembers()
  },[getAllMembers])

  // const [showPassword, setShowPassword] = useState(false);

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  // useEffect(()=>{
  //   if(!id) return;
  //   console.log(id);
  //   const member=memberList.find((m)=>m._id===id)

  //   setValue("_id",member._id)
  //   setValue("firstName",member.firstName)
  //   setValue("lastName",member.lastName)
  //   setValue("email",member.email)
  //   setValue("phone",member.phone)
  //   setValue("userName",member.userName)
  //   setValue("household",member.household)

  // },[id,setValue,memberList])

  
  const onSubmitHandler = (data) => {
    // console.log({ data });
    addMember({ data });
    navigate("/primaryuser/members")
    handleModalClose()
   
  };

  if (user.role !== "Primaryuser") {
    sessionStorage.removeItem("token");
    return <Navigate to="/login" replace={true} />;
  }

  if(!isModalOpen) return null
  return (
    // <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    //   <div className="max-w-screen-xl  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 p-10">
    //     <IoArrowBack
    //       className="text-gray-800 h-8 w-8"
    //       style={{ cursor: "pointer" }}
    //       onClick={() => navigate(-1)}
    //     />

    //     <div className="flex-1 text-center hidden lg:flex ml-20 mt-20">
    //       <img
    //         src="/assests/images/addMember.png"
    //         alt="homeimage"
    //         style={{ height: "600px" }}
    //       />
    //     </div>

    //     <div className="lg:w-1/2  p-6">
    //       <div className="mt-12 flex flex-col items-center  ">
    //         <h1 className="text-xl xl:text-3xl font-bold text-orange-500">
    //           Add Member
    //         </h1>

    //         <form onSubmit={handleSubmit(onSubmitHandler)}>
    //           <div className="w-full flex-1 mt-8">
    //             <div className="mx-auto max-w-xs">
    //               <div>
    //                 <label htmlFor="firstName">First Name</label>
    //                 <input
    //                   {...register("firstName")}
    //                   className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
    //                   type="text"
    //                   placeholder="First Name"
    //                 />
    //                 <p className="text-red-500">{errors.firstName?.message}</p>
    //               </div>
    //               <div className="mt-5">
    //                 <label htmlFor="lastName">Last Name</label>
    //                 <input
    //                   {...register("lastName")}
    //                   className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
    //                   type="text"
    //                   placeholder="Last Name"
    //                 />
    //                 <p className="text-red-500">{errors.lastName?.message}</p>
    //               </div>
    //               <div className="mt-5">
    //                 <label htmlFor="email">Email</label>
    //                 <input
    //                   {...register("email")}
    //                   className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
    //                   type="email"
    //                   placeholder="Email"
    //                 />
    //                 <p className="text-red-500">{errors.email?.message}</p>
    //               </div>
    //               <div className="mt-5">
    //                 <label htmlFor="phone">Phone Number</label>
    //                 <input
    //                   {...register("phone")}
    //                   className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
    //                   type="text"
    //                   placeholder="Phone Number"
    //                 />
    //                 <p className="text-red-500">{errors.phone?.message}</p>
    //               </div>
    //               <div className="mt-5">
    //                 <label htmlFor="userName">UserName</label>
    //                 <input
    //                   {...register("userName")}
    //                   className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
    //                   type="text"
    //                   placeholder="User Name"
    //                 />
    //                 <p className="text-red-500">{errors.userName?.message}</p>
    //               </div>
    //               <div className="relative mt-5">
    //                 <label htmlFor="password">Password</label>
    //                 <input
    //                   {...register("password")}
    //                   className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
    //                   type={showPassword ? "text" : "password"}
    //                   placeholder="Password"
    //                 />
    //                 <span
    //                   className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer mt-3"
    //                   onClick={togglePasswordVisibility}
    //                 >
    //                   {showPassword ? (
    //                     <AiFillEye className="h-6 w-6 " />
    //                   ) : (
    //                     <AiFillEyeInvisible className="h-6 w-6 " />
    //                   )}
    //                 </span>
    //                 <p className="text-red-500">{errors.password?.message}</p>
    //               </div>
    //               <div className="w-full mt-2 h-24 ">
    //                 <label htmlFor="selectHousehold" className="mb-0">
    //                   Select House
    //                 </label>

    //                 <div className="relative border rounded-lg border-gray-300 text-gray-800 bg-gray-200 ">
    //                   <select
    //                     className="appearance-none w-full py-1 px-2 h-14 rounded-lg bg-gray-100 focus:outline-none focus:border-gray-400 focus:bg-white"
    //                     name="selectHousehold"
    //                     id="selectHousehold"
    //                     {...register("householdName")}
    //                   >
    //                     {houseHoldList.map((house) => (
    //                       <option key={house._id} value={house.name}>
    //                         {house.name}
    //                       </option>
    //                     ))}
    //                   </select>
    //                   <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
    //                     <p className="h-4 w-4">
    //                       <RiArrowDownSLine />
    //                     </p>
    //                   </div>
    //                 </div>
    //                 <p className="text-red-500">
    //                   {errors.householdName?.message}
    //                 </p>
    //               </div>
    //               <button
    //                 type="submit"
    //                 className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
    //               >
    //                 <span className="ml-3">ADD</span>
    //               </button>
    //             </div>
    //           </div>
    //         </form>
    //         <p className="text-red-500">{error_msg ? error_msg : null}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div id="modal-body" onClick={(e) => e.target.id === "modal-body" && handleModalClose()} className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
    <div className="w-96 bg-white rounded-md px-6 py-4">
      <div className="flex justify-between">
      <h3 className="text-3xl font-bold text-center text-orange-500 ml-4">Add Member</h3>
  
        <span onClick={() => handleModalClose()} className="text-red-500 text-2xl cursor-pointer">&times;</span>
      </div>
  
      <div className="lg:w-full p-4 mt-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full lg:flex-grow">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-1/2 mr-3">
                <label htmlFor="firstName" className="mb-1">First Name</label>
                <input
                  {...register("firstName")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="First Name"
                />
                <p className="text-red-500">{errors.firstName?.message}</p>
              </div>
              <div className="w-full lg:w-1/2">
                <label htmlFor="lastName" className="mb-1">Last Name</label>
                <input
                  {...register("lastName")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Last Name"
                />
                <p className="text-red-500">{errors.lastName?.message}</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between mt-4">
              <div className="w-full lg:w-1/2 mr-3">
                <label htmlFor="email" className="mb-1">Email Id</label>
                <input
                  {...register("email")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="abc@gmail.com"
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
              <div className="w-full lg:w-1/2">
                <label htmlFor="Password" className="mb-1">Password</label>
                <input
                  {...register("password")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                />
                {/* <span
                      className="absolute top-2/5 left  transform -translate-y-1/2 cursor-pointer mt-5 -ml-8"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <AiFillEye className="h-6 w-6 " />
                      ) : (
                        <AiFillEyeInvisible className="h-6 w-6 " />
                      )}
                    </span> */}
                <p className="text-red-500">{errors.password?.message}</p>
              </div>
            </div>
  
            <div className="flex flex-col lg:flex-row justify-between mt-4">
              <div className="w-full lg:w-1/2 mr-3">
                <label htmlFor="phone" className="mb-1">Phone Number</label>
                <input
                  {...register("phone")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Phone Number"
                />
                <p className="text-red-500">{errors.phone?.message}</p>
              </div>
              <div className="w-full lg:w-1/2">
                <label htmlFor="userName" className="mb-1">UserName</label>
                <input
                  {...register("userName")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="User Name"
                />
                <p className="text-red-500">{errors.userName?.message}</p>
              </div>
            </div>
  
            <div className="w-full mt-4">
              <label htmlFor="selectHousehold" className="mb-1">Select House</label>
              <div className="relative border rounded-lg border-gray-300 text-gray-800 bg-gray-200">
                <select
                  className="appearance-none w-full py-2 px-4 rounded-lg bg-gray-100 focus:outline-none focus:border-gray-400 focus:bg-white"
                  name="selectHousehold"
                  id="selectHousehold"
                  {...register("householdName")}
                >
                  {houseHoldList.map((house) => (
                    <option key={house._id} value={house.name}>
                      {house.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                  <p className="h-4 w-4">
                    <RiArrowDownSLine />
                  </p>
                </div>
              </div>
              <p className="text-red-500">{errors.selectHousehold?.message}</p>
            </div>
  
            <button
              type="submit"
              className="mt-4 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <span className="ml-3">ADD</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};
export default CreateMemberForm;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { IoArrowBack } from "react-icons/io5";

import { useParams, useNavigate, Navigate } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import { useBoundStore } from "../../store";

// const memberList = [
//   { _id: "1", household: "household 1", user: "user 1" },
//   { _id: "2", household: "household 1", user: "user 2" },
// ];

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(50).required(),
  lastName: yup.string().min(3).max(50).required(),
  // email: yup.string().min(3).max(50).required(),
  phone: yup.string().min(8).max(10).required(),
  userName: yup.string().min(6).max(20).required(),
  // password: yup.string().min(8).max(32).required(),
  householdName: yup.string().required(),
});
const EditMemberForm = () => {
  const user = useBoundStore((store) => store.user);
  const memberList = useBoundStore((store) => store.memberData);
  const houseHoldList = useBoundStore((store) => store.households);
  const updateMember = useBoundStore((store) => store.updateMember);
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
    const member = memberList.find((m) => m._id === id);

    setValue("_id", member._id);
    setValue("firstName", member.firstName);
    setValue("lastName", member.lastName);
    // setValue("email", member.email);
    setValue("phone", member.phone);
    setValue("userName", member.userName);
    setValue("householdName", member.household);
  }, [id, setValue, memberList]);

  const onSubmitHandler = (data) => {
    console.log({ data });
    const member = memberList.find((m) => m._id === id);
    const {memberUserId}=member
    console.log(memberUserId);
    const newData={...data,memberUserId}
   
    updateMember({newData})
    return navigate("/primaryuser/members");
  };
  if (user.role !== "Primaryuser") {
    sessionStorage.removeItem("token");
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 p-10">
        <IoArrowBack
          className="text-gray-800 h-8 w-8"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />

        <div className="flex-1 text-center hidden lg:flex ml-20 mt-20">
          <img
            src="/assests/images/addMember.png"
            alt="homeimage"
            style={{ height: "600px" }}
          />
        </div>

        <div className="lg:w-1/2  p-6">
          <div className="mt-12 flex flex-col items-center  ">
            <h1 className="text-xl xl:text-3xl font-bold text-orange-500">
              Add Member
            </h1>

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
                  {/* <div className="mt-5">
                    <label htmlFor="email">Email</label>
                    <input
                      {...register("email")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                    />
                    <p>{errors.email?.message}</p>
                  </div> */}
                  <div className="mt-5">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      {...register("phone")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Phone Number"
                    />
                    <p className="text-red-500">{errors.phone?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="userName">UserName</label>
                    <input
                      {...register("userName")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="User Name"
                    />
                    <p className="text-red-500">{errors.userName?.message}</p>
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
                    <p className="text-red-500">
                      {errors.selectHousehold?.message}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">UPDATE</span>
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
export default EditMemberForm;

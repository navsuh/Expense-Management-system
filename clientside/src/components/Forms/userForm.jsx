import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useBoundStore } from "../../store";

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(50).required(),
  lastName: yup.string().min(3).max(50).required(),
  // email: yup.string().min(3).max(50).required(),
  phone: yup.string().min(8).max(10).required(),
  userName: yup.string().min(6).max(20).required(),
  isActive: yup.boolean(),
});
const UserForm = ({ isModalOpen, handleModalClose }) => {
  const user = useBoundStore((store) => store.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const userList = useBoundStore((store) => store.usersData);
  const updateUser = useBoundStore((store) => store.updateUser);
  const error_msg = useBoundStore((store) => store.error_msg);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

useEffect(()=>{
   navigate("/admin/users");
    handleModalClose()
},[userList])
// useEffect(()=>{
//   navigate("/admin/users");
//    handleModalClose()
// },[userList])

  useEffect(() => {
    if (!id) return;
    console.log(id);
    const user = userList.find((u) => u._id === id);

    setValue("_id", user._id);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    // setValue("email",user.email)
    setValue("phone", user.phone);
    setValue("userName", user.userName);
    setValue("isActive", user.isActive);
  }, [id, setValue, userList]);

  const onSubmitHandler = (data) => {
    console.log(data);
    updateUser({ data }, user._id);
    // if(!error_msg){
    // navigate("/admin/users");
    // handleModalClose()
    // }
  };
  if (user.role !== "Admin") {
    sessionStorage.removeItem("token");
    return <Navigate to="/login" replace={true} />;
  }
  const closeAndReset = () => {
    navigate("/admin/users")
    handleModalClose();
    reset();
  };

  if (!isModalOpen) return null;
  return (
    <div
      id="modal-body"
      onClick={(e) => e.target.id === "modal-body" && closeAndReset()}
      className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
    >
      <div className="w-96 bg-white rounded-md px-6 py-4">
        <div className="flex justify-between">
          <h3 className="text-3xl font-bold text-center text-orange-500 ml-4">
            Edit User
          </h3>

          <span
            onClick={() => {
              closeAndReset();
            }}
            className="text-red-500 text-2xl cursor-pointer"
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
                  <label htmlFor="firstName" className="mb-1">
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="First Name"
                  />
                  <p className="text-red-500">{errors.firstName?.message}</p>
                </div>
                <div className="w-full lg:w-1/2">
                  <label htmlFor="lastName" className="mb-1">
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Flat No"
                  />
                  <p className="text-red-500">{errors.lastName?.message}</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between mt-4">
                <div className="w-full lg:w-1/2 mr-3">
                  <label htmlFor="phone" className="mb-1">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="000-000-0000"
                  />
                  <p className="text-red-500">{errors.phone?.message}</p>
                </div>
                <div className="w-full lg:w-1/2">
                  <label htmlFor="userName" className="mb-1">
                    User Name
                  </label>
                  <input
                    {...register("userName")}
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="userName"
                  />

                  <p className="text-red-500">{errors.userName?.message}</p>
                </div>
              </div>

              <div className="w-full mt-4 flex">
                  <input
                    id="isActive"
                    {...register("isActive")}
                    className="mt-5 mr-1 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="checkbox"
                    defaultValue
                  />
                  <label className="mt-5" htmlFor="isActive">
                    isActive
                  </label>
              </div>

              <button
                type="submit"
                className="mt-4 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <span className="ml-3">Update</span>
              </button>
              
            </form>
           
          </div>
          <p className="text-red-500">{error_msg ? error_msg : null}</p>
        </div>
      </div>
    </div>
  );
};
export default UserForm;



import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useParams ,useNavigate,Navigate} from "react-router-dom";
import { useBoundStore } from "../../store";


// const userList = [
//   {
//     _id: "1",
//     firstName: "user 1 fName",
//     lastName: "user 1 lName",
//     email: "user 1 email",
//     phone: "user 1 phone",
//     userName: "user 1 userName",
//     role: "user 1 role",
//     lastLoggedIn: "user 1 lastLoggedIn",
//     isActive: true,
//     updatedBy: "user 1 updatedBy",
//     updatedAt: "user1 updatedAt",
//   },
//   {
//     _id: "2",
//     firstName: "user 2 fName",
//     lastName: "user 2 lName",
//     email: "user 2 email",
//     phone: "user 2 phone",
//     userName: "user 2 userName",
//     role: "user 2 role",
//     lastLoggedIn: "user 2 lastLoggedIn",
//     isActive: true,
//     updatedBy: "user 2 updatedBy",
//     updatedAt: "user2 updatedAt",
//   },
// ];

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(50).required(),
  lastName: yup.string().min(3).max(50).required(),
  // email: yup.string().min(3).max(50).required(),
  phone: yup.string().min(8).max(10).required(),
  userName: yup.string().min(6).max(20).required(),
  isActive:yup.boolean()
  
});
const UserForm = () => {
  const user = useBoundStore((store) => store.user);
    const navigate = useNavigate();
    const {id}=useParams()
    const userList=useBoundStore(store=>store.usersData)
    const updateUser=useBoundStore(store=>store.updateUser)
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
    console.log(id);
    const user=userList.find((u)=>u._id===id)
    
    setValue("_id",user._id)
    setValue("firstName",user.firstName)
    setValue("lastName",user.lastName)
    // setValue("email",user.email)
    setValue("phone",user.phone)
    setValue("userName",user.userName)
    setValue("isActive",user.isActive)
    

  },[id,setValue])
  

  const onSubmitHandler = (data) => {
    console.log( data );
    updateUser({data})
    return navigate("/admin/users");
  };
  if(user.role!=="Admin"){
    sessionStorage.removeItem("token")
return <Navigate to="/login" replace={true} />
  }
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 p-10">
      <IoArrowBack className="self-start w-8 h-8 cursor-pointer" onClick={()=>navigate(-1)}/>
        <div className="flex-1 text-center hidden lg:flex ml-20 mt-40">
          <img
            src="/assests/images/userForm.png"
            alt="homeimage"
            style={{ height: "500px",width: "400px" }}
          />
        </div>

        <div className="lg:w-1/2  p-6">
          <div className="mt-12 flex flex-col items-center  ">
          

            <h1 className="text-xl xl:text-3xl font-bold text-orange-500">ADD USER</h1>
           
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <div className="mt-5">
                    <label htmlFor="firstName">First Name</label>
                    <input
                    id="firstName"
                      {...register("firstName")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="First Name"
                    />
                    <p>{errors.firstName?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label className="mt-5" htmlFor="Last Name">Last Name</label>
                    <input
                    id="Last Name"
                      {...register("lastName")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Last Name"
                    />
                    <p>{errors.lastName?.message}</p>
                  </div>
                  {/* <div className="mt-5">
                    <label className="mt-5" htmlFor="Email">Email</label>
                    <input
                    id="Email"
                      {...register("email")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                    />
                    <p>{errors.email?.message}</p>
                  </div> */}
                  <div className="mt-5">
                    <label className="mt-5" htmlFor="Phone Number">Phone Number</label>
                    <input
                    id="Phone Number"
                      {...register("phone")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Phone Number"
                    />
                    <p>{errors.phone?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label className="mt-5" htmlFor="UserName">UserName</label>
                    <input
                    id="UserName"
                      {...register("userName")}
                      className="w-80 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="User Name"
                    />
                    <p>{errors.userName?.message}</p>
                  </div>
                  <div className="flex">
                  <input
                    id="isActive"
                      {...register("isActive")}
                      className="mt-5 mr-1 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="checkbox"
                      defaultValue
                    
                    />
                    <label className="mt-5" htmlFor="isActive">isActive</label>
                   
                    
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
export default UserForm;













 

  

         
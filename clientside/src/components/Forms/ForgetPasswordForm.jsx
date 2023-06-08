import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store.js";




// const ForgotPasswordForm = () => {
//   const navigate = useNavigate();
//   const forgetPassword=useBoundStore(store=>store.forgetPassword)
//   const error_msg=useBoundStore(store=>store.error_msg)
//   const forgetPasswordResponse=useBoundStore(store=>store.forgetPasswordResponse)
//   const forgetPasswordReset=useBoundStore(store=>store.forgetPasswordReset)
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     // setValue,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   useEffect(()=>{
//     if(forgetPasswordResponse.status===200){
//       alert(forgetPasswordResponse.msg)
//       // sessionStorage.removeItem("token")
//       forgetPasswordReset()
//       navigate("/resetpassword")
//     }
//     },[forgetPasswordResponse,navigate,forgetPasswordReset])

//   const onSubmitHandler = (data) => {
//     console.log({ data });
//     forgetPassword({data})
//   };
//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
//       <div className="max-w-screen-sm  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 flex-col p-10">
//         <div className="flex">
//           <div>
//             <IoArrowBack
//               className="text-gray-800 h-8 w-8"
//               style={{ cursor: "pointer" }}
//               onClick={() => navigate(-1)}
//             />
//           </div>
       
//         </div>

//         <div className=" bg-white px-6 sm:py-6 lg:px-8">
//           <div className="mx-auto max-w-2xl text-center">
//             <h2 className="text-3xl font-bold  text-orange-500 sm:text-4xl">
//               Forgot Password
//             </h2>
//           </div>
//           <form
//             onSubmit={handleSubmit(onSubmitHandler)}
//             className="mx-auto mt-16 max-w-xl "
//           >
//             <div className="flex flex-col ">
//             <div>
//                 <label htmlFor="email">Email</label>

//                 <div className="mt-1.5">
//                   <input
//                     {...register("email")}
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     placeholder="abc@gmail.com"
//                   />
//                   <p className="text-red-500">{errors.email?.message}</p>
//                 </div>
//               </div>
          
             
//             </div>
//             <div className="mt-10">
//               <button
//                 type="submit"
               
//                 className=" font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out  items-center justify-center focus:shadow-outline focus:outline-none"
//               >
//                 RECOVER PASSWORD
//               </button>
//             </div>
//           </form>
//           <p className="text-red-500">{error_msg?error_msg:null}</p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ForgotPasswordForm;

const schema = yup.object().shape({
  email: yup.string().email().required(),

});

const ForgotPasswordForm = ({ isModalOpen, handleModalClose }) => {
  const navigate = useNavigate();
    const forgetPassword=useBoundStore(store=>store.forgetPassword)
    const error_msg=useBoundStore(store=>store.error_msg)
    const forgetPasswordResponse=useBoundStore(store=>store.forgetPasswordResponse)
    const forgetPasswordReset=useBoundStore(store=>store.forgetPasswordReset)
    
    const {
      register,
      handleSubmit,
      formState: { errors },
      // setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });
  
    useEffect(()=>{
      if(forgetPasswordResponse.status===200){
        alert(forgetPasswordResponse.msg)
        // sessionStorage.removeItem("token")
        forgetPasswordReset()
        navigate("/resetpassword")
      }
      },[forgetPasswordResponse,navigate,forgetPasswordReset])
  
    const onSubmitHandler = (data) => {
      console.log({ data });
      forgetPassword({data})
    };

  if (!isModalOpen) return null;

  return (
    <div
      id="modal-body"
      onClick={(e) => e.target.id === "modal-body" && handleModalClose()}
      className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
    >
      <div className="w-96 bg-white rounded-md px-6 py-6">
        <div className="flex justify-end">
          <span
            onClick={() => handleModalClose()}
            className="text-red-500 text-2xl cursor-pointer"
          >
            &times;
          </span>
        </div>

        <div className="my-8">
          <h2 className="text-3xl font-bold text-center text-orange-500">
            Forgot Password
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col space-y-4">
          <div>
                 <label htmlFor="email">Email</label>

                 <div className="mt-1.5">
                 <input
                    {...register("email")}
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="abc@gmail.com"
                  />
                  <p className="text-red-500">{errors.email?.message}</p>
                </div>
              </div>
         

            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-4 font-semibold mt-3 bg-blue-500 text-gray-100 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none"
              >
                Forgot 
              </button>
            </div>
          </div>
        </form>

        <p className="text-red-500">{error_msg ? error_msg : null}</p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;


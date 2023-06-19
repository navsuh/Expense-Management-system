import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { RiArrowDownSLine } from "react-icons/ri";
import { useParams ,useNavigate,Navigate} from "react-router-dom";
import { useBoundStore } from "../../store";

const schema = yup.object().shape({
  name: yup.string().min(3).max(50).required(),
  addressLine1: yup.string().min(3).max(50).required(),
  addressLine2: yup.string().min(3).max(50).required(),
  area: yup.string().min(3).max(50).required(),
  city: yup.string().min(3).max(50).required(),
  state: yup.string().min(3).max(50).required(),
  zipcode: yup.number().min(4).required(),
});
const HouseHoldForm = ({ isModalOpen, handleModalClose }) => {
  const user = useBoundStore((store) => store.user);
  const navigate = useNavigate();
  const {id}=useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });
 const houseHoldList =useBoundStore(store=>store.households)

console.log(houseHoldList);
const createHouseholds = useBoundStore(store=>store.createHouseholds)
const updateHouseholds =useBoundStore(store=>store.updateHouseholds)
const error_msg=useBoundStore(store=>store.error_msg)



  useEffect(()=>{
    if(!id) return;
    // console.log(id);
    const houseHold=houseHoldList.find((h)=>h._id===id)
    console.log(houseHold);
    setValue("_id",houseHold._id)
    setValue("name",houseHold.name)
    setValue("addressLine1",houseHold.addressLine1)
    setValue("addressLine2",houseHold.addressLine2)
    setValue("area",houseHold.area)
    setValue("city",houseHold.city)
    setValue("state",houseHold.state)
    setValue("zipcode",houseHold.zipcode)
    

  },[id,setValue,houseHoldList])

  const onSubmitHandler = (data) => {
    reset()
    if(data._id){
      console.log("update");
      updateHouseholds({data})
       navigate("/primaryuser/household")
        handleModalClose()
        reset()
    }
    else {
      reset()
      createHouseholds({data})
      navigate("/primaryuser/household")
      handleModalClose()
    }

  };

  const closeAndReset =()=>{
    navigate("/primaryuser/household")
    reset()
    handleModalClose()
  }
  
  if(user.role==="Admin"){
    sessionStorage.removeItem("token")
return <Navigate to="/login" replace={true} />
  }

  if(!isModalOpen) return null

  return (
    <div id="modal-body" onClick={(e) => e.target.id === "modal-body" && closeAndReset()} className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
    <div className="w-96 bg-white rounded-md px-6 py-4">
      <div className="flex justify-between">
      <h3 className="text-3xl font-bold text-center text-orange-500 ml-4">Add Household</h3>
  
      <span onClick={() => {
        closeAndReset()
        }} className="text-red-500 text-2xl cursor-pointer">&times;</span>
      </div>
  
      <div className="lg:w-full p-4 mt-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full lg:flex-grow">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-1/2 mr-3">
                <label htmlFor="name" className="mb-1">Household Name</label>
                <input
                  {...register("name")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="First Name"
                />
                <p className="text-red-500">{errors.name?.message}</p>
              </div>
              <div className="w-full lg:w-1/2">
                <label htmlFor="addressLine1" className="mb-1">Address Line 1</label>
                <input
                  {...register("addressLine1")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Flat No"
                />
                <p className="text-red-500">{errors.addressLine1?.message}</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between mt-4">
              <div className="w-full lg:w-1/2 mr-3">
                <label htmlFor="addressLine2" className="mb-1">Address Line 2</label>
                <input
                  {...register("addressLine2")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Society"
                />
                <p className="text-red-500">{errors.addressLine2?.message}</p>
              </div>
              <div className="w-full lg:w-1/2">
                <label htmlFor="area" className="mb-1">Area</label>
                <input
                  {...register("area")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="area"
                />
               
                <p className="text-red-500">{errors.area?.message}</p>
              </div>
            </div>
  
            <div className="flex flex-col lg:flex-row justify-between mt-4">
              <div className="w-full lg:w-1/2 mr-3">
                <label htmlFor="city" className="mb-1">City</label>
                <input
                  {...register("city")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="City"
                />
                <p className="text-red-500">{errors.city?.message}</p>
              </div>
              <div className="w-full lg:w-1/2">
                <label htmlFor="State" className="mb-1">State</label>
                <input
                  {...register("state")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="State"
                />
                <p className="text-red-500">{errors.state?.message}</p>
              </div>
            </div>
  
            <div className="w-full mt-4">
            <label htmlFor="zipcode" className="mb-1">Zipcode</label>
                <input
                  {...register("zipcode")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="number"
                  placeholder="Zipcode"
                />
                <p className="text-red-500">{errors.zipcode?.message}</p>
            </div>
  
            <button
              type="submit"
              className="mt-4 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
export default HouseHoldForm;

import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useParams ,useNavigate} from "react-router-dom";

const houseHoldList = [
  {
    _id: "1",
    name: "HouseHold Name 1",
    addressLine1: "HouseHold addressLine1 1",
    addressLine2: "HouseHold addressLine2 1",
    area: "HouseHold area 1",
    city: "HouseHold city 1",
    state: "HouseHold state 1",
    zipcode: "HouseHold zipcode 1",
  },
  {
    _id: "2",
    name: "HouseHold Name 2",
    addressLine1: "HouseHold addressLine1 2",
    addressLine2: "HouseHold addressLine2 2",
    area: "HouseHold area 2",
    city: "HouseHold city 2",
    state: "HouseHold state 2",
    zipcode: "HouseHold zipcode 2",
  },
];

const schema = yup.object().shape({
  name: yup.string().min(3).max(50).required(),
  addressLine1: yup.string().min(3).max(50).required(),
  addressLine2: yup.string().min(3).max(50).required(),
  area: yup.string().min(3).max(50).required(),
  city: yup.string().min(3).max(50).required(),
  state: yup.string().min(3).max(50).required(),
  zipcode: yup.number().min(6).max(6).required(),
});
const HouseHoldForm = () => {
  const navigate = useNavigate();
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
    console.log(id);
    const houseHold=houseHoldList.find((h)=>h._id===id)
    
    setValue("_id",houseHold._id)
    setValue("name",houseHold.name)
    setValue("addressLine1",houseHold.addressLine1)
    setValue("addressLine2",houseHold.addressLine2)
    setValue("area",houseHold.area)
    setValue("city",houseHold.city)
    setValue("state",houseHold.state)
    setValue("zipcode",houseHold.zipcode)
    

  },[id,setValue])

  const onSubmitHandler = (data) => {
    console.log({ data });
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl  sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 p-10">
        <IoArrowBack
          className="self-start w-8 h-8 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="flex-1 text-center hidden lg:flex ml-20 mt-40">
          <img
            src="/assests/images/houseHoldForm.png"
            alt="homeimage"
            style={{ height: "500px", width: "700px" }}
          />
        </div>

        <div className="lg:w-1/2  p-6">
          <div className="mt-12 flex flex-col items-center  ">
            <h1 className="text-xl xl:text-3xl font-bold text-orange-500">
              ADD HOUSEHOLD
            </h1>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <div className="mt-5">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      {...register("name")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Name"
                    />
                    <p>{errors.name?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="addressLine1">AddressLine1</label>
                    <input
                      id="addressLine1"
                      {...register("addressLine1")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="addressLine1"
                    />
                    <p>{errors.addressLine1?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="addressLine2">AddressLine2</label>
                    <input
                      id="addressLine2"
                      {...register("addressLine2")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="addressLine2"
                    />
                    <p>{errors.addressLine2?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="area">Area</label>
                    <input
                      id="area"
                      {...register("area")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="area"
                    />
                    <p>{errors.area?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      {...register("city")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="city"
                    />
                    <p>{errors.city?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="state">State</label>
                    <input
                      id="state"
                      {...register("state")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="state"
                    />
                    <p>{errors.state?.message}</p>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                      id="zipcode"
                      {...register("zipcode")}
                      className="w-80  px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="zipcode"
                    />
                    <p>{errors.zipcode?.message}</p>
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
export default HouseHoldForm;

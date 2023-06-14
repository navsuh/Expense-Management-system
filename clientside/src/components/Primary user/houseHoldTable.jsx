
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import SearchInput from "../searchInput";
import { IoAddCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useBoundStore } from "../../store";
import { useEffect, useState } from "react";
import HouseHoldForm from "../Forms/houseHoldForm";

const HouseholdTable = (props) => {
  // const {expenseList}=props
  const getAllHouseholds =useBoundStore(store=>store.getAllHouseholds)
   const houseHoldList =useBoundStore(store=>store.households)
  const deleteHouseholds=useBoundStore(store=>store.deleteHouseholds)
   const [ searchQuery,setSearchQuery] =useState("")
   const [isModalOpen, setIsModalOpen] = useState(false);

    // console.log(getAllHouseholds);
  //  console.log(houseHoldList);
  useEffect(()=>{
    getAllHouseholds();
  },[getAllHouseholds])
  const deleteHousehold=(id)=>{
    deleteHouseholds(id)
   }

   const handleModalClose = () => {
    setIsModalOpen(false);
    
  };
  
   
  return (
    <>
     <HouseHoldForm isModalOpen={isModalOpen} handleModalClose={handleModalClose}/>

     <div className="flex flex-row justify-between">
          <div>
            <SearchInput onChange={(value) =>setSearchQuery(value)} />
          </div>
          <div>
            <button>
            <IoAddCircle  onClick={ ()=>setIsModalOpen(true)} className="text-blue-800 h-14 w-14" />
            </button>
          </div>
        </div>
      <div className="relative  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500  m-3 rounded-lg">
          <thead className="text-xs text-white uppercase bg-blue-500 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>

              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
          {/* filter((h)=>h.name.toLowerCase().includes(searchQuery.toLowerCase())) */}
            {houseHoldList.filter((h)=>h.name.toLowerCase().includes(searchQuery.toLowerCase())).map((eachHousehold) => (
              <tr className="border-b bg-gray-50 " key={eachHousehold._id}>
                <td className="px-6 py-4">{eachHousehold.name}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-between">
                  <Link to={`/primaryuser/household/${eachHousehold._id}`} onClick={ ()=>setIsModalOpen(true)} >
                    <AiOutlineEdit  className="w-8 h-6" />
                  </Link>
                    <AiOutlineDelete  onClick={()=>deleteHousehold(eachHousehold._id)} className="w-8 h-6 ml-1 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HouseholdTable;

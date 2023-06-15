import { useEffect, useState } from "react";

import { useBoundStore } from "../../store.js";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { HiCheckCircle, HiOutlineXCircle } from "react-icons/hi";

import SearchInput from "../searchInput";
import { Link } from "react-router-dom";
import UserForm from "../Forms/userForm.jsx";
import Pagination from "../Pagination.jsx";

const UserTable = (props) => {
  
  const getAllUsers=useBoundStore(store=>store.getAllUsers)
  const softdeleteUser=useBoundStore(store=>store.softdeleteUser)
  const userList=useBoundStore(store=>store.usersData)
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage,setCurrentPage] =useState(1);
  const [dataPerPage] =useState(5);
  const lastDataIndex = currentPage* dataPerPage;
  const firstDataIndex =lastDataIndex -dataPerPage


const filteredUserList=userList.filter((eachUser)=>eachUser.role!=="Admin")
console.log(filteredUserList);
const users =filteredUserList.slice(firstDataIndex,lastDataIndex)

  console.log(userList);
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
 const onSoftDeleteuser=(id)=>{
  softdeleteUser(id)
 }
 const [isModalOpen, setIsModalOpen] = useState(false);


   const handleModalClose = () => {
    setIsModalOpen(false);
    
  };
  return (
    <>
    <UserForm isModalOpen={isModalOpen} handleModalClose={handleModalClose}/>
     <div className="flex flex-row justify-between">
        <div>
        <SearchInput onChange={(value) => setSearchQuery(value)} />
          
        </div>
        {/* <div>
        <Link to={"/admin/userform"}>
          <IoAddCircle className="text-blue-800 h-14 w-14" />
          </Link>
        </div> */}
      </div>
      <div className="relative  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500  m-3 rounded-lg">
          <thead className="text-xs text-white uppercase bg-blue-500 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                is-Active
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUserList.filter((users) =>
                users.firstName.toLowerCase().includes(searchQuery.toLowerCase())).map((eachUser) => (
              <tr className="border-b bg-gray-50 " key={eachUser._id}>
                <td className={eachUser.isActive?"px-6 py-4":"px-6 py-4 text-red-400"}>{eachUser.firstName}</td>
                <td className={eachUser.isActive?"px-6 py-4":"px-6 py-4 text-red-400"}>{eachUser.isActive? <HiCheckCircle id="Active_Status" className="text-green-600 text-2xl ml-2"/>:<HiOutlineXCircle id="Inactive_Status" className="text-2xl ml-2"/>}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-between">
                  <Link to={`/admin/users/${eachUser._id}`} onClick={()=>setIsModalOpen(true)}>
                    <AiOutlineEdit className="w-8 h-6" />
                    
                    </Link>
                    {eachUser.isActive?<AiOutlineDelete onClick={()=>onSoftDeleteuser(eachUser._id)} className=" w-8 h-6 cursor-pointer ml-2" />:<AiOutlineDelete  className="text-gray-300 w-8 h-6 ml-2" />}
                    {/* <AiOutlineDelete onClick={()=>onSoftDeleteuser(eachUser._id)} className="text-gray-200 w-8 h-6 cursor-pointer ml-2" /> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
           total ={users.length}
           pageSize={dataPerPage}
           setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default UserTable;

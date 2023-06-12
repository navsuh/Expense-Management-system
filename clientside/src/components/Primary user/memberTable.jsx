
import { AiOutlineDelete,AiOutlineEdit } from "react-icons/ai";
import SearchInput from "../searchInput";
import { IoAddCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useBoundStore } from "../../store";
import { useEffect, useState } from "react";
import EditMemberForm from "../Forms/editMembersForm";

// const memberList = [
//   { _id: "1", household: "household 1", user: "user 1" },
//   { _id: "2", household: "household 1", user: "user 2" },
// ];

const MemberTable = () => {
  // const {userList}=props
  const getAllMembers = useBoundStore(store=>store.getAllMembers)
  const memberList = useBoundStore(store=>store.memberData)
  const handleDeleteMember =useBoundStore(store=>store.deleteMember)
  // console.log("1");
  // console.log(memberList);
  // console.log("2");
  useEffect(()=>{
    getAllMembers();
  },[getAllMembers])

  const onDeleteMember=(id)=>{
    handleDeleteMember(id)
   }
   const [isModalOpen, setIsModalOpen] = useState(false);
 const handleModalClose = () => {
   setIsModalOpen(false);
 };

//  const handleEdit =()=>{
//   setIsModalOpen(true)
//  }
  return (
    <>
     <EditMemberForm isModalOpen={isModalOpen} handleModalClose={handleModalClose}/>

     <div className="flex flex-row justify-between">
          <div>
            <SearchInput />
          </div>
          <div>
            <Link to={"/primaryuser/memberform"}>
            <IoAddCircle className="text-blue-800 h-14 w-14" />
            </Link>
          </div>
        </div>
      <div className="relative  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500  m-3 rounded-lg">
          <thead className="text-xs text-white uppercase bg-blue-500 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                HouseHold
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {memberList.map((eachMember) => (
              <tr className="border-b bg-gray-50 " key={eachMember._id}>
                <td className="px-6 py-4">{eachMember.household}</td>
                <td className="px-6 py-4">{eachMember.firstName}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-between">
                  <Link to={`/primaryuser/members/${eachMember._id}`}>
                    <AiOutlineEdit onClick={() => setIsModalOpen(true)}  className="w-8 h-6" />
                    </Link >
                    <AiOutlineDelete onClick={()=>onDeleteMember(eachMember._id)} className="w-8 h-6 ml-1 cursor-pointer" />
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

export default MemberTable;

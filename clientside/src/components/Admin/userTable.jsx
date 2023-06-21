import { useEffect, useState } from "react";

import { useBoundStore } from "../../store.js";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { HiCheckCircle, HiOutlineXCircle } from "react-icons/hi";

import SearchInput from "../searchInput";
import { Link } from "react-router-dom";
import UserForm from "../Forms/userForm.jsx";
import Pagination from "../Pagination.jsx";

const UserTable = (props) => {
  const getAllUsers = useBoundStore((store) => store.getAllUsers);
  const softdeleteUser = useBoundStore((store) => store.softdeleteUser);
  const userList = useBoundStore((store) => store.usersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 4;

  const filteredUserList = userList.filter(
    (eachUser) => eachUser.role !== "Admin"
  );

  useEffect(() => {
    getAllUsers();
  }, []);
  const onSoftDeleteuser = (id) => {
    softdeleteUser(id);
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const onPaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filterUsers = filteredUserList.filter((users) =>
    users.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentUsers = filterUsers.slice(firstIndex, lastIndex);
  if (currentUsers.length === 0 && currentPage !== 1) {
    setCurrentPage((prevState) => prevState - 1);
  }

  const displayUserTable = () => {
    return (
      <>
        <table className="w-[66rem] text-sm text-left text-gray-500  m-3 rounded-lg">
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
            {currentUsers.map((eachUser) => (
              <tr className="border-b bg-gray-50 " key={eachUser._id}>
                <td
                  className={
                    eachUser.isActive ? "px-6 py-4" : "px-6 py-4 text-gray-300"
                  }
                >
                  {eachUser.firstName+" "+eachUser.lastName}
                </td>
                <td
                  className={
                    eachUser.isActive ? "px-6 py-4" : "px-6 py-4 text-red-400"
                  }
                >
                  {eachUser.isActive ? (
                    <HiCheckCircle
                      id="Active_Status"
                      className="text-green-600 text-2xl ml-2"
                    />
                  ) : (
                    <HiOutlineXCircle
                      id="Inactive_Status"
                      className="text-2xl ml-2"
                    />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-between">
                    <Link
                      to={`/admin/users/${eachUser._id}`}
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      <AiOutlineEdit className="w-8 h-6 hover:text-blue-500" />
                    </Link>
                    {eachUser.isActive ? (
                      <AiOutlineDelete
                        onClick={() => onSoftDeleteuser(eachUser._id)}
                        className=" w-8 h-6 cursor-pointer ml-2 hover:text-red-500"
                      />
                    ) : (
                      <AiOutlineDelete className="text-gray-300 w-8 h-6 ml-2" />
                    )}
                    {/* <AiOutlineDelete onClick={()=>onSoftDeleteuser(eachUser._id)} className="text-gray-200 w-8 h-6 cursor-pointer ml-2" /> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          total={filteredUserList.length}
          pageSize={dataPerPage}
          currentPage={currentPage}
          onPageChange={onPaginate}
        />
      </>
    );
  };

  return (
    <>
      <UserForm isEditModalOpen={isEditModalOpen} handleModalClose={handleModalClose} />
      <div className="flex flex-row justify-between">
        <div>
          <SearchInput onChange={(value) => setSearchQuery(value)} />
        </div>
      </div>
      <div className="relative  shadow-md sm:rounded-lg">
        {filterUsers.length === 0 ? (
          <div className="p-4">No data found.</div>
        ) : (
          displayUserTable()
        )}
      </div>
    </>
  );
};

export default UserTable;

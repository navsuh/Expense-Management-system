import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import SearchInput from "../searchInput";
import { IoAddCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import { useEffect, useState } from "react";
import EditMemberForm from "../Forms/editMembersForm";
import CreateMemberForm from "../Forms/createMembersForm";
import Pagination from "../Pagination";
import ConfirmDelete from "../Forms/deleteConfirm";

const MemberTable = () => {
  // const {userList}=props
  const getAllMembers = useBoundStore((store) => store.getAllMembers);
  const memberList = useBoundStore((store) => store.memberData);
  const handleDeleteMember = useBoundStore((store) => store.deleteMember);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllMembers();
  }, [getAllMembers]);

  const onDeleteMember = (id) => {
    handleDeleteMember(id);
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isCreateMemberModalOpen, setCreateMemberModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 3;
  const navigate = useNavigate();
  const filteredMembers = memberList.filter(
    (m) =>
      m.household.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lastIndex = dataPerPage * currentPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentMembers = filteredMembers.slice(firstIndex, lastIndex);

  if (currentMembers.length === 0 && currentPage !== 1) {
    setCurrentPage((prevState) => prevState - 1);
  }

  const onPaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setCreateMemberModalOpen(false);
    setIsDeleteModalOpen(false);
    navigate("/primaryuser/members");
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };
  const handleAdd = () => {
    setCreateMemberModalOpen(true);
  };
  const membersTable = () => {
    return (
      <>
        <table className="w-[66rem] text-sm text-left text-gray-500  m-3 rounded-lg">
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
            {currentMembers.map((eachMember) => (
              <tr className="border-b bg-gray-50 " key={eachMember._id}>
                <td className="px-6 py-4">{eachMember.household}</td>
                <td className="px-6 py-4">{eachMember.firstName}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-between">
                    <Link to={`/primaryuser/members/${eachMember._id}`}>
                      <AiOutlineEdit
                        onClick={() => handleEdit()}
                        className="w-8 h-8 p-1 hover:text-white hover:bg-blue-500 bg-gray-200 rounded-3xl text-blue-500"
                      />
                    </Link>

                    <AiOutlineDelete
                      className="w-8 h-8 p-1 ml-2 cursor-pointer text-red-500 bg-gray-200 hover:text-white rounded-3xl hover:bg-red-500 "
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setDeleteId(eachMember._id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          total={memberList.length}
          pageSize={dataPerPage}
          currentPage={currentPage}
          onPageChange={onPaginate}
        />
      </>
    );
  };

  return (
    <>
      <EditMemberForm
        isEditModalOpen={isEditModalOpen}
        handleModalClose={handleModalClose}
      />
      <CreateMemberForm
        isCreateMemberModalOpen={isCreateMemberModalOpen}
        handleModalClose={handleModalClose}
      />
      <ConfirmDelete
        isDeleteModalOpen={isDeleteModalOpen}
        handleModalClose={handleModalClose}
        deleteRecord={onDeleteMember}
        deleteId={deleteId}
      />

      <div className="flex flex-row justify-between">
        <div>
          <SearchInput onChange={(value) => setSearchQuery(value)} />
        </div>
        <div>
          <Link to={"/primaryuser/members"}>
            <IoAddCircle
              onClick={() => handleAdd()}
              className="text-blue-800 h-14 w-14 hover:text-blue-600"
            />
          </Link>
        </div>
      </div>
      <div className="relative  shadow-md sm:rounded-lg">
        {filteredMembers.length === 0 ? (
          <div className="p-4">No Data Found.</div>
        ) : (
          membersTable()
        )}
      </div>
    </>
  );
};

export default MemberTable;

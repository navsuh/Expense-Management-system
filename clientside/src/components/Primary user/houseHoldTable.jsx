import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import SearchInput from "../searchInput";
import { IoAddCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import { useEffect, useState } from "react";
import HouseHoldForm from "../Forms/houseHoldForm";
import Pagination from "../Pagination";
import ConfirmDelete from "../Forms/deleteConfirm";

const HouseholdTable = (props) => {
  // const {expenseList}=props
  const getAllHouseholds = useBoundStore((store) => store.getAllHouseholds);
  const houseHoldList = useBoundStore((store) => store.households);
  const deleteHouseholds = useBoundStore((store) => store.deleteHouseholds);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  // const [state,setState]
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 4;

  const filteredHouseholdList = houseHoldList.filter((h) =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lastIndex = dataPerPage * currentPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentHousholds = filteredHouseholdList.slice(firstIndex, lastIndex);

  if (currentHousholds.length === 0 && currentPage !== 1) {
    setCurrentPage((prevState) => prevState - 1);
  }

  const onPaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();
 
  useEffect(() => {
    getAllHouseholds();
  }, [getAllHouseholds]);
  const deleteHousehold = (id) => {
    deleteHouseholds(id);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    navigate("/primaryuser/household");
  };

  const houseHoldTable = () => {
    return (
      <>
        <table className="w-[66rem] text-sm text-left text-gray-500  m-3 rounded-lg">
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
            
            {currentHousholds.map((eachHousehold) => (
              <tr className="border-b bg-gray-50 " key={eachHousehold._id}>
                <td className="px-6 py-4">{eachHousehold.name}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-between">
                    <Link
                      to={`/primaryuser/household/${eachHousehold._id}`}
                      onClick={() => setIsModalOpen(true)}
                    >
                      <AiOutlineEdit className="w-8 h-6 hover:text-blue-500" />
                    </Link>
                    <AiOutlineDelete
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setDeleteId(eachHousehold._id);
                      }}
                      className="w-8 h-6 ml-1 cursor-pointer hover:text-red-500"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          total={filteredHouseholdList.length}
          pageSize={dataPerPage}
          currentPage={currentPage}
          onPageChange={onPaginate}
        />
      </>
    );
  };

  return (
    <>
      <HouseHoldForm
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
    <ConfirmDelete
        isModalOpen={isDeleteModalOpen}
        handleModalClose={handleModalClose}
        deleteRecord={deleteHousehold}
        deleteId={deleteId}
      />

      <div className="flex flex-row justify-between">
        <div>
          <SearchInput onChange={(value) => setSearchQuery(value)} />
        </div>
        <div>
          <button>
            <IoAddCircle
              onClick={() => setIsModalOpen(true)}
              className="text-blue-800 h-14 w-14 hover:text-blue-600"
            />
          </button>
        </div>
      </div>
      <div className="relative  shadow-md sm:rounded-lg">
        {currentHousholds.length === 0 ? (
          <div>No Page Found.</div>
        ) : (
          houseHoldTable()
        )}
      </div>
    </>
  );
};

export default HouseholdTable;

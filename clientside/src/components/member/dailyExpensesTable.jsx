import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import SearchInput from "../searchInput";
import { Link } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { useBoundStore } from "../../store";
import { useEffect, useState } from "react";
import DailyExpenseForm from "../Forms/dailyexpenseForm";
import Filter from "../filter";
import { sub, formatISO } from "date-fns";
import Pagination from "../Pagination";
import { AiOutlineAreaChart } from "react-icons/ai";


import Chart from "../chart";
import ConfirmDelete from "../Forms/deleteConfirm";


const DailyExpensesTableMember = (props) => {
  // const {userList}=props
  const getAllDailyExpense = useBoundStore((store) => store.getAllDailyExpense);
  const dailyExpensesList = useBoundStore((store) => store.dailyExpense);
  const deleteDailyExpense = useBoundStore((store) => store.deleteDailyExpense);
  const getAllHouseholds = useBoundStore((store) => store.getAllHouseholds);
  const [searchQuery, setSearchQuery] = useState("");
  const houseHoldList = useBoundStore((store) => store.households);

  const householdNames = houseHoldList.map(
    (eachHouseHold) => eachHouseHold.name
  );
  console.log(householdNames);

  const filteredDailyExpenseList = dailyExpensesList.filter((expense) =>
    householdNames.includes(expense.household)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 3;

  useEffect(() => {
    getAllDailyExpense();
    getAllHouseholds();
  }, [getAllDailyExpense, getAllHouseholds]);

  const ondeleteDailyExpense = (id) => {
    deleteDailyExpense(id);
  };
  const [showchart, SetshowChart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [showFilter, SetshowFilter] = useState(false);
  const [filterName, setFilterName] = useState("Today");
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false)
  };
  const onchecked = (value) => {
    // console.log(JSON.parse(value));
    const result = sub(new Date(), JSON.parse(value));
    const formattedresult = formatISO(result, { representation: "date" });
    getAllDailyExpense(formattedresult);
    // console.log(formattedresult);
  };

  const filteredDailyExpenses = filteredDailyExpenseList.filter(
    (m) =>
      m.selectExpense.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.paidBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lastIndex = dataPerPage * currentPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentDailyExpenses = filteredDailyExpenses.slice(
    firstIndex,
    lastIndex
  );

  const onPaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlechartClose=()=>{
    SetshowChart(false)
  }

  const handleFilterClose = () => {
    SetshowFilter(false);
  };
  const getFilterName = (value) => {
    setFilterName(value);
  };

  const dailyExpenseTable = () => {
    return (
      <>
        <table className="w-full text-sm text-left text-gray-500  m-3 rounded-lg">
          <thead className="text-xs text-white uppercase bg-blue-500 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Expense Type
              </th>
              <th scope="col" className="px-6 py-3">
                Paid By
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDailyExpenses.map((eachDailyExpense) => (
              <tr className="border-b bg-gray-50 " key={eachDailyExpense._id}>
                <td className="px-6 py-4">
                  {eachDailyExpense.paymentDetails.date}
                </td>
                <td className="px-6 py-4">{eachDailyExpense.selectExpense}</td>
                <td className="px-6 py-4">{eachDailyExpense.paidBy}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-between">
                    <Link
                      to={`/memberuser/dailyexpenses/${eachDailyExpense._id}`}
                      onClick={() => setIsModalOpen(true)}
                    >
                      <AiOutlineEdit className="w-8 h-6" />
                    </Link>
                    <AiOutlineDelete
                      className="w-8 h-6 cursor-pointer ml-1"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setDeleteId(eachDailyExpense._id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          total={filteredDailyExpenseList.length}
          pageSize={dataPerPage}
          currentPage={currentPage}
          onPageChange={onPaginate}
        />
      </>
    );
  };

  return (
    <>
      <DailyExpenseForm
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
       <ConfirmDelete
        isModalOpen={isDeleteModalOpen}
        handleModalClose={handleModalClose}
        deleteRecord={ondeleteDailyExpense}
        deleteId={deleteId}
      />
      <div className="flex flex-row justify-between">
        <div>
          <SearchInput onChange={(value) => setSearchQuery(value)} />
        </div>
        <div className="text-blue-900">
          <div className="flex cursor-pointer" onClick={()=>SetshowChart(true)}>
          <AiOutlineAreaChart className="h-8 w-8 mt-4" />
        <p className="mt-5 font-medium text-gray-800">charts</p>
          </div>
        

        <Chart data={filteredDailyExpenseList} showchart={showchart} handlechartClose={handlechartClose}/>
        </div>
        <div className="flex flex-row justify-between cursor-pointer">
          <div className="flex flex-col ">
            <div
              onClick={() => SetshowFilter(true)}
              className="flex flex-row border border-gray-100 rounded-md mr-4 p-2"
            >
              <FaFilter
                // onClick={() => SetshowFilter(!showFilter)}
                className="mt-6  text-blue-800"
              />
              <p className="mt-5 font-medium text-gray-800">{filterName}</p>
            </div>

            <Filter
              handleonchecked={onchecked}
              showFilter={showFilter}
              handleFilterClose={handleFilterClose}
              getFilterName={getFilterName}
            />
          </div>
          <button onClick={() => setIsModalOpen(true)}>
            <IoAddCircle className="text-blue-800 h-14 w-14" />
          </button>
        </div>
      </div>
      <div className="relative  shadow-md sm:rounded-lg">
        {currentDailyExpenses.length === 0 ? (
          <div className="p-4">No Data Found.</div>
        ) : (
          dailyExpenseTable()
        )}
      </div>
    </>
  );
};

export default DailyExpensesTableMember;

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import SearchInput from "../searchInput";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { useBoundStore } from "../../store";
import { useEffect, useState } from "react";
import PeriodicExpenseForm from "../Forms/periodicexpenseForm";
import Filter from "../filter";
import { sub, formatISO } from "date-fns";
import Pagination from "../Pagination";
import { AiOutlineAreaChart } from "react-icons/ai";

import Chart from "../chart";
import ConfirmDelete from "../Forms/deleteConfirm";

const PeriodicExpensesTableMember = (props) => {
  // const {userList}=props
  const getAllPeriodicExpense = useBoundStore(
    (store) => store.getAllPeriodicExpense
  );
  const periodicExpenseList = useBoundStore((store) => store.periodicExpense);
  const deletePeriodicExpenses = useBoundStore(
    (store) => store.deletePeriodicExpense
  );
  const getAllHouseholds = useBoundStore((store) => store.getAllHouseholds);
  const [searchQuery, setSearchQuery] = useState("");
  const houseHoldList = useBoundStore((store) => store.households);

  const householdNames = houseHoldList.map(
    (eachHouseHold) => eachHouseHold.name
  );
  const filteredPeriodicExpenseList = periodicExpenseList.filter((expense) =>
    householdNames.includes(expense.household)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 3;
  useEffect(() => {
    getAllPeriodicExpense();
    getAllHouseholds();
  }, [getAllPeriodicExpense, getAllHouseholds]);
  const [showchart, SetshowChart] = useState(false);
  const [isPeriodicExpenseModalOpen, setIsPeridoicExpenseModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [showFilter, SetshowFilter] = useState(false);
  const [filterName, setFilterName] = useState("Today");
  const filteredPeriodicExpenses = filteredPeriodicExpenseList.filter(
    (m) =>
      m.selectExpense.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.paidBy[m.paidBy.length-1].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lastIndex = dataPerPage * currentPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentPeriodicExpenses = filteredPeriodicExpenses.slice(
    firstIndex,
    lastIndex
  );
  if (currentPeriodicExpenses.length === 0 && currentPage !== 1) {
    setCurrentPage((prevState) => prevState - 1);
  }

  const handlechartClose = () => {
    SetshowChart(false);
  };
  const onPaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleModalClose = () => {
    setIsPeridoicExpenseModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const ondeletePeriodicExpense = (id) => {
    deletePeriodicExpenses(id);
  };
  const onchecked = (value) => {
    const result = sub(new Date(), JSON.parse(value));
    const formattedresult = formatISO(result, { representation: "date" });
    getAllPeriodicExpense(formattedresult);
  };

  const handleFilterClose = () => {
    SetshowFilter(false);
  };
  const getFilterName = (value) => {
    setFilterName(value);
  };

  const periodicExpenseTable = () => {
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
            {currentPeriodicExpenses.map((eachPeriodicExpense) => (
              <tr
                className="border-b bg-gray-50 "
                key={eachPeriodicExpense._id}
              >
                <td className="px-6 py-4">{eachPeriodicExpense.dueDate}</td>
                <td className="px-6 py-4">
                  {eachPeriodicExpense.selectExpense}
                </td>
                <td className="px-6 py-4">{eachPeriodicExpense.paidBy[eachPeriodicExpense.paidBy.length-1]}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-between">
                    <Link
                      to={`/memberuser/periodicexpenses/${eachPeriodicExpense._id}`}
                      onClick={() => setIsPeridoicExpenseModalOpen(true)}
                    >
                        <AiOutlineEdit className="w-8 h-8 p-1 hover:text-white hover:bg-blue-500 bg-gray-200 rounded-3xl text-blue-500" />
                    </Link>

                    <AiOutlineDelete
                      className="w-8 h-8 p-1 ml-2 cursor-pointer text-red-500 bg-gray-200 hover:text-white rounded-3xl hover:bg-red-500 "
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setDeleteId(eachPeriodicExpense._id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          total={filteredPeriodicExpenseList.length}
          pageSize={dataPerPage}
          currentPage={currentPage}
          onPageChange={onPaginate}
        />
      </>
    );
  };

  return (
    <>
      <PeriodicExpenseForm
        isPeriodicExpenseModalOpen={isPeriodicExpenseModalOpen}
        handleModalClose={handleModalClose}
      />
    <ConfirmDelete
        isDeleteModalOpen={isDeleteModalOpen}
        handleModalClose={handleModalClose}
        deleteRecord={ondeletePeriodicExpense}
        deleteId={deleteId}
      />
      <div className="flex flex-row justify-between">
        <div>
          <SearchInput onChange={(value) => setSearchQuery(value)} />
        </div>
        <div className="text-blue-900 cursor-pointer">
          <div className="flex" onClick={() => SetshowChart(true)}>
            <AiOutlineAreaChart className="h-8 w-8 mt-4" />
            <p className="mt-5 font-medium text-gray-800">charts</p>
          </div>

          <Chart
            data={filteredPeriodicExpenseList}
            showchart={showchart}
            handlechartClose={handlechartClose}
          />
        </div>
        <div className="flex flex-row justify-between mr-16 cursor-pointer">
          <div className="flex flex-col ">
            <div
              onClick={() => SetshowFilter(true)}
              className="flex flex-row border border-gray-100 rounded-md mr-4  p-2"
            >
              <FaFilter
                // onClick={() => SetshowFilter(!showFilter)}
                className="mt-6 mr-1 text-blue-800"
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
        </div>
      </div>
      <div className="relative  shadow-md sm:rounded-lg">
        {filteredPeriodicExpenses.length === 0 ? (
          <div className="p-4">No Data Found.</div>
        ) : (
          periodicExpenseTable()
        )}
      </div>
    </>
  );
};

export default PeriodicExpensesTableMember;

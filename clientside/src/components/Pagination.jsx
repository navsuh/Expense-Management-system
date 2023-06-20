import _ from "lodash";
import { NavLink } from "react-router-dom";

const Pagination = ({
  total,
  pageSize,
  currentPage,

  onPageChange,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  if (totalPages === 1) return null;
  // if (currentPage === 1) return null;
  const pagesArr = _.range(1, totalPages + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination flex justify-end py-2">
        {pagesArr.map((pageNumber) => (
          <li key={pageNumber} className={"page-item  p-2"}>
            <NavLink
              className={`page-link border rounded-md p-2 ${
                pageNumber === currentPage
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              } `}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

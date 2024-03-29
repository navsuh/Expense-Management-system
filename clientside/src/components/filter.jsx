import { v4 as uuidv4 } from "uuid";
const filterList = [
  { id: uuidv4(), name: "Yesterday", value: '{"days":1}' },
  { id: uuidv4(), name: "Today", value: '{"days":0}' },
  { id: uuidv4(), name: "Last 7 Days", value: '{"weeks":1}' },
  { id: uuidv4(), name: "Last month", value: '{"months":1}' },
  { id: uuidv4(), name: "Last 6 months", value: '{"months":6}' },
  { id: uuidv4(), name: "Last year", value: '{"years":1}' },
];

function Filter({
  handleonchecked,
  showFilter,
  handleFilterClose,
  getFilterName,
}) {
  if (!showFilter) return null;
  return (
    <>
      <div
        id="filter-modal-body"
        onClick={(e) =>
          e.target.id === "filter-modal-body" && handleFilterClose()
        }
        className="fixed z-10 top-6 right-16 w-screen h-screen flex justify-end items-center "
      >
        <ul className="max-w-sm flex flex-col">
          {filterList.map((eachfilterquery) => (
            <li
              key={eachfilterquery.id}
              className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer "
            >
              <div className="relative flex items-start w-full">
                <div className="flex items-center h-5">
                  <input
                    id={eachfilterquery.id}
                    name="hs-list-group-item-radio"
                    type="radio"
                    value={eachfilterquery.value}
                    className="border-gray-200 rounded-full cursor-pointer "
                    onChange={(e) => {
                      handleonchecked(e.target.value);
                      getFilterName(eachfilterquery.name);
                      handleFilterClose();
                    }}
                  />
                </div>
                <label
                  htmlFor={eachfilterquery.id}
                  className="ml-3 block w-full text-sm text-gray-600 "
                >
                  {eachfilterquery.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Filter;

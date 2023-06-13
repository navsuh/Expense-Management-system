const SearchInput = ({ onChange }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <form className="m-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-200 sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block  p-4 pl-10 text-sm text-black border-gray-600 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search ..."
            onChange={handleInputChange}
            required
          />
        </div>
      </form>
    </>
  );
};

export default SearchInput;

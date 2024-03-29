import React, { useEffect } from "react";

const ConfirmDelete = ({
  isDeleteModalOpen,
  handleModalClose,
  deleteRecord,
  deleteId,
}) => {

  if (!isDeleteModalOpen) return null;

  return (
    <div
      id="modal-body"
      onClick={(e) => e.target.id === "modal-body" && handleModalClose()}
      className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
    >
      <div className="w-[31rem] bg-white rounded-md px-6 py-6">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-center text-orange-500">
            Are You Sure?
          </h2>
          <span
            onClick={() => {
              handleModalClose();
            }}
            className="text-red-500 text-2xl cursor-pointer hover:text-red-600 hover:scale-150"
          >
            &times;
          </span>
        </div>

        <p className="mt-8 flex justify-center">
          Do you really want to delete these record? This process cannot be
          undone.
        </p>

        <div className="mt-5 flex justify-center">
          <button
            className="bg-red-500 mr-4 px-3 py-3 text-white rounded-lg hover:bg-red-600"
            onClick={() => {
              deleteRecord(deleteId);
              handleModalClose();
            }}
          >
            Delete
          </button>
          <button
            className="bg-gray-400  px-3 py-3 text-white rounded-lg hover:bg-gray-500"
            onClick={() => {
              handleModalClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default ConfirmDelete;

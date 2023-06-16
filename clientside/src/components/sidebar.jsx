import { RiDashboardFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";
import { MdChangeCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../store";
import { useState } from "react";
import ChangePassword from "./Forms/ChangePasswordForm";
const Sidebar = (props) => {
  // const {name}=props
  const navigate = useNavigate();
  const user = useBoundStore((store) => store.user);
  const lastLoginUser = useBoundStore((store) => store.lastLoginUser);
  const name = user.firstName;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ChangePassword
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="m-4 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="bg-white-300">
          <img
            className="object-contain h-16 w-full rounded-md"
            src="/assests/images/logoexms.png"
            alt="EXMS LOGO"
          />
        </div>

        <div className="h-full px-3 py-4 overflow-y-auto rounded-md bg-blue-600">
          <div className="flex flex-col items-center">
            <div className="relative w-14 h-14  top-3 overflow-hidden bg-gray-100 rounded-full">
              <img
                className="w-14 h-14 rounded-full"
                src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                alt="Rounded avatar"
              />
            </div>

            <div className="flex flex-col items-center justify-center h-25 w-60 px-3 py-4 flex-wrap rounded-md bg-green-400">
              <h1 className="text-white font-bold text-2xl">{`Hello ${name}`}</h1>
              <p className="text-white font-bold text-xl">Welcome back</p>
            </div>
          </div>

          <ul className="space-y-2 mt-2 font-small">
            <li>
              <p className="flex items-center p-2 text-white rounded-lg  hover:bg-black ">
                <RiDashboardFill className="w-6 h-6 " />
                <span className="ml-3 text-white">Dashboard</span>
              </p>
            </li>

            <li>
              <p className="flex items-center p-2 text-white rounded-lg hover:bg-black">
                <IoNotifications className="w-6 h-6 text-white transition duration-75 dark:text-white-400 group-hover:text-white-900 dark:group-hover:text-white" />
                <span className="ml-3 text-white">Notification</span>
              </p>
            </li>
            <li>
              <p className="flex items-center p-2 text-white rounded-lg hover:bg-black">
                <AiOutlineSetting className="w-6 h-6 text-white transition duration-75 dark:text-white-400 group-hover:text-white-900 dark:group-hover:text-white" />
                <span className="ml-3 text-white">Settings</span>
              </p>
            </li>
            <li>
              < button
               onClick={() => setIsModalOpen(true)}
                className="flex items-center p-2 text-white rounded-lg hover:bg-black"
              >
                <MdChangeCircle className="w-6 h-6 text-white transition duration-75 dark:text-white-400 group-hover:text-white-900 dark:group-hover:text-white" />
                <span className="ml-3 text-white">Change Password</span>
              </button>
            </li>
            <li className="hover:bg-black rounded-lg ">
              <button
                onClick={() => {
                  lastLoginUser(user._id);

                  sessionStorage.removeItem("token");
                  navigate("/login");
                }}
                className="flex items-center p-2 text-white rounded-lg hover:bg-black"
              >
                <IoIosLogOut className="w-6 h-6 text-white transition duration-75 dark:text-white-400 group-hover:text-white-900 dark:group-hover:text-white" />
                <span className="ml-3 text-white">Logout</span>
              </button>
              
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;




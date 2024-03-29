// import { RiDashboardFill } from "react-icons/ri";
// import { IoIosLogOut } from "react-icons/io";
// import { IoNotifications } from "react-icons/io5";
// import { AiOutlineSetting } from "react-icons/ai";
// import { MdChangeCircle } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { useBoundStore } from "../store";
// import { useState } from "react";
// import ChangePassword from "./Forms/ChangePasswordForm";
// const Sidebar = (props) => {
//   // const {name}=props
//   const navigate = useNavigate();
//   const user = useBoundStore((store) => store.user);
//   const lastLoginUser = useBoundStore((store) => store.lastLoginUser);
//   const name = user.firstName;

//   const [isChangePasswordModalOpen, setIsModalOpen] = useState(false);
//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//     <ChangePassword
//         isChangePasswordModalOpen={isChangePasswordModalOpen}
//         handleModalClose={handleModalClose}
//       />
//       <button
//         data-drawer-target="default-sidebar"
//         data-drawer-toggle="default-sidebar"
//         aria-controls="default-sidebar"
//         type="button"
//         className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//       >
//         <span className="sr-only">Open sidebar</span>
//         <svg
//           className="w-6 h-6"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             clipRule="evenodd"
//             fillRule="evenodd"
//             d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//           ></path>
//         </svg>
//       </button>
//       <aside
//         id="default-sidebar"
//         className="m-4 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
//         aria-label="Sidebar"
//       >
//         <div className="bg-white-300">
//           <img
//             className="object-contain h-16 w-full rounded-md"
//             src="/assests/images/logoexms.png"
//             alt="EXMS LOGO"
//           />
//         </div>

//         <div className="h-full px-3 py-4 overflow-y-auto rounded-md bg-blue-600">
//           <div className="flex flex-col items-center">
//             <div className="relative w-14 h-14  top-3 overflow-hidden bg-gray-100 rounded-full">
//               <img
//                 className="w-14 h-14 rounded-full"
//                 src="https://img.freepik.com/free-icon/user_318-159711.jpg"
//                 alt="Rounded avatar"
//               />
//             </div>

//             <div className="flex flex-col items-center justify-center h-25 w-60 px-3 py-4 flex-wrap rounded-md bg-green-400">
//               <h1 className="text-white font-bold text-2xl">{`Hello ${name}`}</h1>
//               <p className="text-white font-bold text-xl">Welcome back</p>
//             </div>
//           </div>

//           <ul className="space-y-2 mt-2 font-small">
//             <li>
//               <p className="flex items-center p-2 text-white rounded-lg  hover:bg-black ">
//                 <RiDashboardFill className="w-6 h-6 " />
//                 <span className="ml-3 text-white">Dashboard</span>
//               </p>
//             </li>

//             <li>
//               <p className="flex items-center p-2 text-white rounded-lg hover:bg-black">
//                 <IoNotifications className="w-6 h-6 text-white transition duration-75 dark:text-white-400 group-hover:text-white-900 dark:group-hover:text-white" />
//                 <span className="ml-3 text-white">Notification</span>
//               </p>
//             </li>
//             <li>
//               <p className="flex items-center p-2 text-white rounded-lg hover:bg-black">
//                 <AiOutlineSetting className="w-6 h-6 text-white transition duration-75 dark:text-white-400 group-hover:text-white-900 dark:group-hover:text-white" />
//                 <span className="ml-3 text-white">Settings</span>
//               </p>
//             </li>
//             <li className="hover:bg-black rounded-lg "
//                 onClick={() => setIsModalOpen(true)}
            
//             >
//               <button
//                 className="flex items-center p-2 text-white  "
//               >
//                 <MdChangeCircle className="w-6 h-6 text-white transition duration-75 dark:text-white-400 group-hover:text-white-900 dark:group-hover:text-white" />
//                 <span className="ml-3 text-white">Change Password</span>
//               </button>
//             </li>
//             <li className="hover:bg-black rounded-lg "
//              onClick={() => {
//               lastLoginUser(user._id);

//               sessionStorage.removeItem("token");
//               navigate("/login");
//             }}>
//               <button
               
//                 className="flex items-center p-2 text-white rounded-lg hover:bg-black"
//               >
//                 <IoIosLogOut className="w-6 h-6 text-white transition duration-75 dark:text-white-400 group-hover:text-white-900 dark:group-hover:text-white" />
//                 <span className="ml-3 text-white">Logout</span>
//               </button>
//             </li>
//           </ul>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;



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
  const navigate = useNavigate();
  const user = useBoundStore((store) => store.user);
  const lastLoginUser = useBoundStore((store) => store.lastLoginUser);
  const name = user.firstName;

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ChangePassword
        isChangePasswordModalOpen={isChangePasswordModalOpen}
        handleModalClose={handleModalClose}
      />
      <button
        className="fixed top-0 left-0 z-40 p-3 text-gray-500 sm:hidden"
        onClick={handleMenuClick}
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isSidebarOpen ? (
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M6 18a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6zm2-3V5h6v10H8zM4 8a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z"
            ></path>
          ) : (
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M4 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm2-1V3h6v2H6zm-2 1v8h2V6H4zm1 2h8v2H5V8zm0 4h8v2H5v-2z"
            ></path>
          )}
        </svg>
      </button>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:w-64 sm:pl-6 sm:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        {/* Sidebar content */}
        <div className="bg-white-300">
          <img
            className="object-contain h-16 w-full rounded-md hidden  sm:block "
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
            <li className="hover:bg-black rounded-lg "
                onClick={() => setIsModalOpen(true)}
            
            >
              <button
                className="flex items-center p-2 text-white  "
              >
                <MdChangeCircle className="w-6 h-6 text-white transition duration-75 dark:text-white-400 group-hover:text-white-900 dark:group-hover:text-white" />
                <span className="ml-3 text-white">Change Password</span>
              </button>
            </li>
            <li className="hover:bg-black rounded-lg "
             onClick={() => {
              lastLoginUser(user._id);

              sessionStorage.removeItem("token");
              navigate("/login");
            }}>
              <button
               
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

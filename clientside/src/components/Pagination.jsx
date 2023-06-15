import React, { Component } from 'react';
import _ from "lodash"


const Pagination = (props) => {
    const {pageSize,total,setCurrentPage} =props
    const pages =Math.ceil(total/pageSize);
    if(pages===1) return;
    const pagesArr = _.range(1,pages+1)
    return (  
         <>
        <div className="float-right ">
        <ul className="flex m-2">
          <li
            // onClick={}
            className="cursor-pointer hidden md:flex w-8 h-8 mx-1 justify-center bg-gray-300 items-center rounded-full  hover:bg-blue-600 text-black hover:border-gray-300 group"
          >
            <a className="text-white font-bold" href="#">
              <svg
                className="block w-3 h-3 fill-current"
                viewBox="0 0 256 512"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
              </svg>
            </a>
          </li>
          {pagesArr.map((page) => (
            <li
              key={page}
              onClick={() => setCurrentPage(page)}
              className="cursor-pointer hidden md:flex w-8 h-8 mx-1 justify-center items-center rounded-full active:bg-blue-600 hover:bg-blue-600 text-black hover:border-gray-300 group"
            >
              <a className="group-hover:text-white font-bold" href="#">
                {page}
              </a>
            </li>
          ))}
          <li
            // onClick={}
            className="cursor-pointer hidden md:flex w-8 h-8 mx-1 justify-center items-center bg-gray-300 rounded-full  hover:bg-blue-600 text-black hover:border-gray-300 group"
          >
            <a className="text-white font-bold" href="#">
              <svg
                className="block w-3 h-3 fill-current"
                viewBox="0 0 256 512"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
         </>
    )
}
 
export default Pagination
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import 'primereact/resources/themes/saga-blue/theme.css';  // hoặc theme khác
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const FAQ = () => {
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);
  const [show4, setShow4] = useState(true);

  return (
    <>
      <div className="h-[81px] w-full bg-gray-100 flex items-center">
        <div className="lg:w-main w-full px-4 lg:px-0 mx-auto">
          <h3 className="font-semibold uppercase">FAQs</h3>
          <div className="flex items-center text-sm text-gray-700 gap-2 mt-1">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-1">&gt;</span>
            <span className="text-black font-medium">FAQs</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full max-w-xl mx-auto gap-4 mt-8 mb-8">
        {/* Câu hỏi 1 */}
        {show && (
          <div
            className="w-full rounded-lg shadow-md border border-gray-200 cursor-pointer flex justify-between items-center p-4 bg-white hover:bg-red-50 transition"
            onClick={() => setShow(!show)}
          >
            <div className="font-medium text-base hover:text-red-500">
              1. What payment you accept?
            </div>
            <div className="text-2xl">+</div>
          </div>
        )}
        {!show && (
          <>
            <div
              className="w-full rounded-t-lg shadow-md border border-gray-200 cursor-pointer flex justify-between items-center p-4 bg-red-500 text-white"
              onClick={() => setShow(!show)}
            >
              <div className="font-medium text-base">1. What payment you accept?</div>
              <div className="text-2xl">-</div>
            </div>
            <div className="w-full rounded-b-lg shadow-md border border-t-0 border-gray-200 p-4 text-sm text-gray-700 bg-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </>
        )}
        {/* Câu hỏi 2 */}
        {show1 && (
          <div
            className="w-full rounded-lg shadow-md border border-gray-200 cursor-pointer flex justify-between items-center p-4 bg-white hover:bg-red-50 transition"
            onClick={() => setShow1(!show1)}
          >
            <div className="font-medium text-base hover:text-red-500">
              2. In what country can you deliver?
            </div>
            <div className="text-2xl">+</div>
          </div>
        )}
        {!show1 && (
          <>
            <div
              className="w-full rounded-t-lg shadow-md border border-gray-200 cursor-pointer flex justify-between items-center p-4 bg-red-500 text-white"
              onClick={() => setShow1(!show1)}
            >
              <div className="font-medium text-base">2. In what country can you deliver?</div>
              <div className="text-2xl">-</div>
            </div>
            <div className="w-full rounded-b-lg shadow-md border border-t-0 border-gray-200 p-4 text-sm text-gray-700 bg-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </>
        )}
        {/* Câu hỏi 3 */}
        {show2 && (
          <div
            className="w-full rounded-lg shadow-md border border-gray-200 cursor-pointer flex justify-between items-center p-4 bg-white hover:bg-red-50 transition"
            onClick={() => setShow2(!show2)}
          >
            <div className="font-medium text-base hover:text-red-500">
              3. what payments you accept?
            </div>
            <div className="text-2xl">+</div>
          </div>
        )}
        {!show2 && (
          <>
            <div
              className="w-full rounded-t-lg shadow-md border border-gray-200 cursor-pointer flex justify-between items-center p-4 bg-red-500 text-white"
              onClick={() => setShow2(!show2)}
            >
              <div className="font-medium text-base">3. what payments you accept?</div>
              <div className="text-2xl">-</div>
            </div>
            <div className="w-full rounded-b-lg shadow-md border border-t-0 border-gray-200 p-4 text-sm text-gray-700 bg-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </>
        )}
        {/* Câu hỏi 4 */}
        {show3 && (
          <div
            className="w-full rounded-lg shadow-md border border-gray-200 cursor-pointer flex justify-between items-center p-4 bg-white hover:bg-red-50 transition"
            onClick={() => setShow3(!show3)}
          >
            <div className="font-medium text-base hover:text-red-500">
              4. how to track my parcel?
            </div>
            <div className="text-2xl">+</div>
          </div>
        )}
        {!show3 && (
          <>
            <div
              className="w-full rounded-t-lg shadow-md border border-gray-200 cursor-pointer flex justify-between items-center p-4 bg-red-500 text-white"
              onClick={() => setShow3(!show3)}
            >
              <div className="font-medium text-base">4. how to track my parcel?</div>
              <div className="text-2xl">-</div>
            </div>
            <div className="w-full rounded-b-lg shadow-md border border-t-0 border-gray-200 p-4 text-sm text-gray-700 bg-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </>
        )}
        {/* Câu hỏi 5 */}
        {show4 && (
          <div
            className="w-full rounded-lg shadow-md border border-gray-200 cursor-pointer flex justify-between items-center p-4 bg-white hover:bg-red-50 transition"
            onClick={() => setShow4(!show4)}
          >
            <div className="font-medium text-base hover:text-red-500">
              5. how to handle my parcel?
            </div>
            <div className="text-2xl">+</div>
          </div>
        )}
        {!show4 && (
          <>
            <div
              className="w-full rounded-t-lg shadow-md border border-gray-200 cursor-pointer flex justify-between items-center p-4 bg-red-500 text-white"
              onClick={() => setShow4(!show4)}
            >
              <div className="font-medium text-base">5. how to handle my parcel?</div>
              <div className="text-2xl">-</div>
            </div>
            <div className="w-full rounded-b-lg shadow-md border border-t-0 border-gray-200 p-4 text-sm text-gray-700 bg-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default FAQ;

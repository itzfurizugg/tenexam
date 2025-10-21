import React from "react";
import profilePic from "../assets/ningning.png";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white min-h-screen flex flex-col justify-between shadow-md">
      <div>
        {/* LOGO */}
        <div className="p-6 text-2xl font-bold text-[#1e56a0]">Sixamlify</div>

        {/* PROFILE SECTION */}
        <div className="bg-indigo-100 mx-4 rounded-2xl flex items-center gap-3 p-3 shadow-sm">
          <div className="relative">
            <img
              src={profilePic}
              alt="profile"
              className="rounded-full w-14 h-14 object-cover border-4 border-indigo-400"
            />
          </div>
          <div>
            <h2 className="text-indigo-700 font-semibold text-lg leading-tight">
              Lucent.
            </h2>
            <p className="italic text-gray-700 text-sm">student</p>
          </div>
        </div>

        {/* MENU SECTION */}
        <div className="mt-8 px-6">
          <p className="text-xs text-gray-400 mb-2">MENU</p>
          <ul>
            <li className="bg-indigo-100 text-indigo-700 font-semibold rounded-lg py-2 px-3 mb-2 cursor-pointer">
              Dashboard
            </li>
            <li className="py-2 px-3 text-gray-700 hover:text-indigo-600 cursor-pointer">Exams</li>
            <li className="py-2 px-3 text-gray-700 hover:text-indigo-600 cursor-pointer">Grades</li>
          </ul>

          <p className="text-xs text-gray-400 mt-6 mb-2">GENERAL</p>
          <ul>
            <li className="py-2 px-3 text-gray-700 hover:text-indigo-600 cursor-pointer">Profile</li>
            <li className="py-2 px-3 text-gray-700 hover:text-indigo-600 cursor-pointer">Settings</li>
          </ul>
        </div>
      </div>

      {/* LOG OUT */}
      <div className="p-6 text-gray-700 font-medium cursor-pointer hover:text-red-500">
        Log Out
      </div>
    </div>
  );
};

export default Sidebar;

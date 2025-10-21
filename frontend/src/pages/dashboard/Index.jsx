import React from "react";
import Card from "../../components/Card";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-b from-indigo-400 to-blue-200 p-6 sm:p-10 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-white mb-8">Hey, Lucent!</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card />
          <Card />
          <Card />
        </div>

        <div className="bg-white rounded-2xl shadow-md h-96 p-6"></div>
      </div>
    </div>
  );
};

export default Dashboard;

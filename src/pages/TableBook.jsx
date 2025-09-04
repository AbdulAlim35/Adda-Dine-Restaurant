import React, { useEffect, useState } from "react";
import reserveTableDatabase from "../service/reserveTableDatabase";
import { FaCheck } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";

function TableBook() {
  const [table, setTable] = useState([]);
  const [geuest, setGeuest] = useState([]);
  useEffect(() => {
    const fatch = async () => {
      const reserve = await reserveTableDatabase.listPost();
      setTable(reserve.documents);
    };
    fatch();
  }, []);
  useEffect(() => {
    const fatchData = async () => {
      const total = await reserveTableDatabase.totalGeuests();
      setGeuest(total);
    };
    fatchData();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* <!-- Page Header --> */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Reservation Management
        </h1>
        <p className="text-gray-600">
          Manage table reservations and guest bookings
        </p>
      </div>

      {/* <!-- Stats Cards --> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 md:w-[200px] md:h-[130px]">
          <div className="flex items-center">
            <div className="w-12 h-12 text-purple-500 text-2xl bg-purple-100 rounded-lg flex items-center justify-center">
              <FaUserGroup />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Guests</p>
              <p className="text-2xl font-bold text-gray-900">{geuest}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 md:w-[200px] md:h-[130px]">
          <div className="flex items-center">
            <div className="w-12 h-12 text-green-500 text-2xl bg-green-100 rounded-lg flex items-center justify-center">
              <FaCheck />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900">{geuest}</p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Reservations List --> */}
      <div className="space-y-4" id="reservations-container">
        {/* <!-- Reservation Item 1 --> */}
        {table.map((data) => (
          <div key={data.$id} className="reservation-item bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {data.name}
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      {data.date}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      Time:{data.time}
                    </div>
                    <div className="flex items-center space-x-2">
                      Guests:{data.guests}
                    </div>
                    <div className="flex items-center space-x-2">
                      Phone:{data.phone}
                    </div>
                    <div className="flex items-center space-x-2">
                      Email:{data.email}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-3">{data.request}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default TableBook;

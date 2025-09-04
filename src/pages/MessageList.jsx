import React, { useEffect, useState } from "react";
import contectDatabase from "../service/contectDatabase";
import { MdOutlineMessage } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoMdTrendingUp } from "react-icons/io";

function MessageList() {
    const [message, setMessage] = useState([])
    const [totalMessage, setTotalMessage] = useState([])
    useEffect(() => {
     const fatch = async () =>{
        const sent = await contectDatabase.listPost()
        setMessage(sent.documents)
     }
     fatch();
    }, [])
    useEffect(() => {
     const fatchData = async () =>{
        const total = await contectDatabase.totalMassege()
        setTotalMessage(total)
     }
     fatchData();
    }, [])
    
  return (
    <>
      {/* <!-- Main Content --> */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <!-- Page Header --> */}
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Contact Messages
          </h1>
          <p class="text-gray-600">Manage customer inquiries and messages</p>
        </div>

        {/* <!-- Stats Cards --> */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 text-blue-600 text-2xl rounded-lg flex items-center justify-center">
               <MdOutlineMessage />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Messages</p>
                <p class="text-2xl font-bold text-gray-900">{totalMessage}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-yellow-100 text-2xl text-yellow-600 rounded-lg flex items-center justify-center">
               <FaRegClock />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Pending</p>
                <p class="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-100 text-2xl text-green-600 rounded-lg flex items-center justify-center">
                <FaCheck />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Resolved</p>
                <p class="text-2xl font-bold text-gray-900">235</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-purple-100 text-2xl text-purple-600 rounded-lg flex items-center justify-center">
               <IoMdTrendingUp />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">This Week</p>
                <p class="text-2xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Filters and Search --> */}
        {/* <div class="bg-white rounded-xl shadow-md p-6 mb-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div class="flex flex-wrap gap-2">
                    <button class="filter-status-btn active px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-amber-600 text-white" data-status="all">
                        All Messages
                    </button>
                    <button class="filter-status-btn px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-600" data-status="pending">
                        Pending
                    </button>
                    <button class="filter-status-btn px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-600" data-status="resolved">
                        Resolved
                    </button>
                </div>

                <div class="flex space-x-4">
                    <div class="relative">
                        <input type="text" id="search-input" placeholder="Search messages..." 
                               class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                        <svg class="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <select id="subject-filter" class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                        <option value="">All Subjects</option>
                        <option value="reservation">Reservations</option>
                        <option value="event">Private Events</option>
                        <option value="catering">Catering</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
        </div> */}

        {/* <!-- Messages List --> */}
        <div class="space-y-4" id="messages-container">
          {/* <!-- Message Item 1 --> */}
          <div
            class="message-item bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            data-status="pending"
            data-subject="reservation"
          >
            <div class="p-6">
                {message.map((data)=>(
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">
                      {data.name}
                    </h3>
                    <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                      {data.subject}
                    </span>
                  </div>
                  <p class="text-gray-600 mb-2">
                    {data.email}
                  </p>
                  <p class="text-gray-800 mb-4">
                    {data.message}
                  </p>
                 </div>
                 <div class="flex space-x-2 ml-4">
                  <button class="reply-btn bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                    Reply
                  </button>
                  <button class="mark-resolved-btn bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Mark Resolved
                  </button>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* <!-- Reply Modal -->
    <div id="reply-modal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 ">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h3 class="text-xl font-bold text-gray-900">Reply to Message</h3>
                    <button id="close-reply-modal" class="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <form id="reply-form">
                    <div class="mb-4">
                        <label for="reply-to" class="block text-sm font-medium text-gray-700 mb-2">To:</label>
                        <input type="email" id="reply-to" readonly 
                               class="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"/>
                    </div>
                    
                    <div class="mb-4">
                        <label for="reply-subject" class="block text-sm font-medium text-gray-700 mb-2">Subject:</label>
                        <input type="text" id="reply-subject" 
                               class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                    </div>
                    
                    <div class="mb-6">
                        <label for="reply-message" class="block text-sm font-medium text-gray-700 mb-2">Message:</label>
                        <textarea id="reply-message" rows="6" 
                                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                                  placeholder="Type your reply here..."></textarea>
                    </div>
                    
                    <div class="flex space-x-4">
                        <button type="submit" class="flex-1 bg-amber-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-amber-700 transition-colors">
                            Send Reply
                        </button>
                        <button type="button" id="cancel-reply" class="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div> */}
    </>
  );
}

export default MessageList;

import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import philosophy from '../service/philosophyDatabase';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

function AllPhilosophy() {
 const [ blogs, setBlogs] = useState([]);
  const navigate =useNavigate();

 useEffect(() => {
   const fatch = async () => {
    const sent = await philosophy.listPost()
    setBlogs(sent.documents)
   }
   fatch();
 }, [])
  const onDelete = async (data) => {
    await philosophy.dealetePost(data);
    toast.success("Successfully Delete");

    let list = await philosophy.listPost();
    setBlogs(list.documents);
  };
 const onEdit = (e) => {
    let postId = e.$id;
    navigate("/admin/edit-Philosophy/" + postId);
  };
  return (
    <>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            All Phyilosophy
          </h1>
        </div>
      </div>
       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Icone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map((data) => (
                <tr key={data.$id} className="hover:bg-gray-50">
                  <td className="px-6 py-4  ">
                    <div className="text-sm text-gray-900 line-clamp-1">
                      {data.title}
                    </div>
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {data.icone}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-100 transition-colors duration-200 cursor-pointer"
                        title="Edit"
                        onClick={() => {
                          onEdit(data);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100 transition-colors duration-200 cursor-pointer"
                        title="Delete"
                        onClick={() => onDelete(data.$id)}
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        <Toaster position="top-right" />
    </>
  )
}

export default AllPhilosophy
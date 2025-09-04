import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import chefDatabase from "../service/chefDatabase"
import storageService from '../service/storageService';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
function AllChifList() {
const navigate = useNavigate();
const { register, watch } = useForm();
const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    const fetchBlogs = async () => {
      let list = await chefDatabase.listPost ();
      setBlogs(list.documents);
    };
    fetchBlogs();
  }, []);
    const onDelete = async (data) => {
    await chefDatabase.dealetePost(data);
    toast.success("Successfully Delete");

    let list = await chefDatabase.listPost();
    setBlogs(list.documents);
  };
    const onEdit = (e) => {
    let postId = e.$id;
    navigate("/admin/edit-chif/" + postId);
  };
  return (
    
   <>
   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            All Chef List
          </h1>
          {/* <p className="text-gray-600 mt-2">Manage all your blog content</p> */}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              id="search"
              type="text"
              placeholder="Search blogs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("search")}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map((data) => (
                <tr key={data.$id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={storageService.getFilePreview(data.image)}
                        alt="Blog"
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4  ">
                    <div className="text-sm text-gray-900 line-clamp-1">
                      {data.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {data.title}
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

export default AllChifList
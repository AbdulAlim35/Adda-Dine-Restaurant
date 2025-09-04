import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import addressDatabase from '../service/addressDatabase';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";

function AllContectList() {
     const [ contact, setContact] = useState([]);
  const navigate =useNavigate();
   useEffect(() => {
   const fatch = async () => {
    const sent = await addressDatabase.listPost()
    setContact(sent.documents)
   }
   fatch();
 }, [])
const onDelete = async (data) => {
    await addressDatabase.dealetePost(data);
    toast.success("Successfully Delete");

    let list = await addressDatabase.listPost();
    setContact(list.documents);
  };
   const onEdit = (e) => {
    let postId = e.$id;
    navigate("/admin/editcontact/" + postId);
  };
  return (
    <>
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
           <div>
             <h1 className="text-3xl font-bold text-gray-900">
               All Contact
             </h1>
           </div>
         </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
           <div className="overflow-x-auto">
             <table className="w-full">
               <thead className="bg-gray-50">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Name
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
                 {contact.map((data) => (
                   <tr key={data.$id} className="hover:bg-gray-50">
                     <td className="px-6 py-4  ">
                       <div className="text-sm text-gray-900 line-clamp-1">
                         {data.name}
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

export default AllContectList
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import settingDatabase from '../service/settingDatabase';
import toast, { Toaster } from "react-hot-toast";
function AddSetting() {
     const { register, handleSubmit, setValue, } = useForm();
    const [setting, setSetting] = useState(null)

    const onSubmit = async (data) => {
        let upload;
    if (setting) {
      
      upload = await settingDatabase.updatePost(setting.$id, data);
    } else {
      upload = await settingDatabase.creatPost(data); 
    } 
    toast.success("Successfully Add");
    setSetting(upload)
    }
 useEffect(() => {
    const featchData = async () =>{
      const section = await settingDatabase.listQuery()
      
      if (section) {
        setSetting(section)
        setValue("name", section.name)
        setValue("content", section.content)
      }
    }
    featchData()

  }, [])
  return (
     <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Add Setting</h2>

      <form
        method="POST"
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="name"
            className="block font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            placeholder="Enter your name..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <input
            id="content"
            placeholder="Enter your content..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("content", { required: true })}
          ></input>
        </div>
        {/* <!-- Submit Button --> */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
      <Toaster position="top-right" />
    </div>
  )
}

export default AddSetting
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import offerDatabase from '../service/offerDatabase';


function AddOfferTitle() {
    const { register, handleSubmit, setValue } = useForm();
     const [menu, setMenu] = useState(null);

     const onSubmit = async (data) => {
     let upload;
    if (menu) {
      //   // Update if document exists
      upload = await offerDatabase.updatePost(menu.$id, data);
    } else {
      upload = await offerDatabase.creatPost(data);
    }
     setMenu(upload)
    }

     useEffect(() => {
    const featchData = async () => {
      const section = await offerDatabase.listQuery();

      if (section) {
        setMenu(section);
        setValue("title", section.title);
        setValue("hading", section.hading)
      }
    };
    featchData();
  }, [setValue]);
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Add Offer Section</h2>

      <form
        method="POST"
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="title"
            className="block font-medium text-gray-700 mb-1"
          >
             Title
          </label>
          <input
            id="title"
            placeholder="Enter your hero title..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", { required: true })}
          />
        </div>

        <div>
          <label
            htmlFor="hading"
            className="block font-medium text-gray-700 mb-1"
          >
            Hading
          </label>
           <textarea
            id="hading"
            rows="3"
            placeholder="Enter your hading..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("hading", { required: true })}
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 cursor-pointer"
          >
            Save Offer
          </button>
        </div>
        </form>
        </div>

  )
}

export default AddOfferTitle
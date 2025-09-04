import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import heroDatabase from '../service/heroDatabase';
import toast, { Toaster } from "react-hot-toast";
import storageService from '../service/storageService';

function AddHero() {
const { register, handleSubmit, setValue, reset } = useForm();
 const [hero, setHero] = useState(null);

 useEffect(() => {
    const featchData = async () =>{
      const section = await heroDatabase.heroQuery()
      
      if (section) {
        setHero(section)
        setValue("title", section.title)
        setValue("content", section.content)
        setValue("image", section.image)
      }
    }
    featchData()

  }, [])
  const onSubmit = async (data) => {
  const { image, ...other } = data;
  const file = data.image?.[0];
    const uploadFile = await storageService.uplodFile(file);

    const prepardData = { image: uploadFile.$id, ...other };
    let upload;
    try {
      if (hero) {
        upload = await heroDatabase.updatePost(hero.$id, prepardData);
      } else {
        upload = await heroDatabase.creatPost(prepardData);
      }if (upload) {
        toast.success("Successfully Add");
      }
      
      setHero(upload);
    } catch (error) {
      throw error;
    }
  };

    const handleCancle = () => {
    reset({
      title: "",
      content: "",
      image: "",
    });
  };
  return (
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">
        Add Hero
      </h2>

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
            title
          </label>
          <input
            id="name"
            placeholder="Enter your title..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", { required: true })}
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block font-medium text-gray-700 mb-1"
          >
            content
          </label>
          <textarea
            id="content"
            rows="3"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("content", { required: true })}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors duration-200">
            <div className="text-sm text-gray-600">
              <label htmlFor="image" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700 font-medium">
                  Click to upload
                </span>
                or drag and drop
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", { required: true })}
                //  onChange={(e) => setValue("image", e.target.files[0])}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>

        {/* <!-- Submit Button --> */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          onClick={handleCancle}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 cursor-pointer"
          >
            Save Hero Section
          </button>
        </div>
      </form>
      <Toaster position="top-right" />
    </div>
  )
}

export default AddHero
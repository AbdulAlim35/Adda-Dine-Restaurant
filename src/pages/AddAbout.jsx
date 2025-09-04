import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import storageService from "../service/storageService";
import aboutDatabase from "../service/aboutDatabase";
import databaseService from "../service/databaseService";

function AddAbout() {
  const { register, handleSubmit, setValue, } = useForm();
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const featchData = async () =>{
      const section = await aboutDatabase.listQuery()
      
      if (section) {
        setAbout(section)
        setValue("title", section.title)
        setValue("content", section.content)
        setValue("years", section.years)
        setValue("excellence", section.excellence)
        setValue("daily", section.daily)
        setValue("customer", section.customer)
        setValue("award", section.award)
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
      if (about) {
        upload = await aboutDatabase.updatePost(about.$id, prepardData);
      } else {
        upload = await aboutDatabase.creatPost(prepardData);
      }
      
      setAbout(upload);
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">
        Update About Page
      </h2>

      <form
        method="POST"
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <!-- Intro --> */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            About Title *
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your About title"
            {...register("title", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="whyBlog" className="block font-medium text-gray-700 mb-1">
            Story
          </label>
          <textarea
            id="content"
            rows="10"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("content", { required: true })}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="years" className="block font-medium text-gray-700 mb-1">
              Years
            </label>
            <input
              id="years"
              placeholder="Enter your Years..."
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("years", { required: true })}
            />
          </div>

          <div>
            <label
              htmlFor="excellence"
              className="block font-medium text-gray-700 mb-1"
            >
              Excellence
            </label>
            <input
              id="excellence"
              placeholder="Enter your Excellence title..."
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("excellence", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="daily" className="block font-medium text-gray-700 mb-1">
              Daily
            </label>
            <input
              id="daily"
              placeholder="Enter your Daily Customer..."
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("daily", { required: true })}
            />
          </div>

          <div>
            <label
              htmlFor="customer"
              className="block font-medium text-gray-700 mb-1"
            >
              {" "}
              Happy Customer
            </label>
            <input
              id="customer"
              placeholder="Enter your customer title..."
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("customer", { required: true })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors duration-200">
            <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
            <div className="text-sm text-gray-600">
              <label htmlFor="image-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700 font-medium">
                  Click to upload
                </span>
                or drag and drop
              </label>
              <input
                id="image-upload"
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

        <div>
          <label htmlFor="award" className="block font-medium text-gray-700 mb-1">
            Award Name
          </label>
          <input
            id="award"
            placeholder="Enter your Award Name..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("award", { required: true })}
          />
        </div>
        {/* <!-- Submit Button --> */}
        <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 cursor-pointer"
            >
              Save About 
            </button>
        </div>
      </form>
    </div>
  );
}

export default AddAbout;

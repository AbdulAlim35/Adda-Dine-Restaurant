import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import storageService from "../service/storageService";
import heroBannerDatabase from "../service/herobannerDatabase";

function AddHeroBanner() {
  const { register, handleSubmit, setValue } = useForm();
  const [about, setAbout] = useState(null);

  const onSubmit = async (data) => {
    const { image, ...other } = data;
    const file = data.image?.[0];
    const uploadFile = await storageService.uplodFile(file);

    const prepardData = { image: uploadFile.$id, ...other };
    let upload;
    try {
      if (about) {
        upload = await heroBannerDatabase.updatePost(about.$id, prepardData);
      } else {
        upload = await heroBannerDatabase.creatPost(prepardData);
      }

      setAbout(upload);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    const featchData = async () => {
      const section = await heroBannerDatabase.listQuery();

      if (section) {
        setAbout(section);
        setValue("herotitle", section.herotitle);
        setValue("herohading", section.herohading);
        setValue("image", section.image);
        setValue("bannertitle", section.bannertitle);
        setValue("bannercontent", section.bannercontent);
      }
    };
    featchData();
  }, []);
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Add Hero</h2>

      <form
        method="POST"
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="herotitle"
            className="block font-medium text-gray-700 mb-1"
          >
            Hero Title
          </label>
          <input
            id="name"
            placeholder="Enter your hero title..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("herotitle", { required: true })}
          />
        </div>

        <div>
          <label
            htmlFor="herohading"
            className="block font-medium text-gray-700 mb-1"
          >
            Hero Hading
          </label>
          <input
            id="herohading"
            placeholder="Enter your hading..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("herohading", { required: true })}
          />
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
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Add Banner</h2>
        <div>
          <label
            htmlFor="bannertitle"
            className="block font-medium text-gray-700 mb-1"
          >
            Banner Title
          </label>
          <input
            id="bannertitle"
            placeholder="Enter your banner title..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("bannertitle", { required: true })}
          />
        </div>
        <div>
          <label
            htmlFor="bannercontent"
            className="block font-medium text-gray-700 mb-1"
          >
            Banner Content
          </label>
          <textarea
            id="bannercontent"
            rows="3"
            placeholder="Enter your banner content..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("bannercontent", { required: true })}
          ></textarea>
        </div>
        {/* <!-- Submit Button --> */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 cursor-pointer"
          >
            Save Hero & Banner
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddHeroBanner;

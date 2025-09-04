import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import storageService from "../service/storageService";
import galleryDatabase from "../service/galleryDatabase";
import { useParams } from "react-router-dom";

function AddGallery() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { edit } = useParams();

  const onSubmit = async (data) => {
    const { image, ...other } = data;
    const file = data.image?.[0];
    const uploadFile = await storageService.uplodFile(file);

    const prepardData = { image: uploadFile.$id, ...other };
    let upload;
    try {
      if (edit) {
        upload = await galleryDatabase.updatePost(edit, prepardData);
      } else {
        upload = await galleryDatabase.creatPost(prepardData);
      }
      if (upload) {
        toast.success("Successfully Add");
      }
      if (edit) {
        toast.success("Successfully edit");
      }
      reset();
    } catch (error) {
      throw error;
    }
  };
  const featchData = async () => {
    const get = await galleryDatabase.getPost(edit);
    setValue("title", get.title);
    setValue("image", get.image);
    setValue("category", get.category);
  };
  useEffect(() => {
    if (edit) {
      featchData();
    }
  }, [edit]);
  const handleCancle = () => {
    reset({
      title: "",
      category: "",
      image: "",
    });
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">
        Add Gallery Image
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
            Title
          </label>
          <input
            id="name"
            placeholder="Enter your title..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", { required: true })}
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
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("category", { required: true })}
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Ambience">Ambience</option>
          </select>
        </div>
        {/* <!-- Submit Button --> */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            onClick={handleCancle}
          >
            Cancel
          </button>
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
  );
}

export default AddGallery;

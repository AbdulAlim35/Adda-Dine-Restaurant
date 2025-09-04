import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import chefDatabase from "../service/chefDatabase";
import storageService from "../service/storageService";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function AddChif() {
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
        upload = await chefDatabase.updatePost(edit, prepardData);
      } else {
        upload = await chefDatabase.creatPost(prepardData);
      }
      if (upload) {
        toast.success("Successfully Add");
      }if (edit) {
          toast.success("Successfully edit");
      }
    } catch (error) {
      throw error;
    }
       };

  useEffect(() => {
    if (edit) {
     loading();
    }
  }, [edit]);

    const loading = async () => {
      const get = await chefDatabase.getPost(edit);
      setValue("hading", get.hading);
      setValue("name", get.name);
      setValue("title", get.title);
      setValue("content", get.content);
      setValue("image", get.image);
      
    };
     const handleCancle = () => {
    reset({
      name: "",
      title: "",
      content: "",
      image: "",
    });
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">
        Add & Update Chef
      </h2>

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
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
             Chef Title
            </label>
            <select
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("title", { required: true })}
            >
              <option value="">Select a chef title</option>
              <option value="Master Chef">Master Chef</option>
              <option value="Executive Chef">Executive Chef</option>
              <option value="Head Chef">Head Chef</option>
              <option value="Assistant Chef">Assistant Chef</option>
              <option value="Junior Chef">Junior Chef</option>
              <option value="Others">Others</option>
            </select>
          </div>
        <div>
          <label
            htmlFor="content"
            className="block font-medium text-gray-700 mb-1"
          >
            Story
          </label>
          <textarea
            id="content"
            rows="10"
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
            <i className="fas fa-save mr-2"></i>
            Save Chef
          </button>
        </div>
      </form>
      <Toaster position="top-right" />
    </div>
  );
}

export default AddChif;

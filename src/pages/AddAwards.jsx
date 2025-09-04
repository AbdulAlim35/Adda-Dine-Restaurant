import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import awardsDatabase from "../service/awardsDatabase";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";

function AddAwards() {
  const { register, handleSubmit, watch, reset, setValue } = useForm();
  const { edit } = useParams();
  const allIcone = {
    ...FaIcons,
    ...Fa6Icons,
  };
  const iconName = watch("icone");
  const IconComponent = allIcone[iconName];

  const onSubmit = async (data) => {
    let upload;
    if (edit) {
      //   // Update if document exists
      upload = await awardsDatabase.updatePost(edit, data);
    } else {
      upload = await awardsDatabase.creatPost(data);

      //   // Create if no existing document
      //    // set as existing now
    }
    if (upload) {
      toast.success("Successfully Add");
    }
    reset();
  };
  useEffect(() => {
    if (edit) {
      loading();
    }
  }, [edit]);
  const loading = async () => {
    const get = await awardsDatabase.getPost(edit);
    setValue("title", get.title);
    setValue("hading", get.hading);
    setValue("icone", get.icone);
  };

  const handleCancle = () => {
    reset({
      title: "",
      hading: "",
      icone: "",
    });
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Add Awards</h2>

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
            placeholder="Enter your Title..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", { required: true })}
          />
        </div>
        <div>
          <label
            htmlFor="Hading"
            className="block font-medium text-gray-700 mb-1"
          >
            Hading
          </label>
          <input
            id="hading"
            placeholder="Enter your Hading..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("hading", { required: true })}
          ></input>
        </div>
        <div>
          <label
            htmlFor="icone"
            className="block font-medium text-gray-700 mb-1"
          >
            Icone Name
          </label>
          <input
            id="icone"
            placeholder="Enter your React Icone..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("icone", { required: true })}
          ></input>
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

export default AddAwards;

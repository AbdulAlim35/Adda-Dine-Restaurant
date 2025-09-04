import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import addressDatabase from "../service/addressDatabase";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import * as CiIcones from "react-icons/ci";
import * as LuIcones from "react-icons/lu";
import * as FiIcones from "react-icons/fi";
import * as FaIcones from "react-icons/fa";
import * as TfiIcones from "react-icons/tfi";
import * as MdIcones from "react-icons/md";
import * as IoIcones from "react-icons/io";

function AddContact() {
  const { register, handleSubmit, watch, reset, setValue } = useForm();
  const { edit } = useParams();
  const allIcone = {
    ...CiIcones,
    ...FiIcones,
    ...FaIcones,
    ...TfiIcones,
    ...MdIcones,
    ...IoIcones,
    ...LuIcones,
  };
  const iconeName =watch ("icone");
 const IconComponent = allIcone[iconeName]

  const onSubmit = async (data) => {
    let upload;
    if (edit) {
      //   // Update if document exists
      upload = await addressDatabase.updatePost(edit, data);
    } else {
      upload = await addressDatabase.creatPost(data);

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
    const get = await addressDatabase.getPost(edit);
    setValue("name", get.name);
    setValue("title1", get.title1);
    setValue("title2", get.title2);
    setValue("title3", get.title3);
    setValue("icone", get.icone);
  };

  const handleCancle = () => {
    reset({
      name: "",
      title1: "",
      title2: "",
      title3: "",
      title4: "",
      icone: "",
    });
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Add Contact</h2>

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
            placeholder="Enter your Name..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <label
            htmlFor="Title"
            className="block font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title1"
            placeholder="Enter your Title..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title1")}
          ></input>
        </div>
        <div>
          <label
            htmlFor="Title"
            className="block font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title2"
            placeholder="Enter your Title..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title2")}
          ></input>
        </div>
        <div>
          <label
            htmlFor="Title"
            className="block font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title3"
            placeholder="Enter your Title..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title3")}
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

export default AddContact;

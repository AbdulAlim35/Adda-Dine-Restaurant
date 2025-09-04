import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import socialIconeDatabase from '../service/socialiconeDatabase';
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";

function AddSocialIcone() {
    const { register, handleSubmit, watch, control } = useForm({
    defaultValues: {
      links: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });
    const allIcone = {
      ...FaIcons,
      ...Fa6Icons,
    };
    const iconName = watch("icone");
  const IconComponent = allIcone[iconName];

  const onSubmit =async (data) =>{
  for (const link of data.links) {
    await socialIconeDatabase.creatPost(link); 
  }
  
  }
  return (
      <form
      className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold text-gray-800">Add Social Links</h2>

      {/* <!-- One Row --> */}
      {fields.map((data, index)=>(
        <div key={data.id}  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            className="w-full sm:w-1/3 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Icone Name"
            {...register(`links.${index}.iconename`, { required: true })}
          
          />

          <input
            id="sociallink"
            type="url"
            placeholder="Enter your profile link..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
           {...register(`links.${index}.sociallink`, { required: true })}
          />

          <button
            type="button"
            title="Remove"
            className="text-red-600 hover:text-red-800 transition-colors duration-200"
            onClick={() => remove(index)}
          >
            Remove
          </button>
        </div>
        ))}
      {/* <!-- Add Button --> */}
      <div>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
             onClick={() => append({iconename:"", sociallink:"" })}
        >
          Add Social Link
        </button>
      </div>

      {/* <!-- Submit Button --> */}
      <button
        type="submit"
        className=" bg-blue-600 text-white font-semibold py-3 px-3 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
      >
        Save Links
      </button>
    </form>
  )
}

export default AddSocialIcone
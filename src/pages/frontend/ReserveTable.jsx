import React from "react";
import { useForm } from "react-hook-form";
import reserveTableDatabase from "../../service/reserveTableDatabase";

function ReserveTable() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) =>{
  await reserveTableDatabase.creatPost(data)
  reset();
  }
  return ( 
    <>
      
   <section
  id="reservation"
  className="py-20 text-white bg-cover bg-center relative"
  style={{
    backgroundImage: "url('public/images/restaurant-bg.webp')",
  }}
>
  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Book A Table</h2>
      <p className="text-xl opacity-90">
        Book your table for an unforgettable dining experience
      </p>
    </div>
    <form
      className="bg-deep-red/80 p-10 rounded-lg shadow-lg backdrop-blur-md relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-[#999999] border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-warm-gold"
            placeholder="Your Name"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-[#999999] border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-warm-gold"
            placeholder="your@email.com"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            className="w-full px-4 py-3 rounded-lg bg-[#999999] border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-warm-gold"
            placeholder="(555) 123-4567"
            {...register("phone", { required: true })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-white">Guests</label>
          <select
            className="w-full px-4 py-3 rounded-lg bg-[#999999] border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-warm-gold"
            {...register("guests", { required: true })}
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5+ Guests</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            className="w-full px-4 py-3 rounded-lg bg-[#999999] border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-warm-gold"
            {...register("date", { required: true })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-white">Time</label>
          <select
            className="w-full px-4 py-3 rounded-lg bg-[#999999] border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-warm-gold"
            {...register("time", { required: true })}
          >
            <option value="5:00">5:00 PM</option>
            <option value="5:30">5:30 PM</option>
            <option value="6:00">6:00 PM</option>
            <option value="6:30">6:30 PM</option>
            <option value="7:00">7:00 PM</option>
            <option value="7:30">7:30 PM</option>
            <option value="8:00">8:00 PM</option>
            <option value="8:30">8:30 PM</option>
            <option value="9:00">9:00 PM</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Special Requests</label>
        <textarea
          rows="3"
          className="w-full px-4 py-3 rounded-lg bg-[#999999] border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-warm-gold"
          placeholder="Any special requests or dietary restrictions..."
          {...register("request", { required: true })}
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-skin-golden text-white py-4 rounded-lg font-semibold text-lg hover:bg-yellow-600 transform hover:scale-105 transition duration-300"
      >
        Reserve Table
      </button>
    </form>
  </div>
</section>

    </>
  );
}

export default ReserveTable;

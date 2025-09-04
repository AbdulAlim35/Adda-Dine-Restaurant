import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import contectDatabase from "../../service/contectDatabase";
import { useTheme } from "../../contex/TheemProvider";
import * as CiIcones from "react-icons/ci";
import * as LuIcones from "react-icons/lu";
import * as FiIcones from "react-icons/fi";
import * as FaIcones from "react-icons/fa";
import * as TfiIcones from "react-icons/tfi";
import * as MdIcones from "react-icons/md";
import * as IoIcones from "react-icons/io";
import contectHeroDatabase from "../../service/contectHeroDatabase";
import storageService from "../../service/storageService";

function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const [massege, setMassege] = useState(null);
  const [hero, SetHero] = useState([]);
  const { contact } = useTheme();

  const allIcone = {
    ...CiIcones,
    ...FiIcones,
    ...FaIcones,
    ...TfiIcones,
    ...MdIcones,
    ...IoIcones,
    ...LuIcones,
  };
  const onSubmit = async (data) => {
    const sent = await contectDatabase.creatPost(data);
    setMassege(sent);
    reset();
  };
  useEffect(() => {
    const fatch = async () => {
      const load = await contectHeroDatabase.listQuery();
      SetHero(load);
    };
    fatch();
  }, []);

  return (
    <>
      {hero && (
        <section
          className="relative h-96 bg-gradient-to-r from-black/60 to-black/40 "
          style={{
            backgroundImage: hero?.image
              ? `url(${storageService.getFilePreview(hero.image)})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-warm-gold">
                {hero.herotitle}
              </h1>
              <p className="text-xl md:text-2xl">{hero.herohading}</p>
            </div>
          </div>
        </section>
      )}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-deep-red mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-gray-600">We'd love to hear from you</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-8">
                {contact.map((data) => {
                  const Icone = allIcone[data.icone?.trim()];
                  return (
                    <div key={data.$id} className="flex items-start space-x-4">
                      <div className="bg-skin-golden text-2xl text-white p-3 rounded-full">
                        {Icone ? <Icone /> : "❓"}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {data.name}
                        </h3>
                        <p className="text-gray-600">{data.title1}</p>
                        <p className="text-gray-600">{data.title2}</p>
                        <p className="text-gray-600">{data.title3}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-gold focus:border-transparent"
                      placeholder="Your Name"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-gold focus:border-transparent"
                      placeholder="your@email.com"
                      {...register("email", { required: true })}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-gold focus:border-transparent"
                    placeholder="Subject"
                    {...register("subject", { required: true })}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-gold focus:border-transparent"
                    placeholder="Your message..."
                    {...register("message", { required: true })}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-skin-golden  hover:bg-skin-yellow  text-white py-3 rounded-lg font-semibold  transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;

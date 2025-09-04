import React, { useEffect, useState } from "react";
import { useTheme } from "../../contex/TheemProvider";
import storageService from "../../service/storageService";
import philosophy from "../../service/philosophyDatabase";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as TiIcons from "react-icons/ti";
import awardsDatabase from "../../service/awardsDatabase";
import heroBannerDatabase from "../../service/herobannerDatabase";
import { Link } from "react-router-dom";

function About() {
  const { chef, load } = useTheme();
  const [loding, setLoding] = useState([]);
  const [awards, setAwards] = useState([]);
  const [heroBanner, setBanner] = useState([]);
  const allIcone = {
    ...FaIcons,
    ...Fa6Icons,
    ...TiIcons,
  };
  useEffect(() => {
    const fatch = async () => {
      const sent = await philosophy.philosophyQuery();
      setLoding(sent.documents);
    };
    fatch();
  }, []);

  useEffect(() => {
    const fatch = async () => {
      const load = await awardsDatabase.awardsQuery();
      setAwards(load.documents);
    };
    fatch();
  }, []);
  useEffect(() => {
    const fatchData = async () => {
      const sent = await heroBannerDatabase.listQuery();
      setBanner(sent);
    };
    fatchData();
  }, []);

  const orderMap = {
    "Master Chef": 1,
    "Executive Chef": 2,
    "Head Chef": 3,
    "Assistant Chef": 4,
    "Junior Chef": 5,
    Others: 6,
  };

  return (
    <>
      {/* <!-- Hero Section --> */}
      {heroBanner && (
        <section
          className="relative h-96 bg-gradient-to-r from-black/60 to-black/40 "
          style={{
            backgroundImage: heroBanner?.image
              ? `url(${storageService.getFilePreview(heroBanner.image)})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-warm-gold">
                {heroBanner.herotitle}
              </h1>
              <p className="text-xl md:text-2xl">{heroBanner.herohading}</p>
            </div>
          </div>
        </section>
      )}
      {load && (
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-deep-red mb-6">
                  {load.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {load.content}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warm-gold mb-2">
                      {load.years}
                    </div>
                    <div className="text-gray-600">{load.excellence}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warm-gold mb-2">
                      {load.daily}
                    </div>
                    <div className="text-gray-600">{load.customer}</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                {load.image && (
                  <img
                    src={storageService.getFilePreview(load.image)}
                    alt="Restaurant Interior"
                    className="rounded-lg shadow-2xl w-full h-96 object-cover"
                  />
                )}
                <div className="absolute -bottom-6 -left-6 bg-skin-golden text-white p-6 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold">Award Winning</div>
                  <div className="text-sm">{load.award}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* <!-- Meet Our Team Section --> */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-deep-red mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind every exceptional dining experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chef.length > 0 &&
              [...chef]
                .sort((a, b) => orderMap[a.title] - orderMap[b.title])
                .map((data) => (
                  <div
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                    key={data.$id}
                  >
                    <img
                      src={storageService.getFilePreview(data.image)}
                      alt="Chef Marco"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {data.name}
                      </h3>
                      <p className="text-warm-gold font-semibold mb-3">
                        {data.title}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {data.content}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
      {/* <!-- Our Philosophy Section --> */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-deep-red mb-4">
              Our Philosophy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe that great food brings people together and creates
              lasting memories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loding.map((data) => {
              const Icone = allIcone[data.icone?.trim()];
              return (
                <div className="text-center" key={data.$id}>
                  <div className="bg-skin-golden text-white text-4xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    {Icone ? <Icone /> : "❓"}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {data.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {data.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* <!-- Awards & Recognition Section --> */}
      <section className="py-20 bg-deep-red text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-xl opacity-90">
              Honored to be recognized by industry leaders and food critics
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((data) => {
              const Icone = allIcone[data.icone?.trim()];
              return (
                <div className="text-center" key={data.$id}>
                  <div className="bg-skin-golden text-white text-4xl w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {Icone ? <Icone /> : "❓"}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{data.title}</h3>
                  <p className="text-sm opacity-80">{data.hading}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* <!-- Call to Action Section --> */}
      {heroBanner && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-deep-red mb-6">
              {heroBanner.bannertitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {heroBanner.bannercontent}
            </p>
            <div className="space-x-4">
              <Link
               
                className="inline-block bg-skin-golden text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-600 transform hover:scale-105 transition duration-300"
              >
                Make a Reservation
              </Link>
              <Link
              
                className="inline-block border-2 border-deep-red text-deep-red px-8 py-4 rounded-full text-lg font-semibold hover:bg-deep-red hover:text-white transition duration-300"
              >
                View Our Menu
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default About;

import React, { useEffect, useState } from "react";
import databaseService from "../../service/databaseService";
import storageService from "../../service/storageService";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import aboutDatabase from "../../service/aboutDatabase";
import chefDatabase from "../../service/chefDatabase";
import { useTheme } from "../../contex/TheemProvider";
import heroDatabase from "../../service/heroDatabase";

function MainContent() {
  const [item, setItem] = useState([]);
  const [get, setGet] = useState([]);

  const { chef, load } = useTheme();
  const orderMap = {
    "Master Chef": 1,
    "Executive Chef": 2,
    "Head Chef": 3,
    "Assistant Chef": 4,
    "Junior Chef": 5,
    Others: 6,
  };

  useEffect(() => {
    const fatch = async () => {
      const sent = await databaseService.allItem();
      setItem(sent.documents);
    };

    fatch();
  }, []);

  useEffect(() => {
    const hero = async () => {
      const load = await heroDatabase.heroQuery();
      setGet(load);
    };
    hero();
  }, []);

  return (
    <>
      {get && (
        <section
          id="home"
          className="relative h-screen bg-gradient-to-r from-black/50 to-black/30"
          style={{
            backgroundImage: get?.image
              ? `url(${storageService.getFilePreview(get.image)})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-warm-gold">
                {get.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                {get.content}
              </p>
              <div className="space-x-4">
                <a
                  href="#menu"
                  className="inline-block bg-skin-golden text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-600 transform hover:scale-105 transition duration-300"
                >
                  View Menu
                </a>
                <a
                  href="#reservation"
                  className="inline-block border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-800 transition duration-300"
                >
                  Make Reservation
                </a>
              </div>
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
                    loading="lazy"
                    decoding="async"
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
      <section id="menu" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-deep-red mb-4">Our Menu</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our carefully crafted dishes made with the finest
              ingredients
            </p>
          </div>

          {/* <!-- Menu Categories --> */}
          {/* <div className="flex flex-wrap justify-center mb-12 space-x-4">
          <button
            className="menu-tab active bg-skin-golden text-gray-700 px-6 py-3 rounded-full font-semibold mb-2"
            data-category="appetizers"
          >
            Appetizers
          </button>
          <button
            className="menu-tab bg-white text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 mb-2"
            data-category="pasta"
          >
            Pasta
          </button>
          <button
            className="menu-tab bg-white text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 mb-2"
            data-category="mains"
          >
            Main Courses
          </button>
          <button
            className="menu-tab bg-white text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 mb-2"
            data-category="desserts"
          >
            Desserts
          </button>
        </div> */}

          {/* <!-- Menu Items --> */}
          <div id="menu-content">
            {/* <!-- Appetizers --> */}
            <div className="menu-category" data-category="appetizers">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {item.map((data) => (
                  <div
                    key={data.$id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                  >
                    <img
                      src={storageService.getFilePreview(data.image)}
                      alt="Bruschetta"
                      className="w-full h-48 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {data.title}
                        </h3>
                        <span className=" flex items-center justify-center font-bold text-warm-gold text-[16px]">
                          <FaBangladeshiTakaSign />
                          {data.price}{" "}
                        </span>
                      </div>
                      <p className="text-gray-600 line-clamp-1">
                        {data.content}
                      </p>
                    </div>
                  </div>
                ))}
                {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <img
                  src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"
                  alt="Antipasto"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      Antipasto Platter
                    </h3>
                    <span className="text-warm-gold font-bold text-lg">$18</span>
                  </div>
                  <p className="text-gray-600">
                    Selection of cured meats, cheeses, olives, and marinated
                    vegetables
                  </p>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
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
                      loading="lazy"
                      decoding='async'
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
    </>
  );
}

export default MainContent;

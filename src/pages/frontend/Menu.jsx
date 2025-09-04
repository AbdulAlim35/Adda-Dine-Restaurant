import React, { useEffect, useState } from "react";
import menuHeroBanner from "../../service/menuHeroBannerData";
import storageService from "../../service/storageService";
import culinaryDatabase from "../../service/culinaryDatabase";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import culinaryIconeDatabase from "../../service/culinaryIconeDatabase";
import offerDatabase from "../../service/offerDatabase";
import offerListDatabase from "../../service/offerListDatabase";
import databaseService from "../../service/databaseService";


function Menu() {
  const [heroBanner, setBanner] = useState([]);
  const [culinary, setCulinary] = useState([]);
  const [isIcone, setIcone] = useState([]);
  const [offer, setOffer] = useState([]);
  const [offerList, setOfferList] = useState([]);
  const [menu, setMenu] = useState([])
   const [selectedCategory, setSelectedCategory] = useState("Steak")
  const allIcone = {
    ...FaIcons,
    ...HiIcons,
  };
  useEffect(() => {
    const fatch = async () => {
      const sent = await menuHeroBanner.listQuery();
      setBanner(sent);
    };
    fatch();
  }, []);
  useEffect(() => {
    const featchData = async () => {
      const load = await culinaryDatabase.listQuery();
      setCulinary(load);
    };
    featchData();
  }, []);
  useEffect(() => {
    const fatch = async () => {
      const sent = await culinaryIconeDatabase.listQuery();
      setIcone(sent.documents);
    };
    fatch();
  }, []);
  useEffect(() => {
    const featch = async () => {
      const loaded = await offerDatabase.listQuery();
      setOffer(loaded);
    };
    featch();
  }, []);
  useEffect(() => {
    const fatch = async () => {
      const sent = await offerListDatabase.listQuery();
      setOfferList(sent.documents);
    };
    fatch();
  }, []);

   const fatchMenu = async (category) =>{
     setSelectedCategory(category);
    const load = await databaseService.manuQuery(category)
    console.log(load);
    
    setMenu(load.documents)
   }


 useEffect(() => {
 fatchMenu("Steak")
 }, [])
 
 
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
              <h1 className="text-5xl text-warm-gold md:text-6xl font-bold mb-4">
                {heroBanner.herotitle}
              </h1>
              <p className="text-xl md:text-2xl">{heroBanner.herohading}</p>
            </div>
          </div>
        </section>
      )}
      {/* <!-- Menu Introduction --> */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {culinary && (
            <div>
              <h2 className="text-3xl font-bold text-deep-red mb-6">
                {culinary.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {culinary.content}
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isIcone.map((data) => {
              const Icone = allIcone[data.icone?.trim()];
              return (
                <div className="text-center" key={data.$id}>
                  <div className="bg-skin-golden text-white text-[20px] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    {Icone ? <Icone /> : "❓"}
                  </div>
                  <h3 className="font-semibold text-gray-800">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.hading}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* <!-- Menu Section --> */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <!-- Menu Categories --> */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            <button
             className={`menu-tab px-6 py-3 rounded-full font-semibold cursor-pointer 
              ${selectedCategory === "Steak" ? "bg-yellow-600 text-white" : "bg-skin-golden hover:bg-yellow-600 text-white"}`}
              onClick={() => fatchMenu("Steak")}
            >
              Steak
            </button>
            <button
             className={`menu-tab px-6 py-3 rounded-full font-semibold cursor-pointer 
              ${selectedCategory === "Pizza" ? "bg-yellow-600 text-white" : "bg-skin-golden hover:bg-yellow-600 text-white"}`}
              onClick={() => fatchMenu("Pizza")}
            >
              Pizza
            </button>
            <button
              className={`menu-tab px-6 py-3 rounded-full font-semibold cursor-pointer 
              ${selectedCategory === "Burger" ? "bg-yellow-600 text-white" : "bg-skin-golden hover:bg-yellow-600 text-white"}`}
               onClick={() => fatchMenu("Burger")}

            >
              Burger
            </button>
            <button
             className={`menu-tab px-6 py-3 rounded-full font-semibold cursor-pointer 
              ${selectedCategory === "Sandwic" ? "bg-yellow-600 text-white" : "bg-skin-golden hover:bg-yellow-600 text-white"}`}
              onClick={() => fatchMenu("Sandwic")}
            >
              Sandwic
            </button>
            <button
              className={`menu-tab px-6 py-3 rounded-full font-semibold cursor-pointer 
              ${selectedCategory === "Salad" ? "bg-yellow-600 text-white" : "bg-skin-golden hover:bg-yellow-600 text-white"}`}
               onClick={() => fatchMenu("Salad")}
            >
              Salad
            </button>
            <button
             className={`menu-tab px-6 py-3 rounded-full font-semibold cursor-pointer 
              ${selectedCategory === "Dessert" ? "bg-yellow-600 text-white" : "bg-skin-golden hover:bg-yellow-600 text-white"}`}
             onClick={() => fatchMenu("Dessert")}
            >
              Dessert
            </button>
          </div>

          {/* <!-- Menu Items --> */}
          <div id="menu-content">
            {/* <!-- Appetizers --> */}
            <div className="menu-category" >
              <h2 className="text-3xl font-bold text-deep-red mb-8 text-center">
                {selectedCategory}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menu.map((data)=>(
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300" key={data.$id}>
                  <img
                    src={storageService.getFilePreview(data.image)}
                    alt="Bruschetta"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {data.title}
                      </h3>
                      <span className="text-warm-gold font-bold text-lg">
                        {data.price}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      {data.content}
                    </p>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Special Offers Section --> */}
      <section className="py-16 bg-deep-red text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {offer && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{offer.title}</h2>
              <p className="text-xl opacity-90">{offer.hading}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" >
            {offerList.map((data)=>(
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center" key={data.$id}>
              <h3 className="text-xl font-bold mb-3">{data.title}</h3>
              <p className="mb-4">{data.hading}</p>
              <p className="text-warm-gold font-semibold">
                {data.date}
              </p>
            </div>
             ))}
          </div>
          
        </div>
       
      </section>

      {/* <!-- Call to Action Section --> */}
      {heroBanner && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-deep-red mb-6">
              {heroBanner.bannertitle}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {heroBanner.bannercontent}
            </p>
            <div className="space-x-4">
              <a
                href="index.html#reservation"
                className="inline-block bg-skin-golden text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-600 transform hover:scale-105 transition duration-300"
              >
                Make a Reservation
              </a>
              <a
                href="index.html#contact"
                className="inline-block border-2 border-deep-red text-deep-red px-8 py-4 rounded-full text-lg font-semibold hover:bg-deep-red hover:text-white transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Menu;

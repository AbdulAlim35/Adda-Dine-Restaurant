import React, { useEffect, useState } from "react";
import galleryDatabase from "../../service/galleryDatabase";
import storageService from "../../service/storageService";
import galleryHeroBannerDatabase from "../../service/galleryHeroBannerDatabase";

function Gallery() {
  const [heroBanner, setBanner] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const fatchGallery = async (category) => {
    const load = await galleryDatabase.galleryQuery(category);
    setGallery(load.documents);
    setSelectedCategory(category);
  };

  useEffect(() => {
    fatchGallery("All");
  }, []);
  useEffect(() => {
    const fatch = async () => {
      const sent = await galleryHeroBannerDatabase.listQuery();
      setBanner(sent);
    };
    fatch();
  }, []);
  return (
    <>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <!-- Menu Categories --> */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            <button
              className={`menu-tab px-6 py-3 rounded-full font-semibold cursor-pointer 
              ${selectedCategory === "All" ? "bg-yellow-600 text-white" : "bg-skin-golden hover:bg-yellow-600 text-white"}`}
              
              onClick={() => fatchGallery("All")}
            >
              All Photos
            </button>
            <button
              className={`menu-tab px-6 py-3 rounded-full font-semibold cursor-pointer 
              ${selectedCategory === "Food" ? "bg-yellow-600 text-white" : "bg-skin-golden hover:bg-yellow-600 text-white"}`}
              onClick={() => fatchGallery("Food")}
            >
              Our Food
            </button>
            <button
               className={`menu-tab px-6 py-3 rounded-full font-semibold cursor-pointer 
              ${selectedCategory === "Ambience" ? "bg-yellow-600 text-white" : "bg-skin-golden hover:bg-yellow-600 text-white"}`}
              onClick={() => fatchGallery("Ambience")}
            >
              Ambience
            </button>
          </div>
          {gallery?.length > 0 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-deep-red mb-8 text-center">
                {selectedCategory === "All" ? "All Photos" : selectedCategory}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((data) => (
                  <div
                    key={data.$id}
                    className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300 group"
                    onClick={() =>
                      setSelectedImage(
                        storageService.getFilePreview(data.image)
                      )
                    }
                  >
                    <img
                      src={storageService.getFilePreview(data.image)}
                      alt="Gallery Image"
                      className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        {data.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-red-400 font-medium  transition text-2xl  bg-yellow-500 hover:bg-white w-10 h-10 rounded-full cursor-pointer"
          >
            X
          </button>

          <img
            src={selectedImage}
            alt="Zoomed"
            className="max-w-4xl max-h-[90vh] rounded-lg shadow-2xl"
          />
        </div>
      )}
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

export default Gallery;

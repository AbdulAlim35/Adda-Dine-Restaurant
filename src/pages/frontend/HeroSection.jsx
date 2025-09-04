import React from "react";

function HeroSection() {
  return (
   <section
  id="home"
  className="relative h-screen bg-gradient-to-r from-black/50 to-black/30"
  style={{
    backgroundImage: "url('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 flex items-center justify-center h-full text-center text-white">
        <div class="max-w-4xl mx-auto px-4">
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span class="text-warm-gold">Bella Vista</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 leading-relaxed">
            Experience authentic Italian cuisine in an elegant atmosphere
          </p>
          <div class="space-x-4">
            <a
              href="#menu"
              class="inline-block bg-skin-golden text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-600 transform hover:scale-105 transition duration-300"
            >
              View Menu
            </a>
            <a
              href="#reservation"
              class="inline-block border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-800 transition duration-300"
            >
              Make Reservation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

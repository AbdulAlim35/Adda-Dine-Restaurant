import React, { useEffect, useState } from "react";
import { useTheme } from "../../contex/TheemProvider";
import { Link } from "react-router-dom";
import socialIconeDatabase from "../../service/socialiconeDatabase";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";

function Footer() {
  const { singleContact, setting } = useTheme();
  const [icone, setIcone] = useState([]);
  const allIcone = {
    ...FaIcons,
    ...Fa6Icons,
  };
  useEffect(() => {
    const fatch = async () => {
      const sent = await socialIconeDatabase.listPost();
      setIcone(sent.documents);
    };
    fatch();
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            {setting && (
              <div>
                <h3 className="text-2xl font-bold text-warm-gold mb-4">
                  {setting.name}
                </h3>
                <p className="text-gray-300 mb-4">{setting.content}</p>
              </div>
            )}
            <div className="flex space-x-4">
              {icone.map((data, index) => {
                const Icone = allIcone[data.iconename?.trim()];
                return (
                  <a
                    key={index}
                    href={data.sociallink}
                    target="_blank"
                    className="text-gray-300 text-2xl hover:text-skin-golden transition duration-300"
                  >
                    {Icone ? <Icone /> : "❓"}
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/frontend/home"
                  className="text-gray-300 hover:text-warm-gold transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/frontend/about"
                  className="text-gray-300 hover:text-warm-gold transition duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/frontend/menu"
                  className="text-gray-300 hover:text-warm-gold transition duration-300"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="#reservation"
                  className="text-gray-300 hover:text-warm-gold transition duration-300"
                >
                  Reservations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>{singleContact["Address"]?.title1}</li>
              <li>{singleContact["Address"]?.title3}</li>
              <li>{singleContact["Phone"]?.title1}</li>
              <li>{singleContact["Email"]?.title1}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {singleContact["Hours"]?.name}
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>{singleContact["Hours"]?.title1}</li>
              <li>{singleContact["Hours"]?.title2}</li>
              <li>{singleContact["Hours"]?.title3}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2025 Adda & Dine Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

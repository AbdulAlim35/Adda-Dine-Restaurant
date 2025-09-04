import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../contex/TheemProvider";
import { RxHamburgerMenu } from "react-icons/rx";

function Header() {
   const { setting } =useTheme()
   const [isOpen, setOpen] = useState(false)
  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {setting && (
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-deep-red">{setting.name}</h1>
            </div>
            )}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <NavLink
                  to="/frontend/home"
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive }) =>
                  `relative  py-2 inline-block transition-all duration-200 ${
                    isActive
                      ? "text-skin-Red  font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-skin-Red after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      : "text-gray-700 font-medium hover:text-skin-Red after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-skin-Red after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                  }`
                }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/frontend/about"
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive }) =>
                  `relative  py-2 inline-block transition-all duration-200 ${
                    isActive
                      ? "text-skin-Red  font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-skin-Red after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      : "text-gray-700 font-medium hover:text-skin-Red after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-skin-Red after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                  }`
                }
                >
                  About
                </NavLink>
                <NavLink
                  to="/frontend/menu"
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive }) =>
                  `relative  py-2 inline-block transition-all duration-200 ${
                    isActive
                      ? "text-skin-Red  font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-skin-Red after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      : "text-gray-700 font-medium hover:text-skin-Red after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-skin-Red after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                  }`
                }
                >
                  Menu
                </NavLink>
                <NavLink
                  to="/frontend/gallery"
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive }) =>
                  `relative  py-2 inline-block transition-all duration-200 ${
                    isActive
                      ? "text-skin-Red  font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-skin-Red after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      : "text-gray-700 font-medium hover:text-skin-Red after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-skin-Red after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                  }`
                }
                >
                  Gallery
                </NavLink>
                <NavLink
                  to="/frontend/contact"
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive }) =>
                  `relative  py-2 inline-block transition-all duration-200 ${
                    isActive
                      ? "text-skin-Red  font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-skin-Red after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      : "text-gray-700 font-medium hover:text-skin-Red after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-skin-Red after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                  }`
                }
                >
                  Contact
                </NavLink>
                <Link
                   to="/frontend/reservetable"
                  className="bg-skin-golden text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition duration-300 font-medium"
                >
                  Reserve Table
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <button
                id="mobile-menu-btn"
                className="text-gray-700 text-2xl hover:text-deep-red"
                onClick={() => setOpen(!isOpen)}
              >
               <RxHamburgerMenu />

              </button>
            </div>
          </div>
        </div>
        {/* <!-- Mobile menu --> */}
        {isOpen && (
        <div id="mobile-menu" className="md:hidden  bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
             to="/frontend/home"
              className="block px-3 py-2 text-gray-700 hover:text-deep-red"
            >
              Home
            </Link>
            <Link
              to="/frontend/about"
              className="block px-3 py-2 text-gray-700 hover:text-deep-red"
            >
              About
            </Link>
            <Link
              to="/frontend/menu"
              className="block px-3 py-2 text-gray-700 hover:text-deep-red"
            >
              Menu
            </Link>
            <Link
               to="/frontend/gallery"
              className="block px-3 py-2 text-gray-700 hover:text-deep-red"
            >
              Gallery
            </Link>
            <Link
               to="/frontend/contact"
              className="block px-3 py-2 text-gray-700 hover:text-deep-red"
            >
              Contact
            </Link>
            <Link
              to="/frontend/reservetable"
              className="block px-3 py-2 bg-skin-golden text-white rounded"
            >
              Reserve Table
            </Link>
          </div>
        </div>
        )}
      </nav>
    </>
  );
}

export default Header;

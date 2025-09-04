import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logout from "../components/Logout";
import { useTheme } from "../contex/TheemProvider";
import storageService from "../service/storageService";
import { IoIosRestaurant } from "react-icons/io";

function Layout() {
  const { authInfo, imageId } = useTheme();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-slate-900 text-white overflow-y-auto max-h-[100vh] scrollbar-hide">
        <div className="flex flex-col h-full">
          <div className="flex items-center p-6 border-b border-slate-700">
            <div className="bg-purple-600 p-2 rounded-lg mr-3">
              <IoIosRestaurant />
            </div>
            <h1 className="text-xl font-bold">Capritech Admin</h1>
          </div>

          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <img
                src={storageService.getFilePreview(imageId)}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{authInfo.name}</p>
                <p className="text-sm text-slate-400">{authInfo.email}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/addmenu"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                  onClick={() => toggleMenu("menu")}
                >
                  Add Menu Item
                </NavLink>
                {openMenus.menu && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/allmenu"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                      >
                        ▸ All Menu Item
                      </NavLink>
                    </li>
                  </ul>
                )}
                {openMenus.menu && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/menuherobanner"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                      >
                        ▸ Add Hero Banner
                      </NavLink>
                    </li>
                  </ul>
                )}
                {openMenus.menu && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/culinary"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                        onClick={() => toggleMenu("culinary")}
                      >
                        ▸ Add Culinary
                      </NavLink>
                      {openMenus.culinary && (
                        <ul className="ml-6 mt-2 space-y-2 ">
                          <li>
                            <NavLink
                              to="/admin/culinaryicone"
                              className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                              onClick={() => toggleMenu("all")}
                            >
                              ▸ Add Features
                            </NavLink>
                            {openMenus.all && (
                              <ul className="ml-6 mt-2 space-y-2 ">
                                <li>
                                  <NavLink
                                    to="/admin/allculinary"
                                    className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                                  >
                                    ▸ All Features
                                  </NavLink>
                                </li>
                              </ul>
                            )}
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
                {openMenus.menu && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/offer"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                        onClick={() => toggleMenu("offer")}
                      >
                        ▸ Add Offer Title
                      </NavLink>
                      {openMenus.offer && (
                        <ul className="ml-6 mt-2 space-y-2 ">
                          <li>
                            <NavLink
                              to="/admin/offerlist"
                              className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                              onClick={() => toggleMenu("list")}
                            >
                              ▸ Add Offer List
                            </NavLink>
                            {openMenus.list && (
                              <ul className="ml-6 mt-2 space-y-2 ">
                                <li>
                                  <NavLink
                                    to="/admin/alloffer"
                                    className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                                  >
                                    ▸ All Offer List
                                  </NavLink>
                                </li>
                              </ul>
                            )}
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <NavLink
                  to="/admin/hero"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  Add Hero
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/about"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                  onClick={() => toggleMenu("about")}
                >
                  Add About
                </NavLink>
                {openMenus.about && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/about-Philosophy"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                        onClick={() => toggleMenu("Add")}
                      >
                        ▸ Add Philosophy
                      </NavLink>
                      {openMenus.Add && (
                        <ul className="ml-6 mt-2 space-y-2 ">
                          <li>
                            <NavLink
                              to="/admin/all-Philosophy"
                              className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                            >
                              ▸ All Philosophy
                            </NavLink>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
                {openMenus.about && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/awards"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                        onClick={() => toggleMenu("All")}
                      >
                        ▸ Add Awards
                      </NavLink>
                      {openMenus.All && (
                        <ul className="ml-6 mt-2 space-y-2 ">
                          <li>
                            <NavLink
                              to="/admin/all-awards"
                              className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                            >
                              ▸ All Awards
                            </NavLink>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
                {openMenus.about && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/herobanner"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                      >
                        ▸ Add Hero Banner
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <NavLink
                  to="/admin/addgallery"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                  onClick={() => toggleMenu("gallery")}
                >
                  Add Gallery
                </NavLink>
                {openMenus.gallery && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/allgallery"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                      >
                        ▸ All Gallery List
                      </NavLink>
                    </li>
                  </ul>
                )}
                {openMenus.gallery && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/galleryherobanner"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                      >
                        ▸ Add Hero Banner
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <NavLink
                  to="/admin/chif"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                  onClick={() => toggleMenu("chef")}
                >
                  Add Chef
                </NavLink>
                {openMenus.chef && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/allchif"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                      >
                        ▸ All Chef List
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <NavLink
                  to="/admin/addcontact"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                  onClick={() => toggleMenu("contact")}
                >
                  Add Contact
                </NavLink>
                {openMenus.contact && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/allcontact"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                      >
                        ▸ All Contact List
                      </NavLink>
                    </li>
                  </ul>
                )}
                {openMenus.contact && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/messagelist"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                      >
                        ▸ All Messages
                      </NavLink>
                    </li>
                  </ul>
                )}
                {openMenus.contact && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/addcontacthero"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                      >
                        ▸ Add Contact Hero
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <NavLink
                  to="/admin/tablebook"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  Booking Table
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/addsetting"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                  onClick={() => toggleMenu("icone")}
                >
                  Add Setting
                </NavLink>
                {openMenus.icone && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/admin/addsocialicone"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                      >
                        ▸ Add Social Icone
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <NavLink
                  to="/admin/profile"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t border-slate-700">
            <Logout />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;

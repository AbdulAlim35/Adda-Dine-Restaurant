import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddBlog from "./pages/AddBlog";
import BlogList from "./pages/BlogList";
import Profile from "./pages/Profile";
import AddAbout from "./pages/AddAbout";
import AddChif from "./pages/AddChif";
import AllChifList from "./pages/AllChifList";
import AddHero from "./pages/AddHero";
import AddPhilosophy from "./pages/AddPhilosophy";
import AllPhilosophy from "./pages/AllPhilosophy";
import AddAwards from "./pages/AddAwards";
import AllAwards from "./pages/AllAwards";
import AddHeroBanner from "./pages/AddHeroBanner";
import AddMenuHeroBanner from "./pages/AddMenuHeroBanner";
import AddCulinary from "./pages/AddCulinary";
import AddCulinaryIcone from "./pages/AddCulinaryIcone";
import AllCulinaryIcone from "./pages/AllCulinaryIcone";
import AddOfferTitle from "./pages/AddOfferTitle";
import AddOfferList from "./pages/AddOfferList";
import AllOfferList from "./pages/AllOfferList";
import AddGallery from "./pages/AddGallery";
import AllGalleryList from "./pages/AllGalleryList";
import AddGalleryHeroBanner from "./pages/AddGalleryHeroBanner";
import AddContact from "./pages/AddContact";
import AllContectList from "./pages/AllContectList";
import AddContactHero from "./pages/AddContactHero";
import MessageList from "./pages/MessageList";
import TableBook from "./pages/TableBook";
import AddSetting from "./pages/AddSetting";
import AddSocialIcone from "./pages/AddSocialIcone";

import FrontendLayout from "./layout/FrontendLayout";
import MainContent from "./pages/frontend/MainContent";
import About from "./pages/frontend/About";
import Menu from "./pages/frontend/Menu";
import Gallery from "./pages/frontend/Gallery";
import Contact from "./pages/frontend/Contact";
import ReserveTable from "./pages/frontend/ReserveTable";

function Routing() {
  return (
    <Routes>
      <Route path="/*" element={<FrontendLayout />}>
        <Route path="home" element={<MainContent />} />
        <Route path="about" element={<About />} />
        <Route path="menu" element={<Menu />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="reservetable" element={<ReserveTable />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="addmenu" element={<AddBlog />} />
        <Route path="edit-blog/:id" element={<AddBlog />} />
        <Route path="allmenu" element={<BlogList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="hero" element={<AddHero />} />
        <Route path="about" element={<AddAbout />} />
        <Route path="about-Philosophy" element={<AddPhilosophy />} />
        <Route path="edit-Philosophy/:edit" element={<AddPhilosophy />} />
        <Route path="all-Philosophy" element={<AllPhilosophy />} />
        <Route path="awards" element={<AddAwards />} />
        <Route path="edit-awards/:edit" element={<AddAwards />} />
        <Route path="all-awards" element={<AllAwards />} />
        <Route path="chif" element={<AddChif />} />
        <Route path="edit-chif/:edit" element={<AddChif />} />
        <Route path="allchif" element={<AllChifList />} />
        <Route path="herobanner" element={<AddHeroBanner />} />
        <Route path="menuherobanner" element={<AddMenuHeroBanner />} />
        <Route path="culinary" element={<AddCulinary />} />
        <Route path="culinaryicone" element={<AddCulinaryIcone />} />
        <Route path="editculinaryicone/:edit" element={<AddCulinaryIcone />} />
        <Route path="allculinary" element={<AllCulinaryIcone />} />
        <Route path="offer" element={<AddOfferTitle />} />
        <Route path="offerlist" element={<AddOfferList />} />
        <Route path="editofferlist/:edit" element={<AddOfferList />} />
        <Route path="alloffer" element={<AllOfferList />} />
        <Route path="addgallery" element={<AddGallery />} />
        <Route path="editgallerylist/:edit" element={<AddGallery />} />
        <Route path="allgallery" element={<AllGalleryList />} />
        <Route path="galleryherobanner" element={<AddGalleryHeroBanner />} />
        <Route path="addcontact" element={<AddContact />} />
        <Route path="editcontact/:edit" element={<AddContact />} />
        <Route path="allcontact" element={<AllContectList />} />
        <Route path="messagelist" element={<MessageList />} />
        <Route path="addcontacthero" element={<AddContactHero />} />
        <Route path="tablebook" element={<TableBook />} />
        <Route path="addsetting" element={<AddSetting />} />
        <Route path="addsocialicone" element={<AddSocialIcone />} />
      </Route>
    </Routes>
  );
}

export default Routing;

import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";

import Header from "./containers/Header/Header";
import Product from "./components/Product/Product";

import Logup from "./containers/Logup/Logup";
import Logout from "./containers/Logout/Logout";
import Login from "./containers/Login/Login";

import Cart from "./containers/Cart/Cart";
import Profile from "./containers/Profile/Profile";

import Notfound from "./components/PageNotFound/Notfound";
import Authentication from "./utilities/Authentication";
import ProductList from "./containers/ProductList/ProductsList";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Authentication child={ProductList} auth={false} />} />
        <Route path="product/:id" element={<Authentication child={Product} auth={false} />} />

        <Route path="/register" element={<Authentication child={Logup} auth={false} />} />
        <Route path="/cart" element={<Authentication child={Cart} auth={false} />} />
        <Route path="/profile" element={<Authentication child={Profile} auth={true} />} />
        <Route path="/login" element={<Authentication child={Login} auth={false} />} />
        <Route path="/logout" element={<Authentication child={Logout} auth={true} />} />

        <Route path="notFound" element={<Notfound />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;

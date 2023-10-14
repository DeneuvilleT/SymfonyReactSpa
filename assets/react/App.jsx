import { Routes, Route } from "react-router-dom";
import React from "react";

import Header from "./containers/Header/Header";
import Products from "./containers/Products/Products";

import Logup from "./containers/Logup/Logup";
import Logout from "./components/Logout/Logout";
import Login from "./components/Login/Login";

import Cart from "./containers/Cart/Cart";
import Profile from "./containers/Profile/Profile";

import Notfound from "./components/PageNotFound/Notfound";
import Authentication from "./utilities/Authentication";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          index
          path="/"
          element={<Authentication child={Products} auth={false} />}
        />
        <Route
          index
          path="/register"
          element={<Authentication child={Logup} auth={false} />}
        />
        <Route
          path="/cart"
          element={<Authentication child={Cart} auth={true} />}
        />
        <Route
          path="/profile"
          element={<Authentication child={Profile} auth={true} />}
        />
        <Route
          path="/login"
          element={<Authentication child={Login} auth={false} />}
        />
        <Route
          path="/logout"
          element={<Authentication child={Logout} auth={false} />}
        />

        <Route index path="notFound" element={<Notfound />} />
        <Route index path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;

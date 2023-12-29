import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./containers/Header/Header";
import Product from "./components/Product/Product";
import Logup from "./containers/Logup/Logup";
import Logout from "./containers/Logout/Logout";
import Login from "./containers/Login/Login";
import Cart from "./containers/Cart/Cart";
import Notfound from "./components/PageNotFound/Notfound";
import Authentication from "./utilities/Authentication";
import ProductList from "./containers/ProductList/ProductsList";
import ProfileBridge from "./containers/ProfileBridge/ProfileBridge";
import UserDatas from "./containers/ProfileBridge/UserDatas/UserDatas";
import UserComments from "./containers/ProfileBridge/UserComments/UserComments";
import UserOrders from "./containers/ProfileBridge/UserOrders/UserOrders";
import Notif from "./components/Notif/Notif";

import { useDispatch } from "react-redux";
import { clearCart } from "./Store/slices/cartSlices";

const App = ({ container }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (container.dataset.clean) {
      dispatch(clearCart());
      container.removeAttribute("data-clean");
    }
  }, [container.dataset.clean, dispatch]);

  return (
    <>
      <Header />
      <Notif />
      <Routes>
        <Route path="/" element={<Authentication child={ProductList} auth={false} />} />
        <Route path="product/:id" element={<Authentication child={Product} auth={false} />} />

        <Route path="/cart" element={<Authentication child={Cart} auth={false} />} />

        <Route path="/profile" element={<Authentication child={ProfileBridge} auth={true} />} />
        <Route path="/user/datas" element={<Authentication child={UserDatas} auth={true} />} />
        <Route path="/user/orders" element={<Authentication child={UserOrders} auth={true} />} />
        <Route path="/user/comments" element={<Authentication child={UserComments} auth={true} />} />

        <Route path="/register" element={<Authentication child={Logup} auth={false} />} />
        <Route path="/login" element={<Authentication child={Login} auth={false} />} />
        <Route path="/logout" element={<Authentication child={Logout} auth={true} />} />

        <Route path="/notFound" element={<Notfound />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;

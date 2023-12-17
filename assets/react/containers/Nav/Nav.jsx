import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProductsStatus, fetchProducts } from "../../Store/slices/productsSlices";

import styles from "./nav.styles.scss";

const Nav = () => {
  const { isLog, status, infos } = useSelector((state) => ({ ...state.auth }));
  const token = localStorage.getItem(`${location.origin}_bear_token`);

  const dispatch = useDispatch();

  const productsStatus = useSelector(getProductsStatus);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  const handleAdmin = async () => {
    try {
      const response = await axios.get("/api/v1/access_admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return (location.href = response.data.url);
      }
    } catch (error) {
      return console.error(error);
    }
  };

  return (
    <nav className={styles.nav}>
      <h1>
        <Link to={"/"}>Exemple.com</Link>
      </h1>

      <ul>
        <Link to={"/"}>Produits</Link>
        <Link to={"/cart"}>Panier</Link>

        {isLog ? <Link to={"/profile"}>Profil</Link> : <></>}
        <Link to={"/register"}>Inscription</Link>

        {status === "ROLE_SUPER_ADMIN" ? (
          <a target="_blank" style={{ cursor: "pointer" }} onClick={handleAdmin}>
            Administration
          </a>
        ) : (
          <></>
        )}

        {isLog ? <Link to={"/logout"}>Déconnexion</Link> : <Link to={"/login"}>Connexion</Link>}
      </ul>
    </nav>
  );
};

export default Nav;

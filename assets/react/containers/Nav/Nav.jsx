import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProductsStatus, fetchProducts } from "../../Store/slices/productsSlices";

import styles from "./nav.styles.scss";

const Nav = () => {
  const { isLog, status } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();

  const productsStatus = useSelector(getProductsStatus);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  return (
    <nav className={styles.nav}>
      <h1>Exemple.com</h1>

      <ul>
        <Link to={"/"}>Produits</Link>
        <Link to={"/cart"}>Panier</Link>

        <Link to={"/profile"}>Profil</Link>
        <Link to={"/register"}>Inscription</Link>

        {status === "SuperAdmin" ? (
          <a target="_blank" href="/admin_back_office/protected">
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

import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav.styles.scss";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <h1>Mes-rêves.com</h1>
      <ul>
        <Link to={"/"}>Accueil</Link>
        <Link to={"/products"}>Produits</Link>
        <Link to={"/cart"}>Panier</Link>
        <Link to={"/profile"}>Profil</Link>
      </ul>
    </nav>
  );
};

export default Nav;

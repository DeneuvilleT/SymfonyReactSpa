import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav.styles.scss";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <h1>Exemple.com</h1>
      <ul>
        <Link to={"/"}>Produits</Link>
        <Link to={"/cart"}>Panier</Link>
        <Link to={"/profile"}>Profil</Link>
        <Link to={"/login"}>Connexion</Link>
        <Link to={"/register"}>Inscription</Link>
        <Link to={"/logout"}>Déconnexion</Link>
        
        <a target="_blank" href="/admin">Administration</a>
      </ul>
    </nav>
  );
};

export default Nav;

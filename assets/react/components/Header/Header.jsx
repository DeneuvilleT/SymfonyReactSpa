import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <Link to={"/"}>Accueil</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/about"}>A propos</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

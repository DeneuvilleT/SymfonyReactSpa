import React from "react";
import Nav from "../Nav/Nav";

import styles from "./header.styles.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Nav />
    </header>
  );
};

export default Header;

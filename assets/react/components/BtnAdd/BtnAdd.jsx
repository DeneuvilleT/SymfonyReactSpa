import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import styles from "./btnAdd.styles.scss";

const BtnAdd = ({ product }) => {
  return (
    <aside>
      <Icon
        className={styles.btnAdd}
        icon="mdi:cart-arrow-down"
        color="black"
        width="60"
        height="60"
      />

      <div>
        
      </div>
    </aside>
  );
};

export default BtnAdd;

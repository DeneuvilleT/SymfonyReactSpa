import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import styles from "./stock.styles.scss";

const Quantity = ({ stock }) => {
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    changeAvailability();
  }, [stock]);

  const changeAvailability = () => {
    if (stock >= 10) {
      setAvailability(
        <Icon
          icon="line-md:circle-twotone-to-confirm-circle-twotone-transition"
          color="green"
          width="30"
          height="30"
        />
      );
    } else if (stock <= 5 && stock !== 0) {
      setAvailability(
        <Icon
          icon="line-md:alert-circle-twotone"
          color="orange"
          width="30"
          height="30"
        />
      );
    } else {
      setAvailability(
        <Icon
          icon="line-md:cancel-twotone"
          color="red"
          width="30"
          height="30"
        />
      );
    }
  };

  return (
    <>
      <meta itemProp="availability" content="http://schema.org/InStock" />
      <p className={styles.stock}>Disponibilité : {availability}</p>
    </>
  );
};

export default Quantity;

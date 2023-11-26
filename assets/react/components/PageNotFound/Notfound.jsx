import React from "react";
import { Icon } from "@iconify/react";

import styles from "./notFound.styles.scss";

const Notfound = () => {
  return (
    <main className={styles.notFound}>
      <div>
        <Icon icon="line-md:alert-circle" width="100" height="100" />
      </div>

      <div>
        <h2>Erreur 404</h2>
        <h3>Page non trouvée</h3>
      </div>
    </main>
  );
};

export default Notfound;

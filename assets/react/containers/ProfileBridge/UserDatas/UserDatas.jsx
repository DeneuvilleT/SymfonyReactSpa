import React, { useState } from "react";

import Datas from "./Datas/Datas";
import Addresses from "./Addresses/Addresses";

import styles from "./userDatas.styles.scss";

const UserDatas = ({ infos }) => {
  const [modif, setModif] = useState(false);

  return (
    <main className={styles.userDatas}>
      <section title="Modifier vos coordonnées" onClick={() => (!modif ? setModif(true) : setModif(false))}>
        <div>
          <h2>Bienvenue {infos.firstname}</h2>
          <Datas infos={infos} />
        </div>

        <Addresses infos={infos} />
      </section>
    </main>
  );
};

export default UserDatas;

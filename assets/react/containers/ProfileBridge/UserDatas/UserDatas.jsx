import React, { useState } from "react";

import Datas from "./Datas/Datas";
import UpdateDatas from "./Datas/UpdateDatas/UpdateDatas";
import Addresses from "./Addresses/Addresses";

import styles from "./userDatas.styles.scss";

const UserDatas = ({ infos }) => {
  const [modif, setModif] = useState(false);

  return (
    <main className={styles.userDatas}>
      <section title="Modifier vos coordonnées">
        <div>
          <h2>Bienvenue {infos.firstname}</h2>
          {!modif ? <Datas infos={infos} setModif={setModif} /> : <UpdateDatas infos={infos} />}
        </div>
        <Addresses infos={infos} />
      </section>
    </main>
  );
};

export default UserDatas;

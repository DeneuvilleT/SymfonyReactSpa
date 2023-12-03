import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";

import Datas from "./Datas/Datas";
import Addresses from "./Addresses/Addresses";

import styles from "./userDatas.styles.scss";

const UserDatas = ({ infos }) => {
  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");
  const [modif, setModif] = useState(false);
  const [pick, setPick] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update Datas User
  const updateDatas = async (e) => {
    e.preventDefault();

    if (e.target[1].value.replace(/ /g, "") === "") {
      e.target[1].value = infos.password;
    }

    const datas = {
      email: e.target[0].value.replace(/ /g, "") === "" ? infos.email : e.target[0].value,
      password: e.target[1].value.replace(/ /g, ""),
      firstname: e.target[2].value.charAt(0).replace(/ /, "") === "" ? infos.firstname : e.target[2].value,
      lastname: e.target[3].value.charAt(0).replace(/ /, "") === "" ? infos.lastname : e.target[3].value,
      address: e.target[4].value.charAt(0).replace(/ /, "") === "" ? infos.address : e.target[4].value,
      city: e.target[5].value.charAt(0).replace(/ /, "") === "" ? infos.city : e.target[5].value,
      zip_code: e.target[6].value === "" ? infos.zip_code : +e.target[6].value,
      phone: e.target[7].value.replace(/ /g, "") === "" ? infos.phone : +e.target[7].value,
    };

    if (infos.password === datas.password) delete datas.password;

    const res = await updateInfos(datas, infos.id, infos.token);
    if (res.status === 200) {
      setModif(false);

      const updateUser = res.data.newDatas;
      updateUser.token = infos.token;
    }
  };

  return (
    <main className={styles.userDatas}>
      <h2>Bienvenue {infos.firstname}</h2>

      <section title="Modifier vos coordonnées" onClick={() => (!modif ? setModif(true) : setModif(false))}>
        <Datas infos={infos} />
        <Addresses infos={infos} />
      </section>

      {errMsg === "" ? <></> : <p className="msg">{errMsg}</p>}
    </main>
  );
};

export default UserDatas;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";

import styles from "./userDatas.styles.scss";

const UserDatas = ({ isLog, infos }) => {

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

    // if (!e.target[1].value.replace(/ /g, "").match(valueOk)) {
    //   return notification(setMsg, 'Le mot de passe ne correspond pas aux exigences.');
    // };

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
      // dispatch(update(updateUser));
      // return notification(setMsg, res.data.msg);
    }
  };

  // Picture Profile
  // const changePicture = async () => {
  //   setPick(false);
  //   setLoading(true);

  //   const res = await addNewPicture(file.current.files[0], infos.id, infos.token);

  //   const updateUser = res.data.newDatas;
  //   updateUser.token = infos.token;
  //   // dispatch(update(updateUser));
  //   return setLoading(false);
  // };

  return (
    <main className={styles.userDatas}>
      {/* Banner */}

      <>
        <h1>Bienvenue sur ta page de profil {infos.firstname}</h1>
        <div>
          <figure>
            {!loading ? (
              <img
                src={infos.picture === "" ? noPicture : infos.picture}
                onClick={() => (!pick ? setPick(true) : setPick(false))}
                alt="photo de profil"
                title="Modifier votre photo de profil"
              />
            ) : (
              <Icon icon="svg-spinners:clock" width="100" height="100" />
            )}

            {/* <FontAwesomeIcon
                icon={faCamera}
                title="Modifier votre photo de profil"
                size="2x"
                onClick={() => (!pick ? setPick(true) : setPick(false))}
              /> */}

            {/* {pick ? <input onInput={() => changePicture()} ref={file} type="file" /> : <></>} */}
          </figure>
        </div>

        <div>
          <h4>vos coordonées</h4>
          <hr />
        </div>

        {/* Datas User */}

        {!modif ? (
          <section title="Modifier vos coordonnées" onClick={() => (!modif ? setModif(true) : setModif(false))}>
            <p>{infos.email}</p>
            <p>*************</p>
            <div>
              <p>{infos.firstname === null ? "Prénom non spécifié" : infos.firstname}</p>
              <p>{infos.lastname === null ? "Nom non spécifié" : infos.lastname}</p>
            </div>
            <p>{infos.address === null ? "Adresse non spécifié" : infos.address}</p>
            <div>
              <p>{infos.city === null ? "Ville non spécifié" : infos.city}</p>
              <p>{infos.zip_code === null ? "Code Postal non spécifié" : infos.zip_code}</p>
            </div>
            <p>{infos.phone === null ? "Téléphone non spécifié" : `0${infos.phone}`}</p>
          </section>
        ) : (
          <></>
          // Form Datas User
          // <AddForm
          //   onsubmit={(e) => updateDatas(e)}
          //   inputs={[
          //     { type: "text", placeholder: infos.email },
          //     { type: "password", placeholder: "**********" },
          //     { type: "text", placeholder: infos.firstname || "prénom" },
          //     { type: "text", placeholder: infos.lastname || "nom" },
          //     { type: "text", placeholder: infos.address || "adresse" },
          //     { type: "text", placeholder: infos.city || "ville" },
          //     { type: "number", placeholder: infos.zip_code || "code postal", min: 10000, max: 99999, minLength: 5 },
          //     { type: "phone", placeholder: infos.phone || "téléphone", minLength: 8 },
          //     { type: "submit", value: "Enregistrer" },
          //   ]}
          // />
        )}

        <em>{errMsg === "" ? null : errMsg}</em>
      </>

      {errMsg === "" ? <></> : <p className="msg">{errMsg}</p>}
    </main>
  );
};

export default UserDatas;

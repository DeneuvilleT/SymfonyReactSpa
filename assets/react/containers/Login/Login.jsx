import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { login } from "../../Store/slices/authSlices";

import styles from "./login.styles.scss";

const Login = ({ isLog }) => {
  const dispatch = useDispatch();

  const [msgErr, setMsgErr] = useState("");
  const [icone, setIcone] = useState("line-md:arrow-right-circle");
  const [canSave, setCanSave] = useState(false);
  const [formData, setFormData] = useState({
    _username: "",
    _password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setCanSave(Object.values(updatedFormData).every((val) => val !== "") ? true : false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canSave) {
      try {
        setIcone("svg-spinners:90-ring-with-bg");

        const formDatas = new FormData();
        formDatas.append("_username", formData._username);
        formDatas.append("_password", formData._password);

        const response = await axios.post("/api/v1/login", formDatas);

        if (response.status === 200) {
          const getToken = await axios.get("/api/v1/token");

          const { csrf_token, user } = JSON.parse(getToken.data);

          localStorage.setItem("TOKEN", csrf_token);
          dispatch(login(user));

          return (location.href = "/");
        }
      } catch (err) {
        setIcone("line-md:arrow-right-circle");
        return setMsgErr(JSON.parse(err.response.data).message);
      }
    }
  };

  return (
    <main className={styles.login}>
      {isLog ? (
        <div>
          <Icon icon="line-md:emoji-smile-wink" width="60" height="60" />
          <h2>Vous êtes déjà connecté</h2>
        </div>
      ) : (
        <>
          <h2>Connexion</h2>

          <form onSubmit={handleSubmit}>
            <input type="text" name="_username" id="username" value={formData._username} onChange={handleInputChange} />

            <input type="password" name="_password" value={formData._password} onChange={handleInputChange} />

            <span>{msgErr}</span>

            <button onClick={(e) => handleSubmit(e)} disabled={!canSave}>
              Se connecter <Icon icon={icone} color="white" width="30" height="30" />
            </button>
          </form>
        </>
      )}
    </main>
  );
};

export default Login;

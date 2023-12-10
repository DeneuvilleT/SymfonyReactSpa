import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../Store/slices/authSlices";

import styles from "./login.styles.scss";

const Login = ({ isLog }) => {
  const dispatch = useDispatch();
  const naigate = useNavigate();

  const [msgErr, setMsgErr] = useState("");
  const [icone, setIcone] = useState("line-md:arrow-right-circle");
  const [canSave, setCanSave] = useState(false);
  const [formData, setFormData] = useState({
    _email: "",
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

        const response = await axios.post("/api/login_check", {
          email: formData._email,
          password: formData._password,
        });

        if (response.status === 200) {          
          dispatch(login(response.data ));
          return naigate("/");
        } else {
          return setMsgErr(response.data.message);
        }
      } catch (err) {
        setIcone("line-md:arrow-right-circle");
        return setMsgErr(err.response.data.message);
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
            <input type="email" name="_email" value={formData._email} onChange={handleInputChange} />

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

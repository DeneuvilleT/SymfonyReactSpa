import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Store/slices/authSlices";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    _username: "",
    _password: "",
  });
  const [msgErr, setMsgErr] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDatas = new FormData();
      formDatas.append("_username", formData._username);
      formDatas.append("_password", formData._password);

      const response = await axios.post("/api/login", formDatas);

      if (response.status === 200) {
        const getToken = await axios.get("/api/token");

        const { csrf_token, user } = JSON.parse(getToken.data);

        window.scrollTo(0, 0);

        localStorage.setItem("TOKEN", csrf_token);
        dispatch(login(user));

        navigate("/");
        return location.reload();
      }
    } catch (err) {
      return setMsgErr(JSON.parse(err.response.data).message);
    }
  };

  return (
    <main>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="_username"
          id="username"
          value={formData._username}
          onChange={handleInputChange}
        />
        <span>{msgErr}</span>
        <input
          type="password"
          name="_password"
          value={formData._password}
          onChange={handleInputChange}
        />
        <input type="submit" value="OK" />
      </form>
    </main>
  );
};

export default Login;

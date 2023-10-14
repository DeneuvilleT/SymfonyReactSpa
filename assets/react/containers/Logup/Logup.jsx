import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./logup.styles.scss";

const Logup = () => {
  const navigate = useNavigate();

  const [msgsErr, setMsgsErr] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/register", formData);
      setMsgsErr([]);
      return navigate("/");
    } catch (err) {
      return setMsgsErr([...JSON.parse(err.response.data).errors]);
    }
  };

  return (
    <main className={styles.logup}>
      <h2>Bienvenue</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input type="submit" value="OK" />
      </form>
      <ul>
        {msgsErr.length > 0 && (
          <div className="error-messages">
            {msgsErr.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}
      </ul>
    </main>
  );
};

export default Logup;

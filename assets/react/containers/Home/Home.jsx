import React, { useState, useEffect } from "react";
import styles from "./home.styles.scss";
import axios from "axios";

const Home = () => {
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
      const response = await axios.post("/api/register", formData);
      console.log(JSON.parse(response.data));
      return [...response.data];
    } catch (err) {
      return console.error(err.message);
    }
  };

  return (
    <main className={styles.home}>
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
    </main>
  );
};

export default Home;

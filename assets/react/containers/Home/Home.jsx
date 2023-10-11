import React from "react";
import styles from "./home.styles.scss";

const Home = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <main className={styles.home}>
      <h2>Bienvenue</h2>
      <form action="/api/register" method="post">
        <input type="text" name="firstname" />
        <input type="text" name="lastname" />
        <input type="password" name="password" />
        <input type="email" name="email" />
        <input type="submit" value="ok" />
      </form>
    </main>
  );
};

export default Home;

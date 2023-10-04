import React from "react";
import Counter from "../../Store/features/counter/Counter";
import styles from "./home.styles.scss";

const Home = () => {
  return (
    <main className={styles.home}>
      <h2>Bienvenue</h2>
      <Counter/>
    </main>
  );
};

export default Home;

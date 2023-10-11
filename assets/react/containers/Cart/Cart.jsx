import React from "react";
import Counter from "../../Store/features/counter/Counter";
import styles from "./cart.styles.scss";

const Cart = () => {
  return (
    <main className={styles.cart}>
      <h2>Panier</h2>
      <Counter/>
    </main>
  );
};

export default Cart;

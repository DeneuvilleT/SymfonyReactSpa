import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { addToCart } from "../../Store/slices/cartSlices";

import styles from "./btnAdd.styles.scss";

const BtnAdd = ({ product }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.preventDefault();
    return dispatch(addToCart({ product: product, quantity: quantity }));
  };

  const handleAddQuantity = (e) => {
    e.preventDefault();
    return setQuantity(quantity < product.stock ? quantity + 1 : quantity);
  };

  const handleLessQuantity = (e) => {
    e.preventDefault();
    return setQuantity(quantity > 1 ? quantity - 1 : quantity);
  };

  /**
   * Gérer le cummul d'un stock d'article ajouté au panier vie le quickview
   */

  return (
    <aside className={styles.btnAdd}>
      {product.stock !== 0 ? (
        <section>
          <Icon
            icon="mdi:cart-arrow-down"
            color="white"
            width="35"
            height="35"
            style={{ marginTop: "5px" }}
            onClick={(e) => handleAddToCart(e)}
          />

          <div>
            <Icon
              icon="line-md:plus-circle"
              color="white"
              width="27.5"
              height="27.5"
              onClick={(e) => handleAddQuantity(e)}
            />
            <p>{quantity}</p>
            <Icon
              icon="line-md:minus-circle"
              color="white"
              width="27.5"
              height="27.5"
              onClick={(e) => handleLessQuantity(e)}
            />
          </div>
        </section>
      ) : (
        <aside>
          <p>Stock épuisé</p>
        </aside>
      )}
    </aside>
  );
};

export default BtnAdd;

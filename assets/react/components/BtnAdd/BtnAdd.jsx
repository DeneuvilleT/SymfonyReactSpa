import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { addToCart } from "../../Store/slices/cartSlices";

import styles from "./btnAdd.styles.scss";

const BtnAdd = ({ product }) => {
  const { cart } = useSelector((state) => ({ ...state.cart }));

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(true);

  useEffect(() => {
    checkStock();
  }, [stock, handleAddToCart]);

  const handleAddToCart = (e) => {
    e.preventDefault();

    dispatch(addToCart({ product: product, quantity: quantity }));
    return checkStock();
  };

  /**
   * Faire que la quantité possible du quickAdd s'adapte à la quantité du produit déjà dans le panier
   */

  const checkStock = () => {
    const index = cart.findIndex((item) => item.id === product.id);

    if (index >= 0 && quantity + cart[index].item_quantity >= product.stock) {
      return setStock(false);
    } else if (quantity >= product.stock) {
      return setStock(false);
    }
  };

  const handleAddQuantity = (e) => {
    e.preventDefault();
    return setQuantity(quantity < product.stock ? quantity + 1 : quantity);
  };

  const handleLessQuantity = (e) => {
    e.preventDefault();
    return setQuantity(quantity > 1 ? quantity - 1 : quantity);
  };

  return (
    <>
      {product.stock === 0 ? (
        <aside className={styles.btnAdd_outStock}>
          <p>Stock épuisé</p>
        </aside>
      ) : stock ? (
        <aside className={styles.btnAdd}>
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
        </aside>
      ) : (
        <aside className={styles.btnAdd_cartStock}>
          <p>Stock dans votre panier</p>
        </aside>
      )}
    </>
  );
};

export default BtnAdd;

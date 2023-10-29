import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { addToCart } from "../../Store/slices/cartSlices";

import styles from "./btnAdd.styles.scss";

const BtnAdd = ({ product }) => {
  const { cart } = useSelector((state) => ({ ...state.cart }));

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);
  const [stockAvailable, setStockAvailable] = useState(product.stock);
  const [maxStockAvailable, setMaxStockAvailable] = useState(null);
  const [stock, setStock] = useState(true);

  useEffect(() => {
    checkStock();
  }, [stock, handleAddToCart]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      dispatch(addToCart({ product: product, quantity: quantity }));
      setQuantity(0);
      /**
       * ATTENTION - Quand il ne reste que 1 de possible en quantité posssiblke alors 0 en stockInitial
       * Gérer le panier par cookie
       */
      // setMaxStockAvailable(stockAvailable);
      return checkStock();
    }
  };

  const checkAvalaibleStock = () => {
    // L'initial stock doit être la différence qu'il y aentre le stock disponible du produit et la quantité déjà présente dans le panier
    const index = cart.findIndex((item) => item.id === product.id);
    if (index >= 0 && product.stock !== 0) {
      const newAvailableStock = product.stock - cart[index].item_quantity;
      setMaxStockAvailable(newAvailableStock);
      return setStockAvailable(newAvailableStock);
    }
  };

  const checkStock = () => {
    const index = cart.findIndex((item) => item.id === product.id);

    if (index >= 0 && quantity + cart[index].item_quantity >= product.stock) {
      setStock(false);
    } else if (quantity >= product.stock) {
      setStock(false);
    }
    return checkAvalaibleStock();
  };

  const handleAddQuantity = (e) => {
    e.preventDefault();

    if (quantity < product.stock) {
      if (maxStockAvailable === null) {
        setQuantity(quantity < product.stock ? quantity + 1 : quantity);
        return setStockAvailable(
          quantity < product.stock ? stockAvailable - 1 : stockAvailable
        );
      } else {
        if (
          (quantity <= stockAvailable && quantity < maxStockAvailable) ||
          (quantity >= stockAvailable && quantity < maxStockAvailable)
        ) {
          setQuantity(quantity + 1);
          return setStockAvailable(stockAvailable - 1);
        }
      }
    }
  };

  const handleLessQuantity = (e) => {
    e.preventDefault();
    setQuantity(quantity >= 1 ? quantity - 1 : quantity);
    return setStockAvailable(
      quantity >= 1 ? stockAvailable + 1 : stockAvailable
    );
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

            <p style={{ fontSize: "1.5em" }}>
              / {stockAvailable}{" "}
              <span style={{ fontWeight: "400" }}>dispo</span>
            </p>
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

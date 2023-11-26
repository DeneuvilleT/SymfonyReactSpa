import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { addToCart } from "../../../Store/slices/cartSlices";

import styles from "./btnAdd.styles.scss";

const BtnAdd = ({ product, list }) => {
  const { cart } = useSelector((state) => ({ ...state.cart }));

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);
  const [stockAvailable, setStockAvailable] = useState(product.stock);
  const [maxStockAvailable, setMaxStockAvailable] = useState(null);
  const [stock, setStock] = useState(true);

  const index = cart.findIndex((item) => item.id === product.id);

  useEffect(() => {
    checkStock();
  }, [stock, handleAddToCart]);

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (quantity > 0) {
      dispatch(addToCart({ product: product, quantity: quantity }));
      setQuantity(0);

      return checkStock();
    }
  };

  const checkStock = () => {
    if ((index >= 0 && quantity + cart[index].item_quantity >= product.stock) || quantity >= product.stock) {
      setStock(false);
    }

    if (index !== -1) return checkAvalaibleStock();
  };

  const checkAvalaibleStock = () => {
    if (index >= 0 && product.stock !== 0) {
      const newAvailableStock = product.stock - cart[index].item_quantity - quantity;
      setMaxStockAvailable(newAvailableStock);

      return setStockAvailable(newAvailableStock);
    }
  };

  const handleAddQuantity = (e) => {
    e.preventDefault();

    if (quantity < product.stock) {
      if (maxStockAvailable === null) {
        setQuantity(quantity < product.stock ? quantity + 1 : quantity);
        return setStockAvailable(quantity < product.stock ? stockAvailable - 1 : stockAvailable);
      } else {
        if ((quantity <= stockAvailable && quantity < maxStockAvailable) || (quantity >= stockAvailable && quantity < maxStockAvailable)) {
          setQuantity(quantity + 1);
          return setStockAvailable(stockAvailable - 1);
        }
      }
    }
  };

  const handleLessQuantity = (e) => {
    e.preventDefault();
    setQuantity(quantity >= 1 ? quantity - 1 : quantity);
    return setStockAvailable(quantity >= 1 ? stockAvailable + 1 : stockAvailable);
  };

  return (
    <>
      {product.stock === 0 ? (
        <aside className={list ? styles.btnAdd_outStock : styles.btnAddProduct_outStock}>
          <p>Stock épuisé</p>
        </aside>
      ) : stock ? (
        <aside className={list ? styles.btnAdd : styles.btnAddProduct}>
          <section>
            {list ? (
              <Icon
                icon="mdi:cart-arrow-down"
                color={list ? "white" : "black"}
                width="35"
                height="35"
                style={{ marginTop: "5px" }}
                onClick={(e) => handleAddToCart(e)}
              />
            ) : (
              <>
                <button onClick={(e) => handleAddToCart(e)}>
                  Ajouter au panier
                  <Icon icon="mdi:cart-arrow-down" color="white" width="35" height="35" />
                </button>
              </>
            )}

            <div>
              <Icon
                icon="line-md:plus-circle"
                color={list ? "white" : "black"}
                width={list ? "27.5" : "40"}
                height={list ? "27.5" : "40"}
                onClick={(e) => handleAddQuantity(e)}
              />
              <p>{quantity}</p>
              <Icon
                icon="line-md:minus-circle"
                color={list ? "white" : "black"}
                width={list ? "27.5" : "40"}
                height={list ? "27.5" : "40"}
                onClick={(e) => handleLessQuantity(e)}
              />
            </div>

            {list ? (
              <p style={{ fontSize: "1.5em" }}>
                / {stockAvailable} <span style={{ fontWeight: "400" }}>dispo</span>
              </p>
            ) : (
              <></>
            )}
          </section>
        </aside>
      ) : (
        <aside className={list ? styles.btnAdd_cartStock : styles.btnAddProduct_cartStock}>
          {list ? (
            <p>En stock dans votre panier</p>
          ) : (
            <Link title="Votre panier" to={"/cart"}>
              Tout le stock disponible vous attend déjà dans votre panier
            </Link>
          )}
        </aside>
      )}
    </>
  );
};

export default BtnAdd;

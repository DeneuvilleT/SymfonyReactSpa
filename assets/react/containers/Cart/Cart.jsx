import {
  removeToCart,
  lessQuantity,
  addQuantity,
  clearCart,
  priceTotal,
} from "../../Store/slices/cartSlices";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./cart.styles.scss";

const Cart = ({ infos, isLog }) => {
  const { cart, cartTotal } = useSelector((state) => ({ ...state.cart }));

  const dispatch = useDispatch();

  const [free, setFree] = useState(false);
  const [tax, setTax] = useState(6.5);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    dispatch(priceTotal());
  }, [cart, dispatch]);

  useEffect(() => {
    cartTotal >= 50
      ? (setFree(true), setTax(0))
      : (setTax(6.5), setFree(false));
  }, [cartTotal]);

  const checkout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/v1/stripe/checkout",
        JSON.stringify(cart)
      );
      console.log(response);

      if (response.status === 200) {
        const session = response.data;
        window.location.href = session.url;
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      } else {
        console.error("Erreur lors de la création de la session de paiement");
      }
    } catch (error) {
      console.log(error.response.data.message, error);
    }
  };

  return (
    <main className={styles.cart}>
      <h1>Récapitulatif de votre panier</h1>
      {cart.length === 0 ? (
        <section>
          <h2>Votre panier est vide.</h2>
        </section>
      ) : (
        <>
          {/* Diplay Items */}

          <section>
            <section>
              {cart?.map((item) => (
                <article key={item.id}>
                  <Link to={`/product/${item.id}`}>{item.title}</Link>
                  <div>
                    {/* Add / Less Quantity Item */}
                    <div>
                      <button
                        onClick={() => {
                          dispatch(lessQuantity(item));
                          // ;
                          // notification(setMsg, "Vous avez retiré un article.");
                        }}
                      >
                        -
                      </button>

                      <p>{item.item_quantity}</p>

                      <button
                        onClick={() => {
                          dispatch(addQuantity(item));
                          // ;
                          // notification(setMsg, "Vous avez ajouté un article.");
                        }}
                      >
                        +
                      </button>
                    </div>

                    <p>{(Number(item.priceUnit) / 100).toFixed(2)} €</p>

                    {/* Delete Item */}
                    <div>
                      <button
                        onClick={() => {
                          dispatch(removeToCart(item));
                          //   ;
                          //   notification(
                          //     setMsg,
                          //     `Vous avez retiré
                          //                ${item.product_name
                          //                  .charAt(0)
                          //                  .toUpperCase()}${item.product_name.slice(
                          //       1
                          //     )} à votre panier.`
                          //   );
                        }}
                      >
                        Supprimer l'article
                      </button>

                      <p>
                        {(
                          (Number(item.priceUnit) / 100) *
                          item.item_quantity
                        ).toFixed(2)}{" "}
                        €
                      </p>
                    </div>
                  </div>
                </article>
              ))}

              {/* Clear Cart */}
              <button
                onClick={() => {
                  dispatch(clearCart());
                  // ;
                  // notification(setMsg, "Votre panier a été vidé.");
                }}
              >
                Vider le panier
              </button>
            </section>

            {/* Price / Infos */}

            <section>
              <aside>
                <h4>
                  Vos achats<span>{cartTotal.toFixed(2)} €</span>
                </h4>
                <h4>
                  Livraison
                  {!free ? (
                    <span>{tax.toFixed(2)} €</span>
                  ) : (
                    <span style={{ color: "green", letterSpacing: "1px" }}>
                      offerte !
                    </span>
                  )}
                </h4>
                <hr />
                <h4>
                  Total<span>{(cartTotal + tax).toFixed(2)} €</span>
                </h4>

                {isLog ? (
                  <>
                    <button onClick={(e) => checkout(e)}>
                      Valider le panier
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <Link to={"/customer/login"}>
                      Vous devez être connecté pour finaliser votre achat
                    </Link>
                    <h2>Total {cartTotal.toFixed(2)} €</h2>{" "}
                  </>
                )}
              </aside>

              <aside>
                <div>
                  <p>Livraison en 24h</p>
                </div>
                <div>
                  <p>Frais de port offerts à partir de 50 €</p>
                </div>
                <div>
                  <p>Paiement sécurisé</p>
                </div>
              </aside>
            </section>
          </section>
        </>
      )}
    </main>
  );
};

export default Cart;

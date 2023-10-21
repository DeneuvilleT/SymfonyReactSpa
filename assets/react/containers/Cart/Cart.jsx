import {
  removeToCart,
  lessQuantity,
  addQuantity,
  clearCart,
  priceTotal,
} from "../../Store/slices/cartSlices";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { notification } from '../../utilities/index';
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

// import Checkout from '../CheckOut/CheckOut';
import styles from "./cart.styles.scss";

const Cart = ({ infos, isLog }) => {
  const { cart, cartTotal } = useSelector((state) => ({ ...state.cart }));

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //    const [clientSecret, setClientSecret] = useState("");
  //    const options = {
  //       clientSecret,
  //       appearance: { theme: "stripe" }
  //    };

  const [free, setFree] = useState(false);
  const [tax, setTax] = useState(6.5);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    dispatch(priceTotal());
  }, [cart, dispatch]);

  useEffect(() => {
    if (cartTotal >= 50) {
      setFree(true);
      setTax(0);
    } else {
      setTax(6.5);
      setFree(false);
    }
  }, [cartTotal]);

  //    useEffect(() => {
  //       setTimeout(() => {
  //          if (location.key === 'default') {
  //             navigate('/cart');
  //             window.location.href = "/#/cart";
  //          };
  //       }, 500)
  //    }, [infos]);

  //    const payment = async () => {
  //       if (infos.address === null || infos.city === null || infos.zip_code === null) {
  //          return notification(setMsg, 'Vous devez compléter votre adresse dans votre page profil.');
  //       };

  //       const pay = await sendPay(!free ? (cartTotal + tax).toFixed(2) : cartTotal.toFixed(2));
  //       return setClientSecret(pay.data.clientSecret);
  //    };

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
                  <Link to={`/product/detail/${item.id}`}>
                    {item.product_name} &nbsp; {item.percent.toFixed(2)} %
                  </Link>
                  <div>
                    {/* Add / Less Quantity Item */}
                    <div>
                      <button
                        onClick={() => {
                          dispatch(lessQuantity(item));
                          notification(setMsg, "Vous avez retiré un article.");
                        }}
                      >-</button>
                      <p>{item.item_quantity}</p>
                      <button
                        icon={faPlusSquare}
                        onClick={() => {
                          dispatch(addQuantity(item));
                          notification(setMsg, "Vous avez ajouté un article.");
                        }}
                        >+</button>
                    </div>

                    <p>{item.price.toFixed(2)} €</p>

                    {/* Delete Item */}
                    <div>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        size="2x"
                        onClick={() => {
                          dispatch(removeToCart(item));
                          notification(
                            setMsg,
                            `Vous avez retiré 
                                       ${item.product_name
                                         .charAt(0)
                                         .toUpperCase()}${item.product_name.slice(
                              1
                            )} à votre panier.`
                          );
                        }}
                      />
                      <p>{(item.price * item.item_quantity).toFixed(2)} €</p>
                    </div>
                  </div>
                </article>
              ))}

              {/* Clear Cart */}
              <button
                onClick={() => {
                  dispatch(clearCart());
                  notification(setMsg, "Votre panier a été vidé.");
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
                    {" "}
                    <button
                      onClick={() => {
                        payment();
                        window.scrollTo(0, 1650);
                      }}
                    >
                      Valider le panier
                    </button>{" "}
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
      <form action={`/api/stripe/product/${product.id}`} method="get">
        <input type="submit" value="Acheter" />
      </form>
    </main>
  );
};

export default Cart;

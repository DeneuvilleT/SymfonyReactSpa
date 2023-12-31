import { clearCart, priceTotal } from "../../Store/slices/cartSlices";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./cart.styles.scss";
import CartLineItem from "../../components/Cart/CartLineItem/CartLineItem";

const Cart = ({ infos, isLog }) => {
  const { cart, cartTotal } = useSelector((state) => ({ ...state.cart }));
  const token = localStorage.getItem(`${location.origin}_bear_token`);

  const dispatch = useDispatch();

  const [icone, setIcone] = useState("line-md:confirm-circle");
  const [free, setFree] = useState(false);
  const [tax, setTax] = useState(6.5);

  useEffect(() => {
    dispatch(priceTotal());
  }, [cart, dispatch]);

  useEffect(() => {
    cartTotal >= 50 ? (setFree(true), setTax(0)) : (setTax(6.5), setFree(false));
  }, [cartTotal]);

  const checkout = async () => {
    setIcone("svg-spinners:90-ring-with-bg");
    try {
      const response = await axios.post(`/api/v1/stripe/checkout/${infos.uid}`, JSON.stringify(cart), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        window.location.href = response.data;
      } else {
        console.error("Erreur lors de la création de la session de paiement");
      }
    } catch (error) {
      console.log(error.response.data.message, error);
    }
  };

  return (
    <main className={styles.cart}>
      {cart.length === 0 ? (
        <section>
          <h2>
            <Icon icon="line-md:emoji-frown-open" color="#333" width="60" height="60" /> Votre panier est vide.
          </h2>
        </section>
      ) : (
        <section>
          {cart?.map((item) => (
            <CartLineItem item={item} key={item.id} />
          ))}

          <div className={styles.resume_price}>
            <p>
              Livraison :&nbsp;
              {!free ? <span>{tax.toFixed(2)} €</span> : <span style={{ color: "green", letterSpacing: "1px" }}>offerte !</span>}
            </p>

            <p>
              Vos achats : <span>{cartTotal.toFixed(2)} €</span>
            </p>

            <p>
              Total TTC : <span>{(cartTotal + tax).toFixed(2)} €</span>
            </p>
          </div>

          <div className={styles.resume_price}>
            <button style={{ backgroundColor: "rgb(185, 0, 0)" }} onClick={() => dispatch(clearCart())}>
              Vider le panier <Icon icon="line-md:close-circle" color="white" width="30" height="30" />
            </button>

            <Link style={{ backgroundColor: "#444" }} to={"/"}>
              Continuer vos achats <Icon icon="line-md:play-filled-to-pause-transition" color="white" width="30" height="30" />
            </Link>

            {isLog ? (
              <button onClick={checkout}>
                Valider le panier <Icon icon={icone} color="white" width="30" height="30" />
              </button>
            ) : (
              <>
                <Link to={"/login"}>Vous devez être connecté pour finaliser votre achat</Link>
              </>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Cart;

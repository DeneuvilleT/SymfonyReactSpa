import React from "react";
import { Icon } from "@iconify/react";
import { removeToCart, lessQuantity, addQuantity } from "../../../Store/slices/cartSlices";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./cartLineItem.styles.scss";

const CartLineItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <article className={styles.cartLineItem}>
      <div>
        <Link to={`/product/${item.id}`} title={item.title}>
          {item.title}
        </Link>
        <img src={`${location.origin}/uploads/images/${item.cover}`} alt={item.title} />
      </div>
      {/*  */}
      <div className={styles.move_quantity}>
        <p>Prix unitaire : </p>
        {/*  */}
        <p>{(Number(item.priceUnit) / 100).toFixed(2)} €</p>
        <div>
          <Icon icon="line-md:minus-circle" onClick={() => dispatch(lessQuantity(item))} />
          {/*  */}
          <p>{item.item_quantity}</p>
          {/*  */}
          <Icon icon="line-md:plus-circle" onClick={() => dispatch(addQuantity(item))} />
        </div>
      </div>

      <div className={styles.move_quantity}>
        {/*  */}
        <p>{((Number(item.priceUnit) / 100) * item.item_quantity).toFixed(2)} €</p>
      </div>
      {/*  */}
      <Icon icon="line-md:cancel" onClick={() => dispatch(removeToCart(item))} />
    </article>
  );
};

export default CartLineItem;

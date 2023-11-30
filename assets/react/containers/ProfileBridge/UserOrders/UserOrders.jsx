import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./userOrders.styles.scss";
import { fetchOrders, getAllOrders, getOrdersErrors, getOrdersStatus } from "../../../Store/slices/ordersSlices";

const UserOrders = ({ infos }) => {
  const dispatch = useDispatch();

  const allOrders    = useSelector(getAllOrders);
  const ordersStatus = useSelector(getOrdersStatus);
  const ordersErrors = useSelector(getOrdersErrors);

  const [errMsg, setErrMsg] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (ordersStatus === "idle" && infos.id) {
      dispatch(fetchOrders(infos.id));
    }
  }, [ordersStatus, dispatch, infos]);

  useEffect(() => {
    if (ordersStatus === "succeeded") {
      setOrders([...allOrders]);
    } else if (ordersStatus === "failed") {
      setErrMsg(ordersErrors);
    }
  }, [ordersStatus, dispatch]);

  return (
    <main className={styles.userOrders}>
      <h4>Vos commandes</h4>
      <button onClick={() => console.log(orders)}>Test</button>

      {/* <section>
        {orders.length ? (
          orders?.map((order) => (
            <article key={order.id}>
              <h3>Commande numéro : {order.id}</h3>
              <p>{order.status}</p>
            </article>
          ))
        ) : (
          <h2>Vous n'avez pas encore passé de commande.</h2>
        )}
      </section> */}
      <p>{errMsg}</p>
    </main>
  );
};

export default UserOrders;

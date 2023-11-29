import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import styles from "./userOrders.styles.scss";

const UserOrders = ({ infos, isLog }) => {

  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    isLog ? getOrders() : null;
  }, [isLog]);

  const getOrders = async () => {

    const response = await axios.post("/api/v1/load_orders", infos.id);

    console.log(response);
  };

  return (
    <main className={styles.userOrders}>
      <h4>Vos commandes</h4>

      <section>
        {orders.length ? (
          orders?.map((order) => (
            <article key={order.id}>
              <h3>Commande numéro : {order.id}</h3>
              <p>{order.status}</p>
              {/* <p>{dayjs(order.order_date).format("DD MMM YYYY")}</p> */}
            </article>
          ))
        ) : (
          <h2>Vous n'avez pas encore passé de commande.</h2>
        )}
      </section>
    </main>
  );
};

export default UserOrders;

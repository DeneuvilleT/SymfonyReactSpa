import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Icon } from "@iconify/react";
import { parseISO, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

import Order from "./Order/Order";
import Status from "./Status/Status";
import styles from "./userOrders.styles.scss";

import { fetchOrders, getAllOrders, getOrdersErrors, getOrdersStatus } from "../../../Store/slices/ordersSlices";

const UserOrders = ({ infos }) => {
  const dispatch = useDispatch();

  const allOrders    = useSelector(getAllOrders);
  const ordersStatus = useSelector(getOrdersStatus);
  const ordersErrors = useSelector(getOrdersErrors);

  const [errMsg, setErrMsg] = useState("");
  const [orders, setOrders] = useState([]);
  const [show,     setShow] = useState({});

  useEffect(() => {
    if (ordersStatus === "idle" && infos.uid) {
      dispatch(fetchOrders(infos.uid));
    }
  }, [ordersStatus, dispatch, infos]);

  useEffect(() => {
    if (ordersStatus === "succeeded") {
      setOrders([...allOrders]);
    } else if (ordersStatus === "failed") {
      setErrMsg(ordersErrors);
    }
  }, [ordersStatus, dispatch]);

  switch (ordersStatus) {
    
    case "loading":
      return <Icon style={{ marginTop: "150px" }} icon="svg-spinners:blocks-shuffle-3" width="150" height="150" />;

    case "succeeded":
      return (
        <main className={styles.userOrders}>
          <h2>Vos commandes</h2>

          <section>
            {orders.length ? (
              orders?.map((order) => (
                <article
                  key={order.id}
                  onClick={() => {
                    setShow({ ...show, [order.id]: show[order.id] ? false : true });
                  }}
                >
                  <div>
                    <h4>{order.name}</h4>
                    <p>{(Number(order.amount) / 100).toFixed(2)} €</p>
                  </div>
                  <div>
                    <Status status={order.status[0]} />
                    <p>{formatDistanceToNow(parseISO(order.date), { locale: fr })}</p>
                  </div>
                  <Order linesOrder={order.lines_orders} display={show[order.id]} />
                </article>
              ))
            ) : (
              <h3>
                <Icon icon="line-md:emoji-frown-open" color="#333" width="60" height="60" /> Vous n'avez pas encore passé de commmande.
              </h3>
            )}
          </section>
        </main>
      );

    case "failed":
      return <p>{errMsg}</p>;
  }
};

export default UserOrders;

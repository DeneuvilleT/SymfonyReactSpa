import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { parseISO, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

import styles from "./userComments.styles.scss";

import { fetchComments, getAllComments, getCommentsErrors, getCommentsStatus } from "../../../Store/slices/commentsSlices";

const UserComments = ({ infos }) => {
  const dispatch = useDispatch();

  const allComments    = useSelector(getAllComments);
  const commentsStatus = useSelector(getCommentsStatus);
  const commentsErros  = useSelector(getCommentsErrors)

  const [errMsg,     setErrMsg] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (commentsStatus === "idle" && infos.id) {
      dispatch(fetchComments(infos.id));
    }
  }, [commentsStatus, dispatch, infos]);

  useEffect(() => {
    if (commentsStatus === "succeeded") {
      setComments([...allComments]);
    } else if (commentsStatus === "failed") {
      setErrMsg(commentsErros);
    }
  }, [commentsStatus, dispatch]);

  return (
    <main className={styles.userComments}>
      <h4>Vos commandes</h4>
      <button onClick={() => console.log(comments)}>Test</button>
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

export default UserComments;

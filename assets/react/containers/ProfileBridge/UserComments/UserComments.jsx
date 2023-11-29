import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { parseISO, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

import axios from "axios";
import styles from "./userComments.styles.scss";

const UserComments = ({ infos, isLog }) => {

  const dispatch = useDispatch();

  const [errMsg,     setErrMsg] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    isLog ? getComments() : null;
  }, [isLog]);

  const getComments = async () => {
    try {
      const response = await axios.post("/api/v1/comments/load_comments", infos.id);
      return setComments([...response.data]);
    } catch (error) {
      console.error(error);
      return setErrMsg(error.message);
    }
  };

  return (
    <main className={styles.userComments}>
      <h4>Vos commenatires</h4>

      <section>
        {comments.length ? (
          comments?.map((comment) => (
            <article key={comment.id}>
              <h3>Commentaire numéro : {comment.id}</h3>
              <p>{formatDistanceToNow(parseISO(comment.date), { locale: fr })}</p>
            </article>
          ))
        ) : (
          <h2>Vous n'avez pas encore posté de commentaire.</h2>
        )}
      </section>
    </main>
  );
};

export default UserComments;

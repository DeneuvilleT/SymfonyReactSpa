import React, { useState, useEffect } from "react";
import BtnDelete from "../../../components/BtnDelete/BtnDelete";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";
import { parseISO, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

import styles from "./userComments.styles.scss";

import { fetchComments, getAllComments, getCommentsErrors, getCommentsStatus } from "../../../Store/slices/commentsSlices";

const UserComments = ({ infos }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allComments = useSelector(getAllComments);
  const commentsStatus = useSelector(getCommentsStatus);
  const commentsErros = useSelector(getCommentsErrors);

  const [errMsg, setErrMsg] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (commentsStatus === "idle" && infos.uid) {
      dispatch(fetchComments(infos.uid));
    }
  }, [commentsStatus, dispatch, infos]);

  useEffect(() => {
    if (commentsStatus === "succeeded") {
      setComments([...allComments]);
    } else if (commentsStatus === "failed") {
      setErrMsg(commentsErros);
    }
  }, [commentsStatus, dispatch]);

  switch (commentsStatus) {
    case "loading":
      return <Icon style={{ marginTop: "150px" }} icon="svg-spinners:blocks-shuffle-3" width="150" height="150" />;

    case "succeeded":
      return (
        <main className={styles.userComments}>
          <h2>Vos commentaires</h2>

          <section>
            {comments.length ? (
              comments?.map((comment) => (
                <article key={comment.id}>
                  <div>
                    <span>{comment.id}</span>
                    <h4>{comment.title}</h4>
                  </div>
                  <p style={{ height: "65px", overflowY: "auto" }}>{comment.content}</p>

                  <button onClick={() => navigate(`/product/${comment.productId}`)}>{comment.product}</button>

                  <div>
                    <p>{formatDistanceToNow(parseISO(comment.date), { locale: fr })}</p>
                    <p>
                      <strong>{comment.author}</strong>
                    </p>
                  </div>
                  <BtnDelete objet={"ce commentaire"} url={`/api/v1/comments/delete_comment/${comment.id}`} />
                </article>
              ))
            ) : (
              <h3>
                <Icon icon="line-md:emoji-frown-open" color="#333" width="60" height="60" /> Vous n'avez pas encore posté de commentaire.
              </h3>
            )}
          </section>
        </main>
      );

    case "failed":
      return <p>{errMsg}</p>;
  }
};

export default UserComments;

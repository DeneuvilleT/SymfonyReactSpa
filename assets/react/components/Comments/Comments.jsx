import React from "react";

import Comment from "./Comment/Comment";
import styles from "./comments.styles.scss";

const Comments = ({ comments }) => {
  const orderedComments = comments ? comments.slice().sort((a, b) => b.date.localeCompare(a.date)) : null;

  if (orderedComments !== null) {
    return (
      <section className={styles.comments}>
        <h2>
          <span></span> Commentaires <span></span>
        </h2>

        {orderedComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </section>
    );
  }
};

export default Comments;

import React, { Fragment } from "react";

import { parseISO, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Icon } from "@iconify/react";

import styles from "./comment.styles.scss";

const Comment = ({ comment }) => {
  const timeAgo = comment.date ? formatDistanceToNow(parseISO(comment.date), { locale: fr }) : "";

  return (
    <article className={styles.comment}>
      <Icon icon="line-md:github-twotone" width="120" height="100" />
      <div>
        <h3>{comment.title}</h3>

        <Fragment>
          <p dangerouslySetInnerHTML={{ __html: comment.content }} />
        </Fragment>

        <p>
          <span>
            <strong>{comment.author}</strong>
          </span>
          <span>
            il y a <i>{timeAgo}</i>
          </span>
        </p>
      </div>
    </article>
  );
};

export default Comment;

import React from "react";
import { reactionAdded } from "../../Store/slices/postSlices";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";

import styles from "./emoji.styles.scss";

const reactions = {
  thumbsUp: <Icon icon="twemoji:thumbs-up" />,
  wow: <Icon icon="twemoji:face-with-open-mouth" />,
  heart: <Icon icon="twemoji:beating-heart" />,
  rocket: <Icon icon="twemoji:rocket" />,
  coffee: <Icon icon="twemoji:face-savoring-food" />,
};

const ReactionsBoutons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionsBoutons = Object.entries(reactions).map(([name, emoji]) => {
    return (
      <button
        key={name}
        className={styles.emoji}
        type="button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionsBoutons}</div>;
};

export default ReactionsBoutons;

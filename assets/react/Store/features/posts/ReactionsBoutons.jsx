import React from "react";
import { reactionAdded } from "../../slices/postSlices";
import { useDispatch } from "react-redux";

const reactions = {
  thumbsUp: ":p",
  wow: "o:",
  heart: "<3",
  rocket: "==>",
  coffee: "up",
};

const ReactionsBoutons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionsBoutons = Object.entries(reactions).map(([name, emoji]) => {
    return (
      <button
        key={name}
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

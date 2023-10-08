import React from "react";
import { useSelector } from "react-redux";

const PostAuthor = ({ userId }) => {
  const users = useSelector((state) => state.users);

  const author = users.find((user) => user.id === Number(userId));

  return <span>by {author ? author.name : "Inconnu"}</span>;
};

export default PostAuthor;
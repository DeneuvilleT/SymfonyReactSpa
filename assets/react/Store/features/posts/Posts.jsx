import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAllPosts,
  getPostsErrors,
  getPostsStatus,
  fetchPosts,
} from "../../slices/postAxiosSlice";

import PostsExcerpt from "./PostsExcerpt";

const Posts = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsErrors = useSelector(getPostsErrors);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  switch (postsStatus) {
    case "Chargement":
      content = <p>"Chargement ..."</p>;
      break;
    case "Succés":
      const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

      content = orderedPosts.map((post) => (
        <PostsExcerpt key={post.id} post={post} />
      ));
      break;
    case "Echec":
      content = <p>{postsErrors}</p>;
      break;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default Posts;

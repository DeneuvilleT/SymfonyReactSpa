import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAllPosts,
  getPostsErrors,
  getPostsStatus,
  fetchPosts,
} from "../../Store/slices/postSlices";

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
    case "loading":
      content = <p>"Chargement ..."</p>;
      break;
    case "succeeded":
      const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

      content = orderedPosts.map((post) => (
        <PostsExcerpt key={post.id} post={post} />
      ));
      break;
    case "failed":
      content = <p>{postsErrors}</p>;
      break;
  }

  const countTest = () => {
    const test = document.getElementById("test");
    console.log(test.childNodes.length);
  };

  return (
    <>
      <section id="test">
        <h2>Posts</h2>
        {content}
      </section>
      <button onClick={countTest}>Test</button>
    </>
  );
};

export default Posts;

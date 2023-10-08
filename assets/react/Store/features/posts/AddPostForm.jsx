import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from "../../slices/postSlices";

const AddPostForm = () => {
  const users = useSelector((state) => state.users);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onBodyChanged = (e) => setBody(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const onSavePostClicked = (e) => {
    e.preventDefault();
    if (title && body && userId) {
      dispatch(postAdded(title, body, userId));

      setTitle("");
      setBody("");
      setUserId("");
    }
  };

  const canSave = Boolean(title) && Boolean(body) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <form>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author :</label>
        <select id="postAuthor" value={userId} onChange={onUserIdChanged}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postBody">Body :</label>
        <textarea
          name="postBody"
          id="postBody"
          value={body}
          onChange={onBodyChanged}
        />

        <input
          onClick={(e) => onSavePostClicked(e)}
          type="submit"
          value="Envoyer"
          disabled={!canSave}
        />
      </form>
    </section>
  );
};

export default AddPostForm;
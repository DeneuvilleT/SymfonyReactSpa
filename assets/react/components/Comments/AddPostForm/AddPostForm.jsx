import React, { useState } from "react";

import styles from "./addPostForm.styles.scss";

const AddPostForm = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [msgsErr, setMsgsErr] = useState([]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onBodyChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setAuthor(e.target.value);

  const onSavePostClicked = (e) => {
    e.preventDefault();
    if (title && content && userId && author) {
      console.log(title, content, userId, author);

      setTitle("");
      setAuthor("");
      setContent("");
    }
  };

  const canSave = Boolean(title) && Boolean(author) && Boolean(content) && Boolean(userId);

  return (
    <section className={styles.addPostForm}>
      {userId === undefined ? (
        <div>
          <p>Vous devez être connecté pour laisser un commentaire</p>
        </div>
      ) : (
        <form>
          <fieldset>
            <label htmlFor="postTitle">Titre</label>
            <input type="text" name="postTitle" id="postTitle" value={title} onChange={onTitleChanged} />
          </fieldset>

          <fieldset>
            <label htmlFor="postAuthor">Pseudo</label>
            <input type="text" id="postAuthor" value={author} onChange={onAuthorChanged} />
          </fieldset>

          <fieldset>
            <label htmlFor="postBody">Commentaire</label>
            <textarea name="postBody" id="postBody" value={content} onChange={onBodyChanged} />
          </fieldset>

          <input onClick={(e) => onSavePostClicked(e)} type="submit" value="Envoyer" disabled={!canSave} />
        </form>
      )}
    </section>
  );
};

export default AddPostForm;

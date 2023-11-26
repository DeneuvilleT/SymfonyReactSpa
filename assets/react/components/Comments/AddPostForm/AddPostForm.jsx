import React, { useState } from "react";
import axios from "axios";

import styles from "./addPostForm.styles.scss";

const AddPostForm = ({ userId, productId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [msgsErr, setMsgsErr] = useState([]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onBodyChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setAuthor(e.target.value);

  const onSavePostClicked = async (e) => {
    e.preventDefault();
    if (title && content && userId && author) {
      try {
        const formData = {
          title: title,
          author: author,
          content: content,
          product: productId,
          customer: userId,
        };

        const response = await axios.post("/api/v1/comments/comment_post", formData);
        setMsgsErr([]);
        setTitle("");
        setAuthor("");
        /**
         * Ajouter notif
         */
        return setContent("");
      } catch (err) {
        return setMsgsErr([...JSON.parse(err.response.data).errors]);
      }
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
        <>
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

          <ul>
            {msgsErr.length > 0 && (
              <div className="error-messages">
                {msgsErr.map((err, index) => (
                  <p key={index}>{err}</p>
                ))}
              </div>
            )}
          </ul>
        </>
      )}
    </section>
  );
};

export default AddPostForm;

import React from "react";
import Form from "../../Form/Form";

import styles from "./addPostForm.styles.scss";

const AddPostForm = ({ userId, productId }) => {

  return (
    <section className={styles.addPostForm}>
      {userId === undefined ? (
        <div>
          <p>Vous devez être connecté pour laisser un commentaire</p>
        </div>
      ) : (
        <Form
          url={`/api/v1/comments/add_comment/${userId}`}
          btnSubmit={"Envoyer"}
          hasLabel={true}
          after={true}
          inputs={{
            title: {
              label: "Titre",
              name: "title",
              type: "text",
            },
            author: {
              label: "Pseudo",
              name: "author",
              type: "text",
            },
            content: {
              label: "Mot de passe",
              name: "content",
              type: "textarea",
            },
            productId: {
              label: "product",
              name: "product",
              type: "hidden",
              value: productId,
            },
          }}
        />
      )}
    </section>
  );
};

export default AddPostForm;

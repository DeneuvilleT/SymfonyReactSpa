import React from "react";
import Form from "../../components/Form/Form";

import styles from "./logup.styles.scss";

const Logup = () => {
  return (
    <main className={styles.logup}>
      <h2>Inscription</h2>

      <Form
        url={"/v1/register"}
        btnSubmit={"S'inscrire"}
        after={false}
        inputs={{
          firstname: {
            label: "Prénom",
            name: "firstname",
            type: "text",
          },
          lastname: {
            label: "Nom",
            name: "lastname",
            type: "text",
          },
          password: {
            label: "Mot de passe",
            name: "password",
            type: "password",
          },
          email: {
            label: "Email",
            name: "email",
            type: "email",
          },
        }}
      />
    </main>
  );
};

export default Logup;

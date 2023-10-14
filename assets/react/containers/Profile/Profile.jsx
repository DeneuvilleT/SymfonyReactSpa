import React from "react";
import Posts from "../../Store/features/posts/Posts";
import AddPostForm from "../../Store/features/posts/AddPostForm";
import styles from "./profile.styles.scss";

const Profile = () => {
  return (
    <main className={styles.profile}>
      <h2>Page de profil</h2>
      <h3>Envoyer un commentaire</h3>
      <AddPostForm />
      <hr style={{ margin: "30px 0" }} />
      <Posts />
    </main>
  );
};

export default Profile;

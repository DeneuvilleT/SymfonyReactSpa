import React from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

const BtnDelete = ({ url, objet }) => {
  const token = localStorage.getItem(`${location.origin}_bear_token`);

  const handleDelete = async () => {
    try {
      const fireWall = confirm(`Etes-vous sur de vouloir supprimer ${objet} ?`);

      /**
       * Ajouter un systéme de notification
       */
      if (fireWall) {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          location.reload();
        }
      }
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  return (
    <Icon
      icon="line-md:close-circle-twotone"
      width="25"
      height="25"
      color="red"
      style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
      onClick={handleDelete}
    />
  );
};

export default BtnDelete;

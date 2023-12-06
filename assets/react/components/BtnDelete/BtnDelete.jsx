import React from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

const BtnDelete = ({ id, url }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.post(`${url}/${id}`);

      if (response.status === 200) {
        location.reload();
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
      style={{ position: "absolute", top: "10px", right: "10px", cursor:"pointer" }}
      onClick={handleDelete}
    />
  );
};

export default BtnDelete;

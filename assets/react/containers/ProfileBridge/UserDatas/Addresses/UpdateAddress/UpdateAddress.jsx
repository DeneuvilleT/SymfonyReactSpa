import React from "react";
import Form from "../../../../../components/Form/Form";
import { Icon } from "@iconify/react";

const UpdateAddress = ({ infos, id, setChange, changeStates }) => {
  return (
    <fieldset>
      <legend style={{ position: "relative" }}>
        Mise à jour de l'adresse{" "}
        <Icon
          icon="uil:arrow-left"
          width="25"
          height="25"
          color="green"
          style={{ position: "absolute", bottom: "20px", right: "10px", cursor: "pointer", backgroundColor: "#fff" }}
          onClick={() => setChange({ ...changeStates, [id]: false })}
        />
      </legend>
      <Form
        url={`/api/v1/addresses/edit_address/${infos.uid}/${id}`}
        btnSubmit={"Enregistrer"}
        after={true}
        hasLabel={false}
        inputs={{
          alias: {
            label: "Alias",
            name: "alias",
            type: "text",
          },
          address: {
            label: "Adresse",
            name: "address",
            type: "text",
          },
          city: {
            label: "Ville",
            name: "city",
            type: "text",
          },
          zip_code: {
            label: "Code postal",
            name: "zip_code",
            type: "text",
          },
          phone: {
            label: "Téléphône",
            name: "phone",
            type: "tel",
          },
          type: {
            label: "Type d'adresse",
            name: "type",
            type: "select",
            value: "0",
            option: [
              { value: "0", text: "Adresse de livraison" },
              { value: "1", text: "Adresse de facturation" },
            ],
          },
        }}
      />
    </fieldset>
  );
};

export default UpdateAddress;

import React from "react";

import Form from "../../../../../components/Form/Form";

const AddNewAddress = () => {
  return (
    <Form
      url={"/api/v1/addresses/new_address"}
      btnSubmit={"Enregistrer"}
      hasLabel={false}
      after={true}
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
          value: 0,
          option: [
            { value: 0, text: "Adresse de livraison" },
            { value: 1, text: "Adresse de facturation" },
          ],
        },
      }}
    />

    // <select name="type" onChange={handleInputChange}>
    //   <option value="0">Adresse de livraison</option>
    //   <option value="1">Adresse de facturation</option>
    // </select>
  );
};

export default AddNewAddress;

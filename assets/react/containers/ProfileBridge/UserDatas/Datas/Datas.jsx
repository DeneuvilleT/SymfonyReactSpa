import React from "react";
import { Icon } from "@iconify/react";

const Datas = ({ infos }) => {
  //   const canSave = Boolean(infos.email.trim()) && Boolean(infos.firstname.trim()) && Boolean(infos.lastname.trim());
  return (
    <fieldset>
      <legend>Informations personnelles</legend>
      <p>{infos.email}</p>
      <p>
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
      </p>
      <p>{!infos.firstname ? "" : infos.firstname}</p>
      <p>{!infos.lastName ? "" : infos.lastName}</p>
    </fieldset>
  );
};

export default Datas;

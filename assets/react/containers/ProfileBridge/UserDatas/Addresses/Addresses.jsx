import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseISO, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Icon } from "@iconify/react";

import AddNewAddress from "./AddNewAddress/AddNewAddress";

import { fetchAddresses, getAllAddresses, getAddressesErrors, getAddressesStatus } from "../../../../Store/slices/addressesSlices";

const Addresses = ({ infos }) => {
  const dispatch = useDispatch();

  const allAddresses = useSelector(getAllAddresses);
  const addressesStatus = useSelector(getAddressesStatus);
  const addressesErros = useSelector(getAddressesErrors);

  const [errMsg, setErrMsg] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [change, setChange] = useState(false);
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    if (addressesStatus === "idle" && infos.id) {
      dispatch(fetchAddresses(infos.id));
    }
  }, [addressesStatus, dispatch, infos]);

  useEffect(() => {
    if (addressesStatus === "succeeded") {
      setAddresses([...allAddresses]);
    } else if (addressesStatus === "failed") {
      setErrMsg(addressesErros);
    }
  }, [addressesStatus, dispatch]);

  switch (addressesStatus) {
    case "loading":
      return (
        <fieldset>
          <legend>Adresses de livraison</legend>
          <Icon icon="line-md:loading-twotone-loop" width="60" height="60" />;
        </fieldset>
      );

    case "succeeded":
      return (
        <fieldset>
          <legend>Adresses de livraison</legend>

          {!addNew ? (
            <>
              {addresses.length ? (
                addresses?.map((address) => (
                  <address key={address.id}>
                    <p>{!address.address ? "" : address.address}</p>
                    <p>{!address.city ? "" : address.city}</p>
                    <p>{!address.zip_code ? "" : address.zip_code}</p>
                    <p>{!address.phone ? "" : `0${address.phone}`}</p>
                    <p>{!address.type ? "" : address.type}</p>

                    <p>{formatDistanceToNow(parseISO(address.date), { locale: fr })}</p>

                    <button onClick={() => setChange(true)}>Modifier l'adresse</button>
                  </address>
                ))
              ) : (
                <h3>
                  <Icon icon="line-md:emoji-frown-open" color="#333" width="60" height="60" /> Vous n'avez pas d'adresse enregistrée.
                </h3>
              )}
              <button onClick={() => setAddNew(true)}>Ajouter une adresse</button>
            </>
          ) : (
            <AddNewAddress infos={infos} setAddNew={setAddNew} />
          )}
        </fieldset>
      );

    case "failed":
      return <p>{errMsg}</p>;
  }
};

export default Addresses;

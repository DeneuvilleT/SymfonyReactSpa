import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";

import UpdateAddress from "./UpdateAddress/UpdateAddress";
import AddNewAddress from "./AddNewAddress/AddNewAddress";
import BtnDelete from "../../../../components/BtnDelete/BtnDelete";

import { fetchAddresses, getAllAddresses, getAddressesErrors, getAddressesStatus } from "../../../../Store/slices/addressesSlices";

import styles from "./address.styles.scss";

const Addresses = ({ infos }) => {
  const dispatch = useDispatch();

  const allAddresses = useSelector(getAllAddresses);
  const addressesStatus = useSelector(getAddressesStatus);
  const addressesErros = useSelector(getAddressesErrors);

  const [errMsg, setErrMsg] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [changeStates, setChangeStates] = useState({});
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
        <aside className={styles.addresses}>
          <h2 style={{ marginTop: "50px" }}>Vérification de vos adresses ...</h2>
          <Icon icon="line-md:loading-twotone-loop" width="60" height="60" />;
        </aside>
      );

    case "succeeded":
      return (
        <aside className={styles.addresses}>
          <legend>
            Vos adresses
            {addNew ? (
              <Icon icon="carbon:close-outline" style={{ cursor: "pointer" }} width="25" height="25" onClick={() => setAddNew(false)} />
            ) : (
              <Icon icon="gridicons:add" color="#204ed7" width="50" height="50" onClick={() => setAddNew(true)} />
            )}
          </legend>

          {!addNew ? (
            <div>
              {addresses.length ? (
                addresses?.map((address) =>
                  changeStates[address.id] ? (
                    <Fragment key={address.id}>
                      <UpdateAddress infos={infos} id={address.id} setChange={setChangeStates} changeStates={changeStates} />
                    </Fragment>
                  ) : (
                    <address className={styles.item_address} key={address.id}>
                      <h2 style={{ backgroundColor: !address.type ? "blue" : "#ef1b2b" }}>{address.alias}</h2>

                      <p>
                        <strong>{`Adresse ${!address.type ? "livraison" : "facturation"}`}</strong>
                      </p>

                      <p>{!address.address ? "" : address.address}</p>
                      <p>
                        {!address.zip_code ? "" : address.zip_code} {!address.city ? "" : address.city}
                      </p>
                      <p>
                        <Icon icon="gridicons:phone" style={{ marginBottom: "-3px" }} width="18" height="18" />
                        {!address.phone ? "" : `0${address.phone}`}
                      </p>
                      <BtnDelete objet={"cette adresse"} url={`/api/v1/addresses/delete_address/${address.id}`} />
                      <button onClick={() => setChangeStates({ ...changeStates, [address.id]: true })}>Modifier l'adresse</button>
                    </address>
                  )
                )
              ) : (
                <h3>
                  <Icon icon="line-md:emoji-frown-open" color="#333" width="60" height="60" /> Vous n'avez pas d'adresse enregistrée.
                </h3>
              )}
            </div>
          ) : (
            <AddNewAddress userId={infos.id} />
          )}
        </aside>
      );

    case "failed":
      return <p>{errMsg}</p>;
  }
};

export default Addresses;

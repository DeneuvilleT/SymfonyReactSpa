import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/slices/authSlices";
import { Icon } from "@iconify/react";

import axios from "axios";

import styles from "./logout.styles.scss";

const Logout = () => {
  const dispatch = useDispatch();

  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    handleLogout();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      setWaiting(true);
      dispatch(logout());
      
      const submitLogout = await axios.get("/api/v1/logout");
      
      if (submitLogout.status === 200) {
        return (location.href = "/");
      }
    } catch (error) {
      location.href = "/";
      return console.error(error);
    }
  };

  return (
    <>
      {waiting ? (
        <main className={styles.logout}>
          <div>
            <Icon icon="svg-spinners:3-dots-rotate" width="100" height="100" />
          </div>

          <div>
            <h2>Déconnexion en cours</h2>
          </div>
        </main>
      ) : (
        <></>
      )}
    </>
  );
};

export default Logout;

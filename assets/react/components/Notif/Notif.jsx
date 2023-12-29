import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./notif.styles.scss";
import { notificationPushLaunch, resetNotif } from "../../Store/slices/notifSlices";

const Notif = () => {
  const dispatch = useDispatch();

  const { msg, timer } = useSelector((state) => ({ ...state.notif }));

  useEffect(() => {
    dispatch(
      notificationPushLaunch(
        setTimeout(() => {  
          dispatch(resetNotif());
        }, timer)
      )
    );
  }, [msg, timer]);

  return <div className={msg !== "" ? styles.notif : styles.notif_hiden}>{msg}</div>;
};

export default Notif;

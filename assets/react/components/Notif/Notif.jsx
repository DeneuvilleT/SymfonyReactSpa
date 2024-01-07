import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./notif.styles.scss";
import { resetNotif } from "../../Store/slices/notifSlices";

const Notif = () => {
  const dispatch = useDispatch();

  const { msg, timer, uid } = useSelector((state) => ({ ...state.notif }));

  const [timerOut, setTimerOut] = useState(0);

  const intervalRef = useRef();

  useEffect(() => {
    // Nettoyez le setInterval précédent avec la référence actuelle
    clearInterval(intervalRef.current);

    let initialTimer = 0;

    if (timer !== 0) {
      initialTimer = timer / 1000;
      // Utilisez la référence pour stocker le setInterval actuel
      intervalRef.current = setInterval(() => {
        initialTimer--;
        setTimerOut(initialTimer);

        if (initialTimer === 0) {
          clearInterval(intervalRef.current);
          dispatch(resetNotif());
        }
      }, 1000);
    }

    // Nettoyez le setInterval lorsque le composant est démonté ou lorsque uid change
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [uid]);

  return (
    <div className={styles.notif} style={{ width: timer === 0 ? "0" : "360px" }}>
      <p className={timer === 0 ? "" : styles.appearAnimation}>{timer === 0 ? "" : msg}</p>
      <progress value={100} max={100} className={timer === 0 ? "" : styles.deleteAnimation}></progress>
    </div>
  );
};

export default Notif;

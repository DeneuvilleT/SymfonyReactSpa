import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./notif.styles.scss";
import { resetNotif } from "../../Store/slices/notifSlices";

const Notif = () => {
  const dispatch = useDispatch();

  const { msg, timer, uid } = useSelector((state) => ({ ...state.notif }));
  const [timerOut, setTimerOut] = useState(timer);
  const intervalRef = useRef();

  useEffect(() => {
    clearInterval(intervalRef.current);
    setTimerOut(timer);

    let initialTimer = 0;

    if (timer !== 0) {
      initialTimer = timer / 1000;

      intervalRef.current = setInterval(() => {
        initialTimer--;
        setTimerOut(initialTimer);

        if (initialTimer === 0) {
          clearInterval(intervalRef.current);
          dispatch(resetNotif());
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [uid, timer]);

  return (
    <div className={styles.notif} style={{ width: timerOut === 0 ? "0" : "360px" }}>
      <p className={timerOut === 0 ? "" : styles.appearAnimation}>{timerOut === 0 ? "" : msg}</p>
      <progress value={100} max={100} className={timerOut === 0 ? "" : styles.deleteAnimation}></progress>
    </div>
  );
};

export default Notif;

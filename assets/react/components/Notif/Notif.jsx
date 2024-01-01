import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./notif.styles.scss";
import { resetNotif } from "../../Store/slices/notifSlices";

const Notif = () => {
  const dispatch = useDispatch();

  const { msg, timer, uid } = useSelector((state) => ({ ...state.notif }));

  const [timerOut, setTimerOut] = useState(0);

  let test;
  let initialTimer = 0;

  useEffect(() => {
console.log('first')
    clearInterval(test);
    initialTimer = 0;

    if (timer !== 0) {
      initialTimer = timer / 1000;
      test = setInterval(() => {
        initialTimer--;
        setTimerOut(initialTimer);

        if (initialTimer === 0) {
          clearInterval(test);
          dispatch(resetNotif());
        }

        console.log(test, initialTimer);
      }, 1000);
    }
  }, [uid]);

  return <div className={timerOut !== 0 ? styles.notif : styles.notif_hiden}>{msg}</div>;
};

export default Notif;

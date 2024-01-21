import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./notif.styles.scss";
import { resetNotif } from "../../Store/slices/notifSlices";

const Notif = () => {
  const dispatch = useDispatch();

  const { msg, timer, uid } = useSelector((state) => ({ ...state.notif }));

  const intervalRef = useRef();
  const progressBar = useRef();

  useEffect(() => {
    clearInterval(intervalRef.current);
    let initialTimer = 0;

    if (timer !== 0) {
      const progressStyle = progressBar.current.style;
      progressStyle.setProperty("--progress-animation-duration", `${timer / 1000}s`);

      initialTimer = timer / 1000;

      intervalRef.current = setInterval(() => {
        initialTimer--;

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

  useEffect(() => {
    if (progressBar.current) {
      progressBar.current.style.webkitAnimation = "none";
      setTimeout(() => {
        progressBar.current.style.webkitAnimation = "";
      }, 10);
    }
  }, [uid]);

  return (
    <div className={styles.notif} style={{ width: timer === 0 ? "0" : "360px" }}>
      <p>{timer === 0 ? "" : msg}</p>
      <progress ref={progressBar} value={100} max={100}></progress>
    </div>
  );
};

export default Notif;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Store/slices/authSlices";
import axios from "axios";

const Authentication = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLog, infos, status } = useSelector((state) => ({ ...state.auth }));

  const Child = props.child;

  useEffect(() => {
    props.auth ? checkLog() : null, [props];
  });

  const checkLog = async () => {
    if (!isLog) {
      const token = localStorage.getItem("TOKEN");
      if (token !== null) {
        const getToken = await axios.get("/api/v1/token");
        if (getToken.status === 200) {
          const { user } = JSON.parse(getToken.data);

          window.scrollTo(0, 0);
          return dispatch(login(user));
        } else {
          return console.log("Aucun token");
        }
      } else {
        return navigate("/notFound");
      }
    }
  };

  return <Child infos={infos} isLog={isLog} status={status} />;
};

export default Authentication;

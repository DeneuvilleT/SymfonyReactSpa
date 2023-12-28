import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Store/slices/authSlices";

import axios from "axios";

const Authentication = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLog, infos, status } = useSelector((state) => ({ ...state.auth }));

  const Child = props.child;

  useEffect(() => {
    checkLog();
  }, [props]);

  const checkLog = async () => {
    const token = localStorage.getItem(`${location.origin}_bear_token`);
    if (!isLog) {
      if (token === null && props.auth) {
        return navigate("/notFound");
      }

      if (token !== null) {
        try {
          const response = await axios.get("/api/v1/check_token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
 
            return dispatch(login(response.data));
          }
        } catch (error) {
          if (error.response.status === 401) {
            return dispatch(logout());
          }
          return error;
        }
      }
    }
  };

  return <Child infos={infos} isLog={isLog} status={status} />;
};

export default Authentication;

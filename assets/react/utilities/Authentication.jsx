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
    checkLog();
  }, [props]);

  const checkLog = async () => {
    if (!isLog) {
      const token = localStorage.getItem("TOKEN");

      if (token !== null) {
        try {
          const getToken = await axios.get("/api/v1/token");

          if (getToken.status === 200) {
            const { user } = JSON.parse(getToken.data);
            console.log(user)

            window.scrollTo(0, 0);
            return dispatch(login(user));
          }
        } catch (error) {
          if (error.response.status === 403) {
            localStorage.removeItem("TOKEN");
            console.clear();
          }
        }
      } else {
        if (props.auth) return navigate("/notFound");
      }
    }
  };

  return <Child infos={infos} isLog={isLog} status={status} />;
};

export default Authentication;

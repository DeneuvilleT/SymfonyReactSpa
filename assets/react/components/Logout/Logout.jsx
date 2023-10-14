import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/slices/authSlices";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      const submitLogout = await axios.get("/api/v1/logout");
      localStorage.removeItem("TOKEN");

      navigate("/");
      return location.reload();
    } catch (error) {
      return console.error(error);
    }
  };

  return navigate("/");
};

export default Logout;

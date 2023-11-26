import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";

import styles from "./logup.styles.scss";

const Logup = () => {
  const navigate = useNavigate();

  const [icone,       setIcone] = useState("line-md:arrow-right-circle");
  const [msgsErr,   setMsgsErr] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.firstname !== "" && formData.lastname !== "" && formData.password && formData.email) {
      try {
        setIcone("svg-spinners:90-ring-with-bg");

        const response = await axios.post("/api/v1/register", formData);
        setMsgsErr([]);
        /**
         * Ajout notification d'attente de mail de vérification pour activation
         */
        return (location.href = "/");
      } catch (err) {
        setIcone("line-md:arrow-right-circle");
        return setMsgsErr([...JSON.parse(err.response.data).errors]);
      }
    }
  };

  const canSave = Boolean(formData.firstname !== "" && formData.lastname !== "" && formData.password && formData.email);

  return (
    <main className={styles.logup}>
      <h2>Inscription</h2>

      <form>
        <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} />

        <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} />

        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />

        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />

        <ul>
          {msgsErr.length > 0 && (
            <div className="error-messages">
              {msgsErr.map((err, index) => (
                <span key={index}>{err}</span>
              ))}
            </div>
          )}
        </ul>

        <button onClick={(e) => handleSubmit(e)} disabled={!canSave}>
          S'inscrire <Icon icon={icone} color="white" width="30" height="30" />
        </button>
      </form>
    </main>
  );
};

export default Logup;

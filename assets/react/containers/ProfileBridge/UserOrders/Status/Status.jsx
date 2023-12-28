import React, { useEffect, useState } from "react";

const Status = ({ status }) => {
  
  const [color, setColor] = useState("");

  useEffect(() => {
    switch (status) {
      case "En attente":
        setColor("blueviolet");
        break;
      case "Confirmée":
        setColor("green");
        break;
      case "Envoyée":
        setColor("green");
        break;
      case "Annulée":
        setColor("red");
        break;
      case "Remboursée":
        setColor("cyan");
        break;

      default:
        break;
    }
  }, [status]);

  return <p style={{ paddingBottom: "5px", borderBottom: "3px solid", borderColor: color }}>{status}</p>;
};

export default Status;

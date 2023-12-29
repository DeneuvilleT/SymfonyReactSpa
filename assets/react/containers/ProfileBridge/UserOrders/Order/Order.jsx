import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Order = ({ linesOrder, display }) => {

  const navigate = useNavigate();

  const [heightLine, setHeightLine] = useState(60);

  useEffect(() => {
    setHeightLine(heightLine * linesOrder.length);
  }, []);

  return (
    <aside style={{ height: display ? `${heightLine}px` : "0" }}>

      {linesOrder.length
        ? linesOrder.map((lineOrder) => (
          
            <div key={lineOrder.id}>
              <button onClick={() => navigate(`/product/${lineOrder.productId}`)}>{lineOrder.product}</button>
              <p>
                <b>Qte :</b> {lineOrder.quantity}
              </p>
              <p>{(Number(lineOrder.amount) / 100).toFixed(2)} €</p>
            </div>
          ))
        : ""}
    </aside>
  );
};

export default Order;

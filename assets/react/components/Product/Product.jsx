import React from "react";

const Product = ({ product }) => {
  const description = (
    <p dangerouslySetInnerHTML={{ __html: product.description }} />
  );

  return (
    <article>
      <h4 style={{ fontSize: "3em", marginBottom: "20px" }}>{product.title}</h4>
      {description}
      <p>{Number(product.priceUnit).toFixed(2)} €</p>
      <p>{product.stock}</p>
      <img
        style={{ width: "200px", height: "auto" }}
        src={`${location.origin}/uploads/images/${product.cover}`}
        alt={product.title}
      />
    </article>
  );
};

export default Product;

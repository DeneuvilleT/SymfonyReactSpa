import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getProductsStatus,
  getProductsErrors,
  getAllProducts,
} from "../../Store/slices/productsSlices";

import styles from "./productList.styles.scss";

const ProductList = () => {
  
  const products = useSelector(getAllProducts);
  const productsStatus = useSelector(getProductsStatus);
  const productsErrors = useSelector(getProductsErrors);

  switch (productsStatus) {
    case "loading":
      return <p>"Chargement ..."</p>;

    case "succeeded":
      return (
        <main className={styles.productList}>
          {products.map((product) => (
            <article
              key={product.id}
              itemScope
              itemType="http://schema.org/Product"
            >
              <h2 itemProp="name">{product.title}</h2>

              <meta
                itemProp="image"
                content={`${location.origin}/uploads/images/${product.cover}`}
              />
              <img
                style={{ width: "200px", height: "auto" }}
                src={`${location.origin}/uploads/images/${product.cover}`}
                alt={product.title}
              />

              <p itemProp="brand">{product.brand}</p>
              <span itemProp="sku">
                <strong>ref:</strong> {product.sku}
              </span>

              <Fragment>
                <p
                  itemProp="description"
                  dangerouslySetInnerHTML={{ __html: product.descriptionShort }}
                />
              </Fragment>

              <div
                itemProp="offers"
                itemScope
                itemType="http://schema.org/Offer"
              >
                <meta itemProp="price" content={product.priceUnit} />
                <meta itemProp="priceCurrency" content="€" />
                <p>
                  <strong>Prix :</strong> {Number(product.priceUnit).toFixed(2)}{" "}
                  €
                </p>

                <meta
                  itemProp="availability"
                  content="http://schema.org/InStock"
                />
                <p>
                  <strong>Stock :</strong> {product.stock}
                </p>
              </div>

              <Link to={`/product/${product.id}`} itemProp="url">
                Lien vers la page du produit
              </Link>
              <meta
                itemProp="itemCondition"
                content="http://schema.org/NewCondition"
              />
            </article>
          ))}
        </main>
      );

    case "failed":
      return <p>{productsErrors}</p>;
  }
};

export default ProductList;

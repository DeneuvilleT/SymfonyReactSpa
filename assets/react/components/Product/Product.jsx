import React, { useState, useEffect, Fragment } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProducts,
  getProductsStatus,
} from "../../Store/slices/productsSlices";

import styles from "./product.styles.scss";

const Product = () => {
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const params = useParams();

  const products = useSelector(getAllProducts);
  const productsStatus = useSelector(getProductsStatus);

  useEffect(() => {
    setProduct(products.find((x) => x.id === Number(params.id)));
  }, [productsStatus, dispatch]);

  return (
    <main className={styles.product}>
      {product !== null && typeof product !== "undefined" && (
        <article itemScope itemType="http://schema.org/Product">
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
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </Fragment>

          <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
            <meta itemProp="price" content={product.priceUnit} />
            <meta itemProp="priceCurrency" content="€" />
            <p>
              <strong>Prix :</strong> {Number(product.priceUnit).toFixed(2)} €
            </p>

            <meta itemProp="availability" content="http://schema.org/InStock" />
            <p>
              <strong>Stock :</strong> {product.stock}
            </p>
          </div>

          <meta
            itemProp="itemCondition"
            content="http://schema.org/NewCondition"
          />
        </article>
      )}
    </main>
  );
};

export default Product;

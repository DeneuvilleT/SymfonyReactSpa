import React, { useState, useEffect, Fragment } from "react";

import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, getProductsStatus } from "../../Store/slices/productsSlices";
import { addToCart } from "../../Store/slices/cartSlices";

import styles from "./product.styles.scss";

const Product = () => {
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const params = useParams();

  const products = useSelector(getAllProducts);
  const productsStatus = useSelector(getProductsStatus);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    setProduct(products.find((x) => x.id === Number(params.id)));
  }, [productsStatus, dispatch]);

  return (
    <main className={styles.product}>
      {product !== null && typeof product !== "undefined" && (
        <article itemScope itemType="http://schema.org/Product">
          <h2 itemProp="name">{product.title}</h2>

          <section>
            <div>
              <meta itemProp="image" content={`${location.origin}/uploads/images/${product.cover}`} />
              <img style={{ width: "200px", height: "auto" }} src={`${location.origin}/uploads/images/${product.cover}`} alt={product.title} />
            </div>

            <div>
              <p itemProp="brand">{product.brand}</p>
              <span itemProp="sku">
                <strong>ref:</strong> {product.sku}
              </span>

              <Fragment>
                <p itemProp="description" dangerouslySetInnerHTML={{ __html: product.description }} />
              </Fragment>
            </div>
          </section>

          <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
            <meta itemProp="price" content={product.priceUnit} />
            <meta itemProp="priceCurrency" content="€" />
            <button onClick={() => handleAddToCart(product)} to={"/cart"}>
              Ajouter au panier
            </button>
            <p>
              <strong>Prix :</strong> {(Number(product.priceUnit) / 100).toFixed(2)} €
            </p>

            <meta itemProp="availability" content="http://schema.org/InStock" />
            <p>
              <strong>Stock :</strong> {product.stock}
            </p>
          </div>
        </article>
      )}
    </main>
  );
};

export default Product;

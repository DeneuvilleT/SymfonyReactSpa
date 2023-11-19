import React, { useState, useEffect, Fragment } from "react";

import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, getProductsStatus } from "../../Store/slices/productsSlices";
import { addToCart } from "../../Store/slices/cartSlices";
import { Icon } from "@iconify/react";

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
          <h2 itemProp="name">
            <span></span>
            {product.title}
            <span></span>
          </h2>

          <section>
            <div>
              <meta itemProp="image" content={`${location.origin}/uploads/images/${product.cover}`} />
              <img src={`${location.origin}/uploads/images/${product.cover}`} alt={product.title} />
            </div>

            <div>
              <p itemProp="brand">{product.brand}</p>
              <span itemProp="sku">
                <strong>ref:</strong> {product.sku}
              </span>

              <Fragment>
                <p itemProp="description" dangerouslySetInnerHTML={{ __html: product.description }} />
              </Fragment>

              <p>
                <Icon icon="vaadin:stock" color="black" width="50" height="50" />
                <strong>Stock :</strong>
                {product.stock}
              </p>
            </div>
          </section>

          <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
            <meta itemProp="price" content={product.priceUnit} />
            <meta itemProp="priceCurrency" content="€" />
            <p>{(Number(product.priceUnit) / 100).toFixed(2)} €</p>

            <aside className={styles.move_quantity}>
              <Icon icon="line-md:minus-circle" width="35" height="35" />
              {/*  */}
              <p>1</p>
              {/*  */}
              <Icon icon="line-md:plus-circle" width="35" height="35" />
            </aside>

            <button onClick={() => handleAddToCart(product)} to={"/cart"}>
              Ajouter au panier{" "}
              <Icon icon={product.stock !== 0 ? "line-md:download-outline-loop" : "line-md:download-off-loop"} color="white" width="45" height="45" />
            </button>

            <meta itemProp="availability" content="http://schema.org/InStock" />
          </div>
        </article>
      )}
    </main>
  );
};

export default Product;

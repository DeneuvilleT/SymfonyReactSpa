import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getAllProducts, getProductsStatus } from "../../Store/slices/productsSlices";
import { Icon } from "@iconify/react";

import Comments from "../Comments/Comments";
import BtnAdd from "./BtnAdd/BtnAdd";
import Zoom from "./Zoom/Zoom";

import styles from "./product.styles.scss";

const Product = ({ infos }) => {
  const [product, setProduct] = useState(null);

  const params = useParams();

  const products = useSelector(getAllProducts);
  const productsStatus = useSelector(getProductsStatus);

  useEffect(() => {
    setProduct(products.find((x) => x.id === Number(params.id)));
  }, [productsStatus]);

  return (
    <main className={styles.product}>
      {product !== null && typeof product !== "undefined" && (
        <>
          <article itemScope itemType="http://schema.org/Product">
            <h2 itemProp="name">
              <span></span>
              {product.title}
              <span></span>
            </h2>

            <section>
              <div>
                <meta itemProp="image" content={`${location.origin}/uploads/images/${product.cover}`} />
                <Zoom src={`${location.origin}/uploads/images/${product.cover}`} alt={product.title}></Zoom>
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
              <BtnAdd product={product} list={false} />

              <meta itemProp="availability" content="http://schema.org/InStock" />
            </div>
          </article>

          <Comments comments={product.comments} userId={infos.id} productId={product.id} />
        </>
      )}
    </main>
  );
};

export default Product;

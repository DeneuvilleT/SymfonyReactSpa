import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { pagination } from "../../utilities";

import Stock from "../../components/Product/Stock/Stock";
import BtnAdd from "../../components/Product/BtnAdd/BtnAdd";
import Pagination from "../../components/Product/Pagination/Pagination";

import { getProductsStatus, getProductsErrors, getAllProducts } from "../../Store/slices/productsSlices";

import styles from "./productList.styles.scss";

const ProductList = () => {
  const products =       useSelector(getAllProducts);
  const productsStatus = useSelector(getProductsStatus);
  const productsErrors = useSelector(getProductsErrors);

  const [max,   setMax] = useState(8);
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState([]);

  useEffect(() => {
    if (productsStatus === "succeeded") {
      setProductsPerPage([]);
      setPage(1);
      return pagination(products, max, setProductsPerPage);
    }
  }, [productsStatus, max]);

  switch (productsStatus) {
    case "loading":
      return <Icon style={{ marginTop: "150px" }} icon="svg-spinners:blocks-shuffle-3" width="240" height="240" />;

    case "succeeded":
      return (
        <main className={styles.productList}>
          <section>
            {productsPerPage[page - 1]?.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} itemScope itemType="http://schema.org/Product" itemProp="url">
                <h2 itemProp="name">{product.title}</h2>

                <meta itemProp="image" content={`${location.origin}/uploads/images/${product.cover}`} />
                <img style={{ width: "200px", height: "auto" }} src={`${location.origin}/uploads/images/${product.cover}`} alt={product.title} />

                <h3 itemProp="brand">{product.brand}</h3>
                <span itemProp="sku">
                  <strong>ref:</strong> {product.sku}
                </span>

                <Fragment>
                  <p
                    itemProp="description"
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionShort,
                    }}
                  />
                </Fragment>

                <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
                  <meta itemProp="price" content={product.priceUnit} />
                  <meta itemProp="priceCurrency" content="€" />
                  <p className="price">{(Number(product.priceUnit) / 100).toFixed(2)} €</p>

                  <Stock stock={product.stock} />
                </div>

                <BtnAdd product={product} list={true} />

                <meta itemProp="itemCondition" content="http://schema.org/NewCondition" />
              </Link>
            ))}
          </section>

          <Pagination products={productsPerPage} page={page} setPage={setPage} setMax={setMax} />
        </main>
      );

    case "failed":
      return <p>{productsErrors}</p>;
  }
};

export default ProductList;

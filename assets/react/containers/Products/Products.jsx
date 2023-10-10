import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../components/Product/Product";
import {
  getProductsStatus,
  getProductsErrors,
  getAllProducts,
  fetchProducts,
} from "../../Store/slices/productsSlices";
import styles from "./products.styles.scss";

const Products = () => {
  const products = useSelector(getAllProducts);
  const productsStatus = useSelector(getProductsStatus);
  const productsErrors = useSelector(getProductsErrors);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  let content;
  switch (productsStatus) {
    case "loading":
      content = <p>"Chargement ..."</p>;
      break;
    case "succeeded":
      content = products.map((product) => <Product key={product.id} product={product} />);
      break;
    case "failed":
      content = <p>{productsErrors}</p>;
      break;
  }

  return (
    <main className={styles.products}>
      <h2>Produits</h2>
      {content}
    </main>
  );
};

export default Products;

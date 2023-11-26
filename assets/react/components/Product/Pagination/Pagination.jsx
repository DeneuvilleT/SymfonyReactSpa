import React from "react";
import { Icon } from "@iconify/react";

import styles from "./pagination.styles.scss";

const Pagination = ({ products, page, setPage, setMax }) => {
  
  const handleChange = ({ target }) => setMax(Number(target.value));

  return (
    <div className={styles.pagination}>
      <Icon
        icon="line-md:arrow-align-left"
        color="#333"
        width="50"
        height="50"
        onClick={() => {
          page > 1 ? setPage(page - 1) : setPage(page);
          window.scrollTo(0, 600);
        }}
      />

      <select
        onChange={(e) => {
          handleChange(e);
        }}
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="12">12</option>
      </select>

      <p>
        Page {page} sur {products.length}
      </p>

      <Icon
        icon="line-md:arrow-align-right"
        color="#333"
        width="50"
        height="50"
        onClick={() => {
          page <= products.length - 1 ? setPage(page + 1) : setPage(page);
          window.scrollTo(0, 600);
        }}
      />
    </div>
  );
};

export default Pagination;

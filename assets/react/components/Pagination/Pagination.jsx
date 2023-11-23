import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { pagination } from "../../utilities";

const Pagination = ({ products }) => {
  const [max, setMax] = useState(8);
  const [page, setPage] = useState(1);
  const [productsNew, setProducts] = useState([]);

  useEffect(() => {
    return pagination(products, max, setProducts);
  }, []);

  return (
    <div>
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

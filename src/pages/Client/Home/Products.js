import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../../../hooks/useProduct";
import { HomeProducts } from "../../../components/Home";

export function Products() {
  const { idCategory } = useParams();
  const { loading, products, getProductsByCategory } = useProduct();

  useEffect(
    () => getProductsByCategory(idCategory),
    [idCategory] // eslint-disable-line
  );

  return (
    <div>
      {loading ? (
        <p className="loader">Cargando...</p>
      ) : (
        <HomeProducts products={products} />
      )}
    </div>
  );
}

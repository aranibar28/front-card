import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks";
import { ListProducts } from "../../components/Client";

export function Products() {
  const { tableNumber, idCategory } = useParams();
  const { loading, products, getProductsByCategory } = useProduct();

  useEffect(
    () => getProductsByCategory(idCategory),
    [idCategory] // eslint-disable-line
  );

  return (
    <div>
      <Link
        to={`/client/${tableNumber}`}
        style={{
          display: "block",
          textAlign: "right",
          color: "#f44b03",
          marginRight: "8px",
        }}
      >
        Volver a Categorias
      </Link>
      {loading ? (
        <p className="loader">Cargando...</p>
      ) : (
        <ListProducts products={products} />
      )}
    </div>
  );
}

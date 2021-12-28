import React, { useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { size } from "lodash";
import { useProduct } from "../../hooks";
import { getProductsCart } from "../../api/cart";
import { ListProductCart } from "../../components/Client";

export function Cart() {
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const { getProductById } = useProduct();
  const { tableNumber } = useParams();

  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart();
      const productsArray = [];
      for await (const idProduct of idProductsCart) {
        const response = await getProductById(idProduct);
        productsArray.push(response);
      }
      setProducts(productsArray);
    })();
  }, [reloadCart]); // eslint-disable-line

  const onReloadCart = () => setReloadCart((prev) => !prev);

  return (
    <div>
      <h3>Carrito</h3>
      {!products ? (
        <p className="loader">Cargando...</p>
      ) : size(products) === 0 ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <p>Tu carrito esta vacío</p>
          <div>
            <Icon
              name="cart arrow down"
              style={{
                color: "gray",
                fontSize: "50px",
                padding: "20px 0",
              }}
            />
          </div>
          <Link to={`/client/${tableNumber}`}>
            <Button primary style={{ margin: "20px 0" }}>
              Seguir buscando
            </Button>
          </Link>
        </div>
      ) : (
        <ListProductCart products={products} onReloadCart={onReloadCart} />
      )}
    </div>
  );
}

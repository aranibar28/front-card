import React from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { toast } from "react-toastify";
import { addProductCart } from "../../../api/cart";
import "./ListProducts.scss";
import Swal from "sweetalert2";

const addCart = (product) => {
  addProductCart(product.id);
  toast.success(`${product.title} añadido al carrito`);
};

const showProduct = (product) => {
  Swal.fire({
    title: product.title,
    html: `<p>${product.description}</p><h4 style="color: #81d109;">S/. ${product.price}</h4>`,
    imageUrl: product.image,
    confirmButtonColor: "#f44b03",
    width: 310,
    imageWidth: 260,
    imageHeight: 200,
  });
};

export function ListProducts(props) {
  const { products } = props;
  return (
    <div className="list-products-client">
      {map(products, (product) => product.active &&(
        <div key={product.id} className="list-products-client__product">
          <div className="list-products-client__product-title">
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <Button primary icon onClick={() => addCart(product)}>
              Agregar <Icon name="add" />
            </Button>
            <span className="animate__animated animate__fadeIn">
              S/. {product.price}
            </span>
          </div>
          <div
            className="list-products-client__product-image"
            onClick={() => showProduct(product)}
          >
            <Image src={product.image} />
          </div>
        </div>
      ))}
    </div>
  );
}

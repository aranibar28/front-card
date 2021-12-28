import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { useOrder } from "../../../../hooks";
import { EMPTY } from "../../../../utils/constants";
import "./PaymentProductList.scss";

export function PaymentProductList(props) {
  const { payment } = props;
  const [orders, setOrders] = useState([]);
  const { getOrdersByPayment } = useOrder();

  useEffect(() => {
    (async () => {
      const response = await getOrdersByPayment(payment.id);
      setOrders(response);
    })();
  }, []); // eslint-disable-line

  return (
    <div className="payment-product-list">
      {map(orders, (order) => (
        <div className="payment-product-list__product" key={order.id}>
          <div>
            <Image
              src={order.product_data?.image || EMPTY.src}
              avatar
              size="tiny"
            />
            <span>
              {order.product_data?.title || "Este producto ya no existe."}
            </span>
          </div>
          <span>S/. {order.product_data?.price || "00.00"}</span>
        </div>
      ))}
    </div>
  );
}

import React from "react";
import { Image } from "semantic-ui-react";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../utils/constants";
import "./OrderHistoryItem.scss";

export function OrderHistoryItem(props) {
  const { order } = props;
  const { title, image } = order?.product_data || "";

  return (
    <div
      className={classNames("order-history-item", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-history-item__time">
        <span>
          Pedido {moment(order.created_at).startOf("second").fromNow()}
        </span>
      </div>

      <div className="order-history-item__image">
        <Image src={image} />
      </div>

      <div className="order-history-item__product">
        <p>{title}</p>
        {order.status === ORDER_STATUS.PENDING ? (
          <span className="animate__animated animate__flash">En marcha</span>
        ) : (
          <span>Entregado</span>
        )}
      </div>
    </div>
  );
}

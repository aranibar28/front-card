import React from "react";
import { Image, Button } from "semantic-ui-react";
import classNames from "classnames";
import moment from "moment";
import { useOrder } from "../../../../hooks/useOrder";
import { ORDER_STATUS } from "../../../../utils/constants";
import "moment/locale/es";
import "./OrderItemAdmin.scss";

export function OrderItemAdmin(props) {
  const { order, onReloadOrders } = props;
  const { title, image } = order?.product_data || "";
  const { checkDeliveredOrder } = useOrder();

  const onCheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.id);
    onReloadOrders();
  };

  return (
    <div
      className={classNames("order-item-admin", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-item-admin__time">
        <span>{moment(order.created_at).format("hh:mm a")}</span>
        {" - "}
        <span>{moment(order.created_at).startOf("secods").fromNow()}</span>
      </div>
      <div className="order-item-admin__product">
        <Image src={image} />
        <p>{title}</p>
      </div>
      {order.status === ORDER_STATUS.PENDING ? (
        <Button
          primary
          onClick={onCheckDeliveredOrder}
          className="animate__animated animate__heartBeat"
        >
          Marcar Entregado
        </Button>
      ) : (
        <div className="ui green message">Pedido Entregado</div>
      )}
    </div>
  );
}

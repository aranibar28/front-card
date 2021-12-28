import React, { useState } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { usePayment, useOrder } from "../../../../hooks";
import "./PaymentDetail.scss";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export function PaymentDetail(props) {
  const [disabled, setDisabled] = useState(false);
  const { payment, orders, openCloseModal, onReloadOrders } = props;
  const { closePayment } = usePayment();
  const { closeOrder } = useOrder();
  const history = useHistory();

  const getIconPayment = (key) => {
    if (key === "CARD") return "credit card outline";
    if (key === "CASH") return "money bill alternate outline";
    return null;
  };

  const onCloseTable = async () => {
    setDisabled(true);
    await closePayment(payment.id);
    for await (const order of orders) {
      await closeOrder(order.id);
    }
    onReloadOrders();
    openCloseModal();
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Operación completada!",
      showConfirmButton: false,
      timer: 2000,
    });
    history.push("/admin/payments-history");
  };

  return (
    <div className="payment-detail">
      <Table striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Mesa: </Table.Cell>
            <Table.Cell># {payment.table_data.number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Total: </Table.Cell>
            <Table.Cell>S/. {payment.totalPayment}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Forma de Pago: </Table.Cell>
            <Table.Cell>
              <Icon name={getIconPayment(payment.typePayment)} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button disabled={disabled} primary fluid onClick={onCloseTable}>
        Marcar como Pagado y cerrar Mesa
      </Button>
    </div>
  );
}

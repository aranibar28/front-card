import React, { useState, useEffect } from "react";
import { size } from "lodash";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { getOrdersByTableApi } from "../../../../api/order";
import { ORDER_STATUS } from "../../../../utils/constants";
import { Label } from "semantic-ui-react";
import { ReactComponent as IconTable } from "../../../../assets/table.svg";
import { usePayment } from "../../../../hooks";
import "./TableAdmin.scss";

export function TableAdmin(props) {
  const { table, reload } = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);

  const { getPaymentByTable } = usePayment();

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.PENDING
      );
      setOrders(response);
    })();
  }, [reload]); // eslint-disable-line

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.DELIVERED
      );
      if (size(response) > 0) setTableBusy(response);
      else setTableBusy(false);
    })();
  }, [reload]); // eslint-disable-line

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(table.id);
      if (size(response) > 0) setPendingPayment(true);
      else setPendingPayment(false);
    })();
  }, [reload]); // eslint-disable-line

  return (
    <Link className="table-admin" to={`/admin/table/${table.id}`}>
      {size(orders) > 0 ? (
        <Label circular color="red">
          {size(orders)}
        </Label>
      ) : null}
      {pendingPayment && (
        <Label circular color="red">
          Cuenta
        </Label>
      )}
      <IconTable
        className={classNames({
          pending: size(orders) > 0,
          busy: tableBusy,
          "pending-payment": pendingPayment,
        })}
      />
      <p>Mesa {table.number}</p>
    </Link>
  );
}

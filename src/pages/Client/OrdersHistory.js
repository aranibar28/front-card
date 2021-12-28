import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { map, size, forEach } from "lodash";
import { OrderHistoryItem } from "../../components/Client";
import { useOrder, useTable, usePayment } from "../../hooks";
import classNames from "classnames";
import Swal from "sweetalert2";

export function OrdersHistory() {
  const [idTable, setIdTable] = useState(null);
  const [isRequestAccount, setIsRequestAccount] = useState(false);
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const { createPayment, getPaymentByTable } = usePayment();
  const [reloadHistory, setReloadHistory] = useState(false);

  const onReloadHistory = () => setReloadHistory((prev) => !prev);

  useEffect(() => {
    (async () => {
      const table = await getTableByNumber(tableNumber);
      const idTableTemp = table[0].id;
      setIdTable(idTableTemp);
      getOrdersByTable(idTableTemp, "", "ordering=-status,-created_at");
    })();
  }, []); // eslint-disable-line

  useEffect(() => {
    (async () => {
      if (idTable) {
        const response = await getPaymentByTable(idTable);
        setIsRequestAccount(response);
      }
    })();
  }, [idTable, reloadHistory]); // eslint-disable-line

  const onShowme = async () => {
    await Swal.fire({
      position: "center",
      icon: "info",
      title: "Ya estamos en camino!",
      width: 300,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const onCreatePayment = async (typePayment) => {
    let totalPayment = 0;
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price);
    });
    const paymentData = {
      table: idTable,
      totalPayment: totalPayment.toFixed(2),
      typePayment,
      statusPayment: "PENDING",
    };
    const payment = await createPayment(paymentData);
    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }
  };

  const onPayment = async () => {
    try {
      const alert = await Swal.fire({
        title: "¿Desea pagar con tarjeta o efectivo??",
        text: "Seleccione una opción",
        width: "320px",
        icon: "warning",
        showDenyButton: true,
        showCancelButton: true,
        denyButtonColor: "#f44b03",
        confirmButtonText: "Tarjeta",
        denyButtonText: "Efectivo",
        cancelButtonText: "Cancelar",
      });
      if (alert.isConfirmed) {
        Swal.fire("Completado!", "Método de pago en Tarjeta.", "success");
        onCreatePayment("CARD");
        onReloadHistory();
      } else if (alert.isDenied) {
        Swal.fire("Completado!", "Método de pago en Efectivo.", "success");
        onCreatePayment("CASH");
        onReloadHistory();
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div>
      <h3>Historial de Pedidos</h3>
      {loading ? (
        <p className="loader">Cargando...</p>
      ) : (
        <>
          {size(orders) > 0 && (
            <Button
              className={classNames("primary", {
                [size(isRequestAccount) > 0]: true,
              })}
              fluid
              onClick={() =>
                size(isRequestAccount) === 0 ? onPayment() : onShowme()
              }
            >
              {size(isRequestAccount) > 0
                ? "La cuenta ya esta pedida"
                : "Pedir la Cuenta"}
            </Button>
          )}
          {map(orders, (order) => (
            <OrderHistoryItem key={order.id} order={order} />
          ))}
        </>
      )}
    </div>
  );
}

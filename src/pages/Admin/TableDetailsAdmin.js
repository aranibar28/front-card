import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { forEach, size } from "lodash";
import { HeaderPage, AddOrderForm } from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import {
  ListOrderAdmin,
  PaymentDetail,
} from "../../components/Admin/TableDetails";
import { useOrder, useTable, usePayment } from "../../hooks";
import Swal from "sweetalert2";

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { id } = useParams();
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { table, getTable } = useTable();
  const { createPayment, getPaymentByTable } = usePayment();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, reloadOrders]); // eslint-disable-line

  useEffect(() => getTable(id), [id]); // eslint-disable-line

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id);
      if (size(response) > 0) setPaymentData(response[0]);
    })();
  }, [reloadOrders]); // eslint-disable-line

  const onReloadOrders = () => setReloadOrders((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const onCreatePayment = async (typePayment) => {
    let totalPayment = 0;
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data?.price || "");
    });
    const paymentData = {
      table: id,
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
        title: "¿Pagar con tarjeta o efectivo?",
        text: "Seleccione una opción",
        icon: "question",
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
        onReloadOrders();
      } else if (alert.isDenied) {
        Swal.fire("Completado!", "Método de pago en Efectivo.", "success");
        onCreatePayment("CASH");
        onReloadOrders();
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <>
      <HeaderPage
        title={`Mesa ${table?.number || ""}`}
        btnTitle={paymentData ? "Ver Cuenta" : "Añadir pedido"}
        btnClick={openCloseModal}
        btnTitleTwo={
          !paymentData & (size(orders) > 0) ? "Generar Cuenta" : null
        }
        btnClickTwo={onPayment}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Generar Pedido"
      >
        {paymentData ? (
          <PaymentDetail
            payment={paymentData}
            orders={orders}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        ) : (
          <AddOrderForm
            idTable={id}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        )}
      </ModalBasic>
    </>
  );
}

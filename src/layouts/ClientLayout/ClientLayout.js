import React, { useEffect } from "react";
import { Container, Button, Icon, Image } from "semantic-ui-react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useTable } from "../../hooks";
import "./ClientLayout.scss";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";

export function ClientLayout(props) {
  const { children } = props;
  const { isExistTable } = useTable();
  const { tableNumber } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const exist = await isExistTable(tableNumber);
      if (!exist) closeTable();
    })();
  }, [tableNumber]); // eslint-disable-line

  const closeTable = async () => {
    try {
      const alert = await Swal.fire({
        title: "¿Está seguro de salir?",
        text: "Seleccione una opción",
        width: "320px",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f44b03",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
      });
      if (alert.isConfirmed) {
        await Swal.fire(
          "Nos vemos!",
          "Esperamos verte pronto. Gracias.",
          "success"
        );
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const goToCart = () => {
    history.push(`/client/${tableNumber}/cart`);
  };

  const goToOrder = () => {
    history.push(`/client/${tableNumber}/orders`);
  };

  // const cantProducts = JSON.parse(localStorage?.productsCart).length;

  return (
    <div className="client-layout-bg">
      <Container className="client-layout">
        <div className="client-layout__header">
          <Link to={`/client/${tableNumber}`}>
            <Image src={logo} />
          </Link>
          <span>Mesa {tableNumber}</span>
          <div>
            <Button icon onClick={goToCart}>
              <span>{/* {cantProducts} */}</span>{" "}
              {/* <- CONTADOR DE PRODUCTOS */}
              <Icon name="shop" />
            </Button>
            <Button icon onClick={goToOrder}>
              <Icon name="list" />
            </Button>
            <Button icon onClick={closeTable}>
              <Icon name="sign-out" />
            </Button>
          </div>
        </div>
        <div className="client-layout__content">{children}</div>
      </Container>
    </div>
  );
}

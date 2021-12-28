import React, { useState } from "react";
import { Form, Button, Image } from "semantic-ui-react";
import { useTable } from "../../../hooks";
import "./SelectTable.scss";
import Swal from "sweetalert2";
import logo from "../../../assets/logo.png";

export function SelectTable(props) {
  const { history } = props;
  const [tableNum, setTableNum] = useState(null);
  const [error, setError] = useState(null);
  const { isExistTable } = useTable();

  const onSubmit = async () => {
    setError(null);
    if (!tableNum) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        width: "320px",
        text: "No has introducido ninguna mesa",
      });
    } else {
      const exist = await isExistTable(tableNum);
      if (exist) {
        await Swal.fire({
          icon: "success",
          position: "center",
          width: "320px",
          title: "Bienvenido!",
          text: `El número de su mesa es ${tableNum}`,
          showConfirmButton: false,
          timer: 1500,
        });
        history.push(`/client/${tableNum}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          width: "320px",
          text: "El número de la mesa no existe!",
        });
      }
    }
  };

  return (
    <div className="select-table">
      <div className="select-table__content">
        <Image src={logo} />
        <h2>Introduce tu numero de Mesa</h2>
        <Form onSubmit={onSubmit}>
          <Form.Input
            placeholder="Ejemplo: 1, 2, 3 ,4, 5 ..."
            type="number"
            onChange={(_, data) => setTableNum(data.value)}
          />
          <Button primary fluid>
            Entrar
          </Button>
          <p className="select-table__content-error">{error}</p>
        </Form>
      </div>
    </div>
  );
}

import React from "react";
import { Icon, Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks";
import "./TopMenu.scss";
import Swal from "sweetalert2";
import logo from "../../../assets/logo.png";

export function TopMenu() {
  const { auth, logout } = useAuth();

  const renderName = () => {
    if (auth.me?.first_name && auth.me?.last_name) {
      return `${auth.me.first_name} ${auth.me.last_name}`;
    }
    return auth.me?.email;
  };

  const onLogout = async (data) => {
    try {
      const alert = await Swal.fire({
        title: "¿Está seguro de cerrar la sesión?",
        text: "Seleccione una opción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, Salir",
        cancelButtonText: "No, Cancelar",
      });
      if (alert.isConfirmed) {
        await Swal.fire("Nos vemos!", "Hasta pronto.", "success");
        logout();
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <Menu fixed="top" className="top-menu-admin">
      <Menu.Item className="top-menu-admin__logo">
        <Link to={`/admin`}>
          <Image src={logo} />
        </Link>
      </Menu.Item>
      <Menu.Menu position="right" className="top-menu-admin__user">
        <Menu.Item>Hola, {renderName()}</Menu.Item>
        <Menu.Item onClick={onLogout}>
          <Icon name="sign-out" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

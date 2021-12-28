import React from "react";
import { LoginForm } from "../../../components/Admin";
import { Image } from "semantic-ui-react";
import "./LoginAdmin.scss";
import logo from "../../../assets/logo.png";

export function LoginAdmin() {
  return (
    <div className="login-admin">
      <div className="login-admin__content">
        <div>
          <Image src={logo} />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

import { Observer } from "mobx-react-lite";
import React from "react";
import LoginView from "./login.view";

const LoginContainer: React.FC = () => (
  <Observer>
    {() => {
      return <LoginView />;
    }}
  </Observer>
);

export default LoginContainer;

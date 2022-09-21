import LoginForm from "../../components/connectionForms/loginForm/loginForm";
import React from "react";
import Header from "../../components/header/header";

import "./login.css";

function Login() {
  return (
    <React.Fragment>
      <Header
        logout={false}
        addPost={false}
        backtoFeed={false}
        signup={true}
        login={false}
      />
      <section className="login">
        <LoginForm />
      </section>
    </React.Fragment>
  );
}

export default Login;

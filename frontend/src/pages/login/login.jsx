import LoginForm from "../../components/connectionForms/loginForm/loginForm";
import React from "react";
import Nav from "../../components/nav/nav";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  return (
    <React.Fragment>
      <Nav logout={false} addPost={false} backtoFeed={true} />
      <section className="login">
        <h1>Connectez vous !</h1>
        <LoginForm />
        <Link to="/signup">Inscrivez-vous</Link>
      </section>
    </React.Fragment>
  );
}

export default Login;

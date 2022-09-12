
import LoginForm from "../../components/connectionForms/loginForm/loginForm";
import { Link } from "react-router-dom";
import "./login.css";


function Login() {
  return (
    <section className="login">
      <h1>Connectez vous !</h1>
      <LoginForm/>
      <Link to="/signup">Inscrivez-vous</Link>
    </section>
  );
}

export default Login;

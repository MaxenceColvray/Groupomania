
import LoginForm from "../../components/connectionForms/loginForm/loginForm";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm/>
      <Link to="/signup">Inscrivez-vous</Link>
    </div>
  );
}

export default Login;

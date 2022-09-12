import SignupForm from "../../components/connectionForms/signupForm/signupForm";
import { Link } from "react-router-dom";
import "./signup.css";


function signup() {
  return (
    <section className="signup">
      <h1>Inscrivez vous !</h1>
      <SignupForm />
      <Link to="/">Se connecter</Link>
    </section>
  );
}

export default signup;

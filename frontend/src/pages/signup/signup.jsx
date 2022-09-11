import SignupForm from "../../components/connectionForms/signupForm/signupForm";
import { Link } from "react-router-dom";

function signup() {
  return (
    <section>
      <h1>Inscription</h1>
      <SignupForm />
      <Link to="/">Se connecter</Link>
    </section>
  );
}

export default signup;

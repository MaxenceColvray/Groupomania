import { Link } from "react-router-dom";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

function SignupForm() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate()


  const signup = (e) => {
    e.preventDefault();
    let signupObject = { email: inputEmail, password: inputPassword };

    fetch("http://localhost:3000/api/auth/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupObject),
    })
      .then((response) => {
        console.log(response.status);
        let errorSignupMsg = document.getElementById("errorSignupMsg");
        if (response.status !== 201) {
          errorSignupMsg.textContent = response.status;
        } else {
          errorSignupMsg.textContent = "";
          navigate("/")
        }
      })
      .catch(() => {
        console.log("erreur");
      });
  };

  return (
    <form>
      <div>
        <label htmlFor="email">email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">mot de passe :</label>
        <input
          type="password"
          id=""
          password
          name="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="S'inscrire" onClick={signup} />

      <Link to="/">Se connecter</Link>
      <p id="errorSignupMsg"></p>
    </form>
  );
}

export default SignupForm;

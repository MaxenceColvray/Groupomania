import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signupForm.css";

function SignupForm() {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  const signup = (e) => {
    e.preventDefault();
    let signupObject = {
      name: inputName,
      email: inputEmail,
      password: inputPassword,
    };

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
          navigate("/");
        }
      })
      .catch(() => {
        console.log("erreur");
      });
  };

  return (
    <form className="loginForm">
      <h2 className="loginForm_title">Créer un compte</h2>
      <div className="login_field">
        <label htmlFor="name">Pseudonyme</label>
        <input
          type="text"
          id="name"
          name="name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
      </div>

      <div className="login_field">
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
      </div>

      <div className="login_field">
        <label htmlFor="password">mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </div>

      <div className="errorLoginMsg">
        <p id="errorSignupMsg"></p>
      </div>

      <input
        className="loginForm_submit"
        type="submit"
        value="S'inscrire"
        onClick={signup}
      />

    </form>
  );
}

export default SignupForm;

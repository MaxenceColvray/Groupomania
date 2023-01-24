import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signupForm.css";

/*----------Start Fonction contrôle de formulaire--------------*/
function validate_field(input_id, error_id, regex) {
  let input = document.getElementById(input_id);
  let el_error = document.getElementById(error_id);

  if (regex.test(input.value)) {
    el_error.innerText = "Attention le champ n'est pas valide";
  } else if (input.value === "") {
    el_error.innerText = "Attention le champ ne peut pas être vide";
  } else {
    el_error.innerText = "";
    return true;
  }
  return false;
}

function validate_form() {
  if (
    !validate_field(
      "name",
      "NameErrorMsg",
      new RegExp("[^a-zA-Z- àâäéèêëïîôöùûüÿç]")
    ) ||
    /*!validate_field(
      "email",
      "EmailErrorMsg",
      new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
    ) ||*/
    !validate_field(
      "password",
      "PasswordErrorMsg",
      new RegExp("[^a-z0-9]")
    )
  ) {
    return false;
  } else {
    return true;
  }
}
/*----------End Fonction contrôle de formulaire--------------*/

function SignupForm() {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  const signup = (e) => {
    e.preventDefault();
    if (validate_form()) {
      let signupObject = {
        name: inputName,
        email: inputEmail,
        password: inputPassword,
      };

      fetch("http://51.91.99.62:3000/api/auth/signup", {
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
    } else {
      console.log(`la fonction validate_form() est ${validate_form()}`)
  }
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
          required
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <p id="NameErrorMsg"></p>
      </div>

      <div className="login_field">
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <p id="EmailErrorMsg"></p>
      </div>

      <div className="login_field">
        <label htmlFor="password">mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <p id="PasswordErrorMsg"></p>
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

import { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./loginForm.css";

function LoginForm() {
  const [inputEmaill, setInputEmaill] = useState("");
  const [inputPasswordd, setInputPasswordd] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    console.log(inputEmaill);

    let loginObject = { email: inputEmaill, password: inputPasswordd };

    fetch("http://localhost:3000/api/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginObject),
    })
    .then(data => {
      return data.json();
    })
      .then((response) => {
        console.log(response.status , response);
        let errorLoginMsg = document.getElementById("errorLoginMsg");
        if (response.status !== 200) {
          errorLoginMsg.textContent = response.status;
        } else {
          errorLoginMsg.textContent = "";
          // Création cookie contenant le token
          /*res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
          res.end()*/

          console.log(response)
          //LocalStorage
          //User avec tout 
          //Soit Token - User (ID + isAdmin)

          // navigate("/feed");
        }
      })
      .catch(() => {
        console.log("erreur");
      });
  };

  return (
    <form>
      <div className="box_login_form">
        <div className="box_login_field">
          <div className="login_field">
            <label htmlFor="email">email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputEmaill}
              onChange={(e) => setInputEmaill(e.target.value)}
            />
          </div>
          <div className="login_field">
            <label htmlFor="password">mot de passe :</label>
            <input
              type="password"
              id=""
              password
              name="password"
              value={inputPasswordd}
              onChange={(e) => setInputPasswordd(e.target.value)}
            />
          </div>
          <div className="errorLoginMsg">
            <p id="errorLoginMsg"></p>
          </div>
        </div>
        <div className="submit_login">
          <input type="submit" value="Se connecter" onClick={login} />
        </div>
      </div>
    </form>
  );
}

export default LoginForm;

import { useState } from "react";
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

    let status = 0; //variable pr récupérer response.status avant de return json()
    fetch("http://localhost:3000/api/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginObject),
    })
      .then((response) => {
        status = response.status;
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);

        let errorLoginMsg = document.getElementById("errorLoginMsg");
        if (status !== 200) {
          errorLoginMsg.textContent = status;
        } else {
          errorLoginMsg.textContent = "";
          //LocalStorage
          //User avec tout
          //Soit Token - User (ID + isAdmin)
          let user = [];
          let userObjet = {
            token: data.token,
            userId: data.userId
          };
          user.push(userObjet);
          user = JSON.stringify(user);
          localStorage.setItem("user", user);
           navigate("/feed");
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

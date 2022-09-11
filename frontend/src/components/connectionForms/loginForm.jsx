import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"


function LoginForm() {
  const [inputEmaill, setInputEmaill] = useState("");
  const [inputPasswordd, setInputPasswordd] = useState("");
  const navigate = useNavigate()


  const login = (e) => {
    e.preventDefault();
    console.log(inputEmaill);

    let loginObject = { email: inputEmaill, password: inputPasswordd };

    fetch("http://localhost:3000/api/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginObject),
    })
      .then((response) => {
        console.log(response.status)
        let errorLoginMsg = document.getElementById("errorLoginMsg");
        if (response.status !== 200) {
          errorLoginMsg.textContent = response.status;
        } else {
          errorLoginMsg.textContent = "";
          navigate("/feed")
        }
      })
      .catch(() => {
        console.log("erreur");
      });
  };

  return (
    <form action="">
      <div>
        <label htmlFor="email">email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={inputEmaill}
          onChange={(e) => setInputEmaill(e.target.value)}
        />
      </div>
      <div>
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
      <input type="submit" value="Se connecter" onClick={login} />
      

      <Link to="/signup">Inscrivez-vous</Link>
      <p id="errorLoginMsg"> </p>
    </form>
  );
}

export default LoginForm;

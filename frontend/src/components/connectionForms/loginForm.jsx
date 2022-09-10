import { Link } from 'react-router-dom'


function LoginForm() {
  return (
    <form action="">
      <div>
        <label htmlFor="email">email :</label>
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">mot de passe :</label>
        <input type="password" id=""password name="password"/>
      </div>
      <input type="submit" value="Se connecter"/>

      <Link to="/signup">Inscrivez-vous</Link>
    </form>
  );
}

export default LoginForm;
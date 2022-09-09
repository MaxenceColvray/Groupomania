import { Link } from 'react-router-dom'


function Login() {
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
      <Link to="/">Inscrivez-vous</Link>
    </form>
  );
}

export default Login;

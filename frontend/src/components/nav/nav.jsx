import "./nav.css"

import { Link } from "react-router-dom";



function Nav(props) {

const logout = (()=>{
  localStorage.removeItem('user')
})
    return (
      
      <div className="nav">
                {props.addPost ? <Link to="/addpost" className="nav_button">Ajouter un post</Link>:"" }
                {props.logout ? <Link to="/" className="nav_button" onClick={logout}>Déconnexion</Link>:"" }
                {props.backtoFeed ? <Link to="/" className="nav_button">retour</Link>:"" }
                {props.signup ? <Link to="/signup" className="nav_button">s'inscrire</Link>:"" }
                {props.login ? <Link to="/" className="nav_button">se connecter</Link>:"" }




    </div>
    );
  }
  
  export default Nav;
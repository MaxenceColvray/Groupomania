import "./nav.css"

import { Link } from "react-router-dom";



function Nav(props) {

    return (
      
      <div className="nav">
                {props.logout ? <Link to="/">Déconnexion</Link>:"" }
                {props.addPost ? <Link to="/">Ajouter un post</Link>:"" }
                {props.backtoFeed ? <Link to="/">backtoFeed</Link>:"" }


    </div>
    );
  }
  
  export default Nav;
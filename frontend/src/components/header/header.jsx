import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="box_header">
        <div className="box_logo">
          <img
            src={require("../../assets/icon-left-font.png")}
            alt="Logo Groupomania"
            className="img"
          />
        </div>
        <Link to="/">Se déconnecter</Link>
      </div>
    </header>
  );
}

export default Header;

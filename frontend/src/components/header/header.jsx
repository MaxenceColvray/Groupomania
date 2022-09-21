import Nav from "../../components/nav/nav";

import "./header.css";

function Header(props) {
  return (
    <header className="header">
      <div className="box_header">
        <div className="box_logo">
          <img
            src={require("../../assets/icon-left-font.png")}
            alt="Logo Groupomania"
            className="logo_desktop"
          />
          <img
            src={require("../../assets/logo_mobile.png")}
            alt="Logo Groupomania"
            className="logo_mobile"
          />
        </div>
        <Nav
          logout={props.logout}
          addPost={props.addPost}
          backtoFeed={props.backtoFeed}
          signup={props.signup}
          login={props.login}
        />
      </div>
    </header>
  );
}

export default Header;

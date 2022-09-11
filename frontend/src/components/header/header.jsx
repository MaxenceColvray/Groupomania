import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="box_logo">
        <img
          src={require("../../assets/icon-left-font.png")}
          alt="Logo Groupomania"
          className="img"
        />
      </div>
    </header>
  );
}

export default Header;

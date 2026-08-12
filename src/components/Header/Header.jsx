import React from "react";

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={require("../../styles/images/around-the-us-logo.svg")}
        alt="Logo Around The U.S."
      />
    </header>
  );
}

export default Header;

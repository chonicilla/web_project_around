import React from "react";
import aroundLogo from "../../styles/images/around-the-us-logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={aroundLogo}
        alt="Logo Around The U.S."
      />
    </header>
  );
}

export default Header;

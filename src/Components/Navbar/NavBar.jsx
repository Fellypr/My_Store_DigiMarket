import React from "react";
import "./NavBar.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import RedeSocial from "../RedesSocial/RedeSocial";
function NavBar() {
  return (
    <div className="navbar">
      <picture className="navbar__Logo">
        <Link to="/">
          <img
            src="img/Logo_Moderno_DigiMarket-removebg-preview.png"
            alt=""
          />
        </Link>
      </picture>
      <div className="navbar__Redes">
          <RedeSocial />
      </div>
      <div className="search">
          <input
            type="text"
            placeholder="Pesquisar..."
            id="Search"
            name="Search"
          />
          <button><CiSearch  size={25}/></button>
      </div>
    </div>
  );
}

export default NavBar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import RedeSocial from "../RedesSocial/RedeSocial";
function NavBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if(!search) return;
    navigate(`/categoria?produto=${encodeURIComponent(search)}`);
    setSearch(" ");
  }
  return (
    <div className="navbar">
      <picture className="navbar__Logo">
        <Link to="/">
          <img src="img/Logo_Moderno_DigiMarket-removebg-preview.png" alt="" />
        </Link>
      </picture>
      <div className="navbar__Redes">
        <RedeSocial />
      </div>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pesquisar..."
          id="Search"
          name="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          <CiSearch size={25} />
        </button>
      </form>
    </div>
  );
}

export default NavBar;

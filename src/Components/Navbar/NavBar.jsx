import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import RedeSocial from "../RedesSocial/RedeSocial";
import axios from "axios";

function NavBar() {
  const [search, setSearch] = useState("");
  const [produtos, setProdutos] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!search) return;
    navigate(`/categoria?produto=${encodeURIComponent(search)}`);
    setSearch(" ");
  }
  async function buscarProdutos() {
    try {
      const response = await axios.post(
        "http://localhost:5289/api/AdicionarProduto/Buscar",
        {
          Product: search,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProdutos(response.data);
    } catch (error) {
      console.log("Erro ao buscar produtos", error);
    }
  }
  useEffect(() => {
    if ((search || "").trim().length > 0) {
      buscarProdutos();
    } else {
      setProdutos([]);
    }
  }, [search]);

  const produtosFiltrados = (produtos || []).filter((item) =>
    item.nameProduct?.toLowerCase().includes(search.toLowerCase())
  );
  console.log(produtosFiltrados);

  console.log("valor da busca", produtosFiltrados);
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
        <div className="searchInput">
          <input
            type="text"
            placeholder="Pesquisar..."
            id="Search"
            name="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <CiSearch size={25} />
          </button>
        </div>
        {produtosFiltrados.length > 0 && (
          <div className="resultSearch">
            <div>
              {produtosFiltrados.map((item) => (
                <Link
                  to={`/detalhe/${item.id}`}
                  key={item.id}
                  className="result"
                >
                  <img src={item.picture} />
                  <p>{item.nameProduct}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default NavBar;

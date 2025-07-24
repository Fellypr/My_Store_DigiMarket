import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Categoria.css";
import Cards from "../../Components/Cards/Cards";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";

function Categoria() {
  const [produtosSearch, setProdutosSearch] = useState([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const query = searchParams.get("produto");

  async function buscarProdutos() {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api-store-g1mu.onrender.com/api/AdicionarProduto/BuscarProdutosPelaQuery?produto=${encodeURIComponent(
          query
        )}`
      );
      setProdutosSearch(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    buscarProdutos();
  }, [query]);

  return (
    <div className="categoria">
      <div className="categoriaSection">
        <h2>Resultados para : {query}</h2>
        {produtosSearch.length > 0 ? (
          produtosSearch.map((produtos) => (
            <div className="cardsCategoria" key={produtos.id}>
              <Cards produtos={produtos} />
            </div>
          ))
        ) : (
          <div className="CarregandoProdutos">
            <p>Nenhum produto Encontrado</p>
          </div>
        )}
      </div>
      <div className={loading ? "loadingProdutosCateroria" : ""}>
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default Categoria;

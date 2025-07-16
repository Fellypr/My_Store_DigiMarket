import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Categoria.css";
import Cards from "../../Components/Cards/Cards";
import axios from "axios";

function Categoria() {
  const [produtosSearch, setProdutosSearch] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("produto");

  async function buscarProdutos() {
    try {
      const response = await axios.get(
        `http://localhost:5289/api/AdicionarProduto/BuscarProdutosPelaQuery?produto=${encodeURIComponent(query)}`
      );
      console.log(response.data);
      setProdutosSearch(response.data);
    } catch (error) {
      console.log(error);
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
          <div className="cardsCategoria">
             <p>Nenhum produto encontrado</p>
          </div>
        )  
        }
        
      </div>
    </div>
  );
}

export default Categoria;

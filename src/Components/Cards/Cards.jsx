
import "./Cards.css";
import { Link } from "react-router-dom";


function Cards({ produtos }) {

   function LimitarPalavras(Name, limit) {
    if (Name.length > limit) {
      return Name.substring(0, limit) + "...";
    }
    return Name;
  }
  function LimitarPalavras2(Description, limit) {
    if (Description.length > limit) {
      return Description.substring(0, limit) + "...";
    }
    return Description;

  }

  return (
    <Link to={`/detalhe/${produtos.id}`} className="cardsContainer" key={produtos.id}>
      <picture>
        <img src={produtos.picture} alt="" />
      </picture>
      <h2 style={{ textAlign: "center" }}>{LimitarPalavras(produtos.nameProduct, 25)}</h2>
      <div className="informationProduct">
        <p style={{ textAlign: "left" }}>{LimitarPalavras2(produtos.description,40)}</p>
        <p>{produtos.category}</p>
        <p className="price">
          {produtos?.price != null
            ? produtos.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "R$0,00"}
        </p>
      </div>
    </Link>
  );
}

export default Cards;

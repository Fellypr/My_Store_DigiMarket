import React from "react";
import "./Detalhe.css";
import Button from "../../Components/Buttons/button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductPage = () => {
  const urlDetalhe =
    "http://localhost:5289/api/AdicionarProduto/DetalheDoProduto/";

  const { id } = useParams();
  const [detalheDoProduto, setDetalheDoProduto] = useState(null);

  async function GetDate(url) {
    try {
      const response = await axios.get(url);
      console.log("Detalhe do produto:", response.data);
      setDetalheDoProduto(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const urlCompleta = `${urlDetalhe}${id}`;
    GetDate(urlCompleta);
  }, [id]);

  if (!detalheDoProduto) {
    return <p>Carregando detalhes do produto...</p>;
  }

  return (
    <div className="product-container">
      <div className="left-section">
        <img
          src={detalheDoProduto.picture}
          alt={detalheDoProduto.nameProduct}
          className="main-image"
        />
      </div>

      <div className="right-section">
        <h1>{detalheDoProduto.nameProduct}</h1>

        <p className="rating">⭐⭐⭐⭐☆ </p>

        <div className="price-section">
          <p className="price">
            {detalheDoProduto.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            <span className="old-price">
              {" "}
              {(detalheDoProduto.price * 1.2).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>

          <p className="extra-discount-text">{detalheDoProduto.description}</p>
        </div>

        <div className="button-container">
          <Button />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

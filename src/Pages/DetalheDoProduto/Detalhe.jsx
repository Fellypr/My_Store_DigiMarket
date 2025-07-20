import React from "react";
import "./Detalhe.css";
import Button from "../../Components/Buttons/button";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ProductPage = () => {
  const zoomRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const zoomElement = zoomRef.current;
    const image = imgRef.current;
    if (!zoomElement || !image) return;

    const { left, top, width, height } = zoomElement.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    image.style.transform = `scale(2)`;
    image.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseLeave = () => {
    const image = imgRef.current;
    if (image) {
      image.style.transform = "scale(1)";
      image.style.transformOrigin = "center center";
    }
  };
  const urlDetalhe =
    "http://localhost:5289/api/AdicionarProduto/DetalheDoProduto/";
  const { id } = useParams();
  const [detalheDoProduto, setDetalheDoProduto] = useState(null);
  const [produtos, setProdutos] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  async function GetDate(url) {
    try {
      const response = await axios.get(url);
      console.log("Detalhe do produto:", response.data);
      setDetalheDoProduto(response.data);
      setProdutos(response.data);
      setImagemSelecionada(response.data.picture);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const urlCompleta = `${urlDetalhe}${id}`;
    GetDate(urlCompleta);
  }, [id]);

  if (!detalheDoProduto || !produtos || !imagemSelecionada) {
    return <p>Carregando detalhes do produto...</p>;
  }

  const Imagems = [
    produtos.picture,
    produtos.pictureFirst,
    produtos.pictureSecond,
    produtos.pictureThird,
  ].filter(Boolean);

  return (
    <div className="product-container">
      <div className="left-section">
        <div
          className="main-image"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={zoomRef}
        >
          <img
            src={imagemSelecionada}
            alt={detalheDoProduto.nameProduct}
            ref={imgRef}
          />
        </div>
        <div className="images-container">
          {Imagems.map((imagem, index) => (
            <img
              key={index}
              src={imagem}
              alt={detalheDoProduto.nameProduct}
              onClick={() => setImagemSelecionada(imagem)}
              onMouseEnter={() => setImagemSelecionada(imagem)}
              className="sub-image"
            />
          ))}
        </div>
      </div>

      <div className="right-section">
        <h1>{detalheDoProduto.nameProduct}</h1>

        <p className="rating">⭐⭐⭐⭐☆</p>

        <div className="price-section">
          <p className="price">
            {detalheDoProduto.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            <span className="old-price">
              {" "}
              {(detalheDoProduto.price * 1.6).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>

          <p className="extra-discount-text">{detalheDoProduto.description}</p>
        </div>

        <div className="button-container">
          <Button href={detalheDoProduto.linkVenda} text="Comprar" />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

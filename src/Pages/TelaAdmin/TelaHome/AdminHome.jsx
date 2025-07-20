import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminHome.css";
import Cards from "../../../Components/Cards/Cards";
import { FiEdit } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { IoTrashBinOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SlPicture } from "react-icons/sl";
import { data } from "react-router-dom";
import { BiBody } from "react-icons/bi";

function AdminHome() {
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState("R$ 0,00");
  const [Adiconar, setAdiconar] = useState(null);

  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [picture, setPicture] = useState("");
  const [linkVenda, setLinkVenda] = useState("");
  const [produtoId, setProdutoId] = useState(null);

  const [PicturePrimaria, setPicturePrimaria] = useState("");
  const [PictureSecundaria, setPictureSecundaria] = useState("");
  const [PictureTerciaria, setPictureTerciaria] = useState("");

  function viewPicture(picture) {
    window.scrollTo(0, 0);
    setPicturePreview(picture);
  }

  function Adicionar(addProduct) {
    window.scrollTo(0, 0);
    setAdiconar(addProduct);
  }

  function formatarMoeda(e, setValor) {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    const valorFormatado = (Number(valorNumerico) / 100).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
    setValor(valorFormatado);
  }

  async function getProducts() {
    try {
      const response = await axios.get(
        "https://api-store-g1mu.onrender.com/api/AdicionarProduto/BuscarProdutos"
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function carregarParaEdicao(produto) {
    window.scrollTo(0, 0);
    setProdutoId(produto.id);
    setNameProduct(produto.nameProduct);
    setDescription(produto.description);
    setCategory(produto.category);
    setPicture(produto.picture);
    setLinkVenda(produto.LinkVenda || "");
    setPicturePrimaria(produto.PictureFirst || "");
    setPictureSecundaria(produto.pictureSecond || "");
    setPictureTerciaria(produto.pictureThird || "");
    setPrice(
      parseFloat(produto.price).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
    setAdiconar(true);
  }

  function resetarFormulario() {
    setProdutoId(null);
    setNameProduct("");
    setDescription("");
    setCategory("");
    setPicture("");
    setPrice("R$ 0,00");
    setLinkVenda("");
    setPicturePrimaria("");
    setPictureSecundaria("");
    setPictureTerciaria("");
  }

  async function salvarProduto() {
    const precoLimpo = price.replace(/\D/g, "");
    const valorLimpo = Number(precoLimpo) / 100;

    const produto = {
      NameProduct: nameProduct,
      Description: description,
      Category: category,
      Picture: picture,
      Price: valorLimpo,
      LinkVenda: linkVenda,
      PictureFirst: PicturePrimaria,
      PictureSecond: PictureSecundaria,
      PictureThird: PictureTerciaria,
    };

    try {
      if (produtoId) {
        await axios.put(
          `https://api-store-g1mu.onrender.com/api/AdicionarProduto/AtualizarProduto/${produtoId}`,
          { ...produto, Id: produtoId }
        );
        alert("Produto editado com sucesso!");
      } else {
        await axios.post(
          "https://api-store-g1mu.onrender.com/api/AdicionarProduto/Products",
          produto
        );
        alert("Produto adicionado com sucesso!");
      }

      console.log(produto);
      getProducts();
      setAdiconar(false);
      resetarFormulario();
    } catch (error) {
      alert("Erro ao salvar produto!" + error.message);
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(
        `https://api-store-g1mu.onrender.com/api/AdicionarProduto/DeletarProduto/${id}`
      );
      alert("Produto deletado com sucesso!");
      getProducts();
    } catch (error) {
      alert("Erro ao deletar produto!" + error.message);
    }
  }
  console.log(product);

  return (
    <div className="adminHome">
      <div className="adminProducts">
        <IoIosAdd className="addProduct" onClick={() => Adicionar(true)} />
        {product.map((product) => (
          <div className="adminCards" key={product.id}>
            <picture>
              <img src={product.picture} alt="" />
            </picture>
            <p>{product.nameProduct}</p>
            <p className="description">{product.description}</p>
            <p>{product.category}</p>
            <p>
              {product?.price !== undefined
                ? parseFloat(product.price).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "R$ 0,00"}
            </p>
            <div className="iconsEditDelete">
              <button onClick={() => deleteProduct(product.id)}>
                <IoTrashBinOutline size={30} className="deleteProduct" />
              </button>

              <button onClick={() => viewPicture(product)}>
                <SlPicture size={30} className="viewProduct" />
              </button>

              <button onClick={() => carregarParaEdicao(product)}>
                <FiEdit className="editProduct" size={30} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {Adiconar && (
        <div className="addProduct">
          <IoIosCloseCircleOutline
            size={50}
            onClick={() => Adicionar(false)}
            className="close"
          />
          <div className="addContainer">
            <div className="Inputs">
              <label htmlFor="NameProduct">Nome Do Produto</label>
              <input
                type="text"
                id="NameProduct"
                value={nameProduct}
                onChange={(e) => setNameProduct(e.target.value)}
              />
            </div>

            <div className="Inputs">
              <label htmlFor="Imagem">Imagem</label>
              <input
                type="text"
                id="Imagem"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
              />
            </div>

            <div className="Inputs">
              <label htmlFor="Categoria">Categoria</label>
              <input
                type="text"
                id="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="Inputs">
              <label htmlFor="Preco">Preço</label>
              <input
                type="text"
                id="Preco"
                value={price}
                onChange={(e) => formatarMoeda(e, setPrice)}
              />
            </div>

            <div className="Inputs">
              <label htmlFor="Descricao">Descrição</label>
              <textarea
                type="text"
                id="Descricao"
                className="Descricao"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="Inputs">
              <label htmlFor="Venda">Link Da Venda</label>
              <input
                type="text"
                id="Venda"
                value={linkVenda}
                onChange={(e) => setLinkVenda(e.target.value)}
              />
            </div>

            <div className="Inputs">
              <label htmlFor="imagem1">Imagem Primaria</label>
              <input
                type="text"
                id="imagem1"
                value={PicturePrimaria}
                onChange={(e) => setPicturePrimaria(e.target.value)}
              />
            </div>

            <div className="Inputs">
              <label htmlFor="imagem2">Imagem Secundaria</label>
              <input
                type="text"
                id="imagem2"
                value={PictureSecundaria}
                onChange={(e) => setPictureSecundaria(e.target.value)}
              />
            </div>

            <div className="Inputs">
              <label htmlFor="imagem3">Imagem Terceira</label>
              <input
                type="text"
                id="imagem3"
                value={PictureTerciaria}
                onChange={(e) => setPictureTerciaria(e.target.value)}
              />
            </div>

            <button onClick={salvarProduto}>
              {produtoId ? "Salvar Edição" : "Adicionar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHome;

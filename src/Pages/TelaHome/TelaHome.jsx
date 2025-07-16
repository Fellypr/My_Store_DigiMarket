
import "./TelaHome.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineBook } from "react-icons/md";
import { LuTvMinimalPlay } from "react-icons/lu";
import { RiFileExcel2Fill } from "react-icons/ri";
import { IoSchoolSharp } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Loading from "../../Components/Loading/Loading";
import Cards from "../../Components/Cards/Cards";
function TelaHome() {
  const [produtos, setProdutos] = useState([]);
  const [produtosSelected, setProdutosSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  function selecionarProduto(produto) {
    setProdutosSelected(produto);
    console.log("Os produtos selecionados", produtosSelected);
  }
  async function buscarProdutos() {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5289/api/AdicionarProduto/BuscarProdutos"
      );

      setProdutos(response.data);
    } catch (error) {
      console.log("Erro ao buscar produtos", error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  const banner = [
    {
      id: 1,
      img: "img/Banner/Banner para loja de eletrônicos promoção desconto moderno preto e roxo.png",
    },
    {
      id: 2,
      img: "img/Banner/Simple Creative Mind Map Brainstorm.png",
    },
    {
      id: 3,
      img: "img/Banner/PLANILHAS.png",
    },
    {
      id: 4,
      img: "img/Banner/Unitv.png",
    }
  ];

  return (
    <div className="telaHome">
      <picture className="banner">
        <Swiper
          modules={[ Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
         
          className="mySwiper"
        >
          {banner.map((banner) => (
            <SwiperSlide key={banner.id} className="banner">
              <img src={banner.img} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </picture>

      <section>
        <div className="category">
          <h3>Categorias Disponivel</h3>
          <div className="categories">
            <div className="icons">
              <button className="btnIcon">
                <MdOutlineBook size={40} />
                <p>Ebooks</p>
              </button>
            </div>
            <div className="icons">
              <button className="btnIcon">
                <LuTvMinimalPlay size={40} />
                <p>Unitv</p>
              </button>
            </div>
            <div className="icons">
              <button className="btnIcon">
                <RiFileExcel2Fill size={40} />
                <p>Planilhas</p>
              </button>
            </div>
            <div className="icons">
              <button className="btnIcon">
                <IoSchoolSharp size={40} />
                <p>Mapas mentais</p>
              </button>
            </div>
          </div>
        </div>
        <div className="products">
          <h3>Produtos Disponivel</h3>
          <div className="cards" key={produtos.id}>
            {produtos.map((produtos) => (
              <Cards produtos={produtos} />
            ))}
          </div>
        </div>
      </section>
      {loading && <Loading />}
    </div>
  );
}

export default TelaHome;

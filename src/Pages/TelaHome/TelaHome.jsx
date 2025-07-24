import "./TelaHome.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineBook } from "react-icons/md";
import { LuTvMinimalPlay } from "react-icons/lu";
import { RiFileExcel2Fill } from "react-icons/ri";
import { IoSchoolSharp } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Loading from "../../Components/Loading/Loading";
import Cards from "../../Components/Cards/Cards";
function TelaHome() {
  const [produtos, setProdutos] = useState([]);
  const [produtosSelected, setProdutosSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const [slidePreview, setSlidePreview] = useState(4);

  useEffect(() => {
    function atualizarSlides() {
      if (window.innerWidth <= 470) {
        setSlidePreview(2);
      } else if (window.innerWidth <= 1250) {
        setSlidePreview(3);
      } else {
        setSlidePreview(4);
      }
    }
    atualizarSlides();

    window.addEventListener("resize", atualizarSlides);

    return () => {
      window.removeEventListener("resize", atualizarSlides);
    };
  }, []);

  function selecionarProduto(produto) {
    setProdutosSelected(produto);
  }
  async function buscarProdutos() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api-store-g1mu.onrender.com/api/AdicionarProduto/BuscarProdutos"
      );

      setProdutos(response.data);
    } catch (error) {
      console.log("Erro ao buscar produtos", error);
    } finally {
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
      id: 3,
      img: "img/Banner/PLANILHAS.png",
    },
    {
      id: 4,
      img: "img/Banner/Banner_Com_Numero.png",
    },
  ];

  const categoria = [...new Set(produtos.map((p) => p.category))];

  return (
    <div className="telaHome">
      <picture className="banner">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
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
          <div className="categories">
            <div className="icons">
              <button className="btnIcon">
                <MdOutlineBook className="iconsCategory" />
                <p>Ebooks</p>
              </button>
            </div>
            <div className="icons">
              <button className="btnIcon">
                <LuTvMinimalPlay className="iconsCategory" />
                <p>Tv Digital</p>
              </button>
            </div>
            <div className="icons">
              <button className="btnIcon">
                <RiFileExcel2Fill className="iconsCategory" />
                <p>Planilhas</p>
              </button>
            </div>
            <div className="icons">
              <button className="btnIcon">
                <IoSchoolSharp className="iconsCategory" />
                <p>Mapas mentais</p>
              </button>
            </div>
          </div>
        </div>
        <div className="products">
          {categoria.map((categoria) => (
            <div key={categoria} className="cardsCategory">
              <h3 className="titleCategory">{categoria}</h3>
              <br />
              <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={slidePreview}
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true }}
                className="mySwiperCard"
              >
                <div className="cards">
                  {produtos
                    .filter((produtos) => produtos.category === categoria)
                    .map((produtos) => (
                      <SwiperSlide key={produtos.id}>
                        <Cards produtos={produtos} />
                      </SwiperSlide>
                    ))}
                </div>
              </Swiper>
            </div>
          ))}
          
        </div>
      </section>
      <div className={loading ? "loading" : ""}>
          {loading && <Loading />}
      </div>
    </div>
  );
}

export default TelaHome;

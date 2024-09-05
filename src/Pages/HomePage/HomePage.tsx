import { Header } from "../../components/Header/Header";
import axios from "axios";
import "./HomePage.css";
import { useQuery } from "@tanstack/react-query";
import { ProductsData } from "../../type/type";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const fetchPosts = async () => {
  const response = await axios.get(`https://fakestoreapi.com/products`);
  console.log(response);
  return response.data;
};

const chunkArray = (array: ProductsData[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export function HomePage() {
  const { data: storeData, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const productChunks = chunkArray(storeData, 4);
  // può essere interessante usare anche un altra API dal momento che posso mescolare i gruppi usando la stessa logica.

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      <div className="header">
        <Header />
      </div>

      <div className="slide">
        <Slider {...settings}>
          {storeData.map((product: ProductsData) => (
            <div key={product.id} className="productSlideItem">
              <Link key={product.id} to={`/product/${product.id}`}>
                
                <img src={product.image} alt="" className="ImagineSlide" />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      <div className="productList">
        {productChunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="card">
            <div className="cardRow">
              {chunk.slice(0, 2).map((product: ProductsData) => (
                <div key={product.id} className="product">
                  <div className="nomeProdotto"> {product.title}</div>

                  {product.image ? (
                    <Link key={product.id} to={`/product/${product.id}`}>
                      <img src={product.image} alt="product cover" />
                    </Link>
                  ) : (
                    <p>No cover available</p>
                  )}
                </div>
              ))}
            </div>
            <div className="cardRow">
              {chunk.slice(2, 4).map((product: ProductsData) => (
                <div key={product.id} className="product">
                  <div className="nomeProdotto"> {product.title}</div>
                  {product.image ? (
                    <img src={product.image} alt="product cover" />
                  ) : (
                    <p>No cover available</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
// come background nel sito in index.css, sarebbe interessanter fas sfumare da sinistra a destra il verde acqua fino al bianco.
// gli oggetti ottenuti devono essere linkabili e devono portare alla pagina specifica

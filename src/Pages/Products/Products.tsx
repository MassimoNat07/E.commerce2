import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../../components/Header/Header";
import axios from "axios";
import { useState } from "react";
import { ProductDetails } from "../../type/type";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const fetchProductDetails = async (productId: string) => {
  const response = await axios.get(
    `https://fakestoreapi.com/products/${productId}`
  );
  return response.data;
};

export const Products = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const { data: productDetails } = useQuery({
    queryKey: ["productDetails", productId],
    queryFn: () => fetchProductDetails(productId || ""),
  });

  const [cart, setCart] = useState<ProductDetails[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const dataSignInHeader = localStorage.getItem("DataSignIn");
  const isAuthenticated = !!dataSignInHeader; //const isAuthenticated = dataSignInHeader ? true : false;

  const [buy, setBuy] = useState<ProductDetails[]>(() => {
    const storedBuy = localStorage.getItem("buy");
    return storedBuy ? JSON.parse(storedBuy) : [];
  });

  const addToCart = () => {
    if (productDetails) {
      const updatedCart = [...cart, productDetails];
      setCart(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      navigate("/insideCart");
    }
  };

  const buyNow = () => {
    if (isAuthenticated && productDetails) {
      const updatedBuy = [...buy, productDetails];
      setBuy(updatedBuy);

      localStorage.setItem("buy", JSON.stringify(updatedBuy));
      navigate("/confirmation");
    } else {
      navigate("/enter");
    }
  };

  const dataSignInAside = localStorage.getItem("DataSignIn");
  const SignInAside = dataSignInAside ? JSON.parse(dataSignInAside) : null;

  return (
    <>
      <Header />
      <div className="productDetails">
        {productDetails && (
          <div className="details">
            <div>
              <img
                src={productDetails.image}
                alt={productDetails.title}
                className="image"
              />
            </div>
          </div>
        )}

        <div className="descriptionProduct">
          <div>
            <h1 className="title">{productDetails?.title}</h1>
          </div>

          <p>{productDetails?.description}</p>
          <p className="price">{productDetails?.price}€</p>
        </div>

        <aside className="spedizione">
          <p>Invia a :</p>
          <div className="spedizioneIndirizzo">
            <p>{SignInAside?.Indirizzo},</p>
            <p>{SignInAside?.Civico}</p>
          </div>
          <div className="spedizioneCittà">
            <p>{SignInAside?.Città},</p>
            <p>{SignInAside?.CAP}</p>
          </div>
          <p>Arrivo entro: Data da definire</p>

          <p className="price">{productDetails?.price}€</p>
        </aside>
      </div>

      <div className="buttonSell">
        <button className="buttonBuy" onClick={buyNow}>
          Acquista ora
        </button>
        <button className="buttonBuy" onClick={addToCart}>
          Aggiungi al carrello
        </button>
      </div>
    </>
  );
};

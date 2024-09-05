import { useState, useEffect } from "react";
import { ProductDetails } from "../../type/type";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import "./Cart.css";

export function Cart() {
  const [cartProducts, setCartProducts] = useState<ProductDetails[]>([]);

    const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
  }, []);

  const handlePurchase = () => {
    navigate("/confirmation");
  };


  const handleRemove = (productId: number) => {
    const updatedCart = cartProducts.filter(
      (product) => product.id !== productId
    );
    setCartProducts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cartProducts.reduce(
    (acc: number, product: ProductDetails) => acc + product.price,
    0
  );

  return (
    <>
      <Header />
      <div className="cartPage">
        <h1 className="cartName">Carrello</h1>
        {cartProducts.length === 0 ? (
          <p>Il carrello è vuoto</p>
        ) : (
          <>
            <div className="cartProducts">
              {cartProducts.map((product: ProductDetails) => (
                <div key={product.id} className="cartProduct">
                  <p>{product.title}</p>
                  <div className="cartProductDetails">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="imageCart"
                    />
                    <div className=" RemoveAndPrice">
                      <div className="cartPrice">{product.price} €</div>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="removeButton"
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="totalPrice">
              <h2>Prezzo Totale: {totalPrice} €</h2>
            </div>
            <button onClick={handlePurchase} className="purchaseButton">
              Acquista
            </button>
          </>
        )}
      </div>
    </>
  );
} // cardare i prodotti nel carrello, quando aggiungi al carrello deve esserci un altra pagina che ti dice che è stato aggiunto al carrello

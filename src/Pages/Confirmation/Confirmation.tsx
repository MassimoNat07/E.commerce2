import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductDetails } from "../../type/type";
import "./Confirmation.css";

export function Confirmation() {
  const [cartProducts, setCartProducts] = useState<ProductDetails[]>([]);
  const [storedBuy, setBuyProduct] = useState<ProductDetails[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedBuy = localStorage.getItem("buy");
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
    if (storedBuy) setBuyProduct(JSON.parse(storedBuy));
  }, []);

  const handleConfirm = () => {
    if (storedBuy) {
      const storedOrders = localStorage.getItem("orders");
      const currentOrders = storedOrders ? JSON.parse(storedOrders) : [];
      const newOrders = [...currentOrders, ...storedBuy];
      localStorage.setItem("orders", JSON.stringify(newOrders));
      localStorage.removeItem("buy");
      setBuyProduct([]);
      navigate("/success");
    }
    if (cartProducts) {
      const storedOrders = localStorage.getItem("orders");
      const currentOrders = storedOrders ? JSON.parse(storedOrders) : [];
      const newOrders = [...currentOrders, ...cartProducts];
      localStorage.setItem("orders", JSON.stringify(newOrders));
      localStorage.removeItem("cart");

      setCartProducts([]);

      navigate("/success");
    }
  };

  const handleCancel = () => {
    navigate("/cart");
  };

  return (
    <div className="confirmationPage">
      <h1>Conferma Acquisto</h1>
      <p>Sei sicuro di voler completare l'acquisto?</p>
      <button onClick={handleConfirm} className="confirmButton">
        Conferma
      </button>
      <button onClick={handleCancel} className="cancelButton">
        Annulla
      </button>
    </div>
  );
}

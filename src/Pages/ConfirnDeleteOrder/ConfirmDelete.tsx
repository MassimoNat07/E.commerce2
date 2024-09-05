import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductDetails } from "../../type/type";
import { Header } from "../../components/Header/Header";
export function ConfirmationDelete() {
  const [orders, setOrders] = useState<ProductDetails[]>([]);

  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const handleRemove = () => {
    const updatedOrder = orders.filter(
      (product) => product.id !== Number(orderId)
    );
    setOrders(updatedOrder);
    localStorage.setItem("orders", JSON.stringify(updatedOrder));
    navigate("/cancel");
  };

  const handleCancel = () => {
    navigate("/order");
  };

  const order = orders.find((product) => product.id === Number(orderId));

  if (!order) {
    return <p>Ordine non trovato.</p>;
  }

  return (
    <>
      <Header />
      <div className="confirmationPage">
        <h1>Cancellazione Ordine</h1>
        <p>Sei sicuro di voler annullare l'ordine di {order.title}? </p>
        <img src={order.image} alt={order.title} className="orderImage" />
        <p>{order.price} €</p>

        <button onClick={handleRemove} className="confirmButton">
          Sì, annulla
        </button>
        <button onClick={handleCancel} className="cancelButton">
          No, torna indietro
        </button>
      </div>
    </>
  );
}

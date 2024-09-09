import { useEffect, useState } from "react";
import { ProductDetails } from "../../type/type";
import { Header } from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
//import "./Orders.css";

export function Order() {
  const [orders, setOrders] = useState<ProductDetails[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const handleNavigateToDelete = (productId: number) => {
    navigate(`/deleteOrder/${productId}`);
  };

  return (
    <>
      <Header />

      <div className="ordersPage">
        <h1>I tuoi ordini</h1>
        {orders.length === 0 ? (
          <p>Non hai ancora effettuato ordini.</p>
        ) : (
          <div className="orderList">
            {orders.map((order) => (
              <div key={order.id} className="orderItem">
                <p>{order.title}</p>
                <img
                  src={order.image}
                  alt={order.title}
                  className="orderImage"
                />
                <p>{order.price} €</p>
                <div className="removeOrder">
                  <button
                    onClick={() => handleNavigateToDelete(order.id)}
                    className="removeButton"
                  >
                    Annulla Ordine
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
} 


// sistemare il profilo

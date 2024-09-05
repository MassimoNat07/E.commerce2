import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CancelOrder.css"
import { Header } from "../../components/Header/Header";

export function CancelOrder() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/order");
    }, 3000); // 3000 ms = 3 secondi

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="successPage">
        <h1 className="DeleteSuccess">Ordine annullato con successo!</h1>
      </div>
    </>
  );
}



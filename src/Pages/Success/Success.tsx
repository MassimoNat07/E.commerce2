import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import "./Success.css";

export function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/order");
    }, 3000); // 3000 ms = 3 secondi

    return () => clearTimeout(timer); // Pulire il timer se il componente si smonta
  }, [navigate]);

  return (
    <div className="successPage">
      <h1>Acquisto completato con successo!</h1>
      <p>
        Grazie per il tuo acquisto. Verrai reindirizzato agli ordini a breve.
      </p>
    </div>
  );
}

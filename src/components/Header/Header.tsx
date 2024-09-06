import "./Header.css";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Header() {
  const dataSignInHeader = localStorage.getItem("DataSignIn");
  const SignInHeader = dataSignInHeader ? JSON.parse(dataSignInHeader) : null;

  const [isAuthenticated, setIsAuthenticated] = useState(!!SignInHeader);

  const handleLogOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("DataSignIn"); // Rimuove i dati dal localStorage
  };

  return (
    <div className="header">
      <div className="sideBar">
        <nav>
          {isAuthenticated ? (
            SignInHeader ? ( // Controlla che SignInHeader non sia null
              <>
                <div className="AccessName">
                  <Link to="/profile">
                    <p>Ciao {`${SignInHeader.nome} ${SignInHeader.cognome}`}</p>
                  </Link>
                  <button className="log-out" onClick={handleLogOut}>
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <Link to="/enter">
                <button className="ButtonAccess"> Accedi </button>
              </Link>
            )
          ) : (
            <Link to="/enter">
              <button className="ButtonAccess"> Accedi </button>
            </Link>
          )}
          {isAuthenticated ? (
            <Link to="/order">
              <p className="routeHeader">Ordini</p>
            </Link>
          ) : (
               <p></p>
          )}

          <Link to="/film">
            <p className="routeHeader">Film</p>
          </Link>
          <Link to="/libri">
            <p className="routeHeader">Libri</p>
          </Link>
          <Link to="/electronics">
            <p className="routeHeader">Tecnologia</p>
          </Link>
          <Link to="/jewelery">
            <p className="routeHeader">Gioielli</p>
          </Link>
          <Link to="/men's clothing">
            <p className="routeHeader">Uomo</p>
          </Link>
          <Link to="/women's clothing">
            <p className="routeHeader">Donna</p>
          </Link>
          <Link to="/cart" className="cart">
            <IoCart />
          </Link>
        </nav>
      </div>
      <div>
        <h1>
          <link
            href="https://fonts.googleapis.com/css2?family=Merienda:wght@300..900&display=swap"
            rel="stylesheet"
          ></link>
          <Link to="http://localhost:5173/" className="SiteTitle">
            Lightshop.com
          </Link>
        </h1>
      </div>
    </div>
  );
}

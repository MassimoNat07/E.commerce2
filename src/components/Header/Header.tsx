import "./Header.css";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Header() {
  const dataSignInHeader = localStorage.getItem("DataSignIn");
  const SignInHeader = dataSignInHeader ? JSON.parse(dataSignInHeader) : null;

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogOut = () => {
    setIsAuthenticated(false);
  };
  // il log out funziona, solo che se aggiorno la pag, mi logga di nuovo dentro. altrimenti devo eliminare i dati nel storage iscrivendomi da capo, oppure implementare la rotta privata quando è loggata e la rotta pubblica quando non sei loggato, in modo che quiando esci con il log out vai alla rotta pubblicadel home page/ oppure lo fai nel server che ha piu senso

  return (
    <>
      <div className="header">
        <div className="sideBar">
          <nav>
            {isAuthenticated ? (
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
            )}
            {isAuthenticated ? (
              <>
                <Link to="/order">
                  <p className="routeHeader">Ordini</p>
                </Link>
              </>
            ) : (
              <Link to="/enter">
                <p className="routeHeader">Ordini(togliere?)</p>
              </Link>
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
    </>
  );
}

// barra di ricerca? può essere utile inserirla
// all'inzio della nav deve esserci il pulsante accedi, questo pulsante deve collegarsi al link del attuale firtpage (enterPage). quando avviene l'accesso deve uscire il link del profilo con il nome utente e il pulsante di log out.

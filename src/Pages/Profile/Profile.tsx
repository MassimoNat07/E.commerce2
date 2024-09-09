import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { ProductDetails } from "../../type/type";

import "./Profile.css";

export const Profile = () => {
  const dataSignInProfile = localStorage.getItem("DataSignIn");
  const SignInProfile = dataSignInProfile
    ? JSON.parse(dataSignInProfile)
    : null;

  const storedOrders = localStorage.getItem("orders");
  const profileOrders: ProductDetails[] = storedOrders ? JSON.parse(storedOrders) : [];

  const intoTheCart = localStorage.getItem("cart");
  const profileCart: ProductDetails[] = intoTheCart ? JSON.parse(intoTheCart) : [];

  return (
    <>
      <Header />
      <div className="profileUser">
        <p className="profileName">
          <CgProfile className="profileIcon" /> {SignInProfile?.nome} {SignInProfile?.cognome}
        </p>
      </div>
      <div className="conteinerItem">
        <div className="dataEditProfile">
          <div className="profileCardData">
            <p>{SignInProfile?.email}</p>
            <p>{SignInProfile?.Città}</p>
            <p>{SignInProfile?.CAP}</p>
            <p>
              {SignInProfile?.indirizzo} {SignInProfile?.civico}
            </p>
            <p>{SignInProfile?.numero}</p>
          </div>

          <div className="profileCardDataCredit">
            <p>{SignInProfile?.payment}</p>
            <p>{SignInProfile?.numeroCarta}</p>
            <p>{SignInProfile?.creditOption}</p>
          </div>
          <Link to="/edit-profile">
            <button>Modifica Dati</button>
          </Link>
        </div>

        <div className="profileOrder">
          <h2>Ordini</h2>
          {profileOrders.length > 0 ? (
            profileOrders.map((order: ProductDetails, index: number) => (
              <div key={index} className="orderItem">
                <img
                  src={order.image}
                  alt="Immagine dell'ordine"
                  className="profileOrderImage"
                />
                <p className="profileOrderTitle">
                  {order.title || "Titolo non disponibile"}
                </p>
              </div>
            ))
          ) : (
            <p>Nessun ordine effettuato</p>
          )}
        </div>
        <div className="ProfileCart">
          <h2>Carrello</h2>
          {profileCart.length > 0 ? (
            profileCart.map((cart: ProductDetails, index: number) => (
              <div key={index} className="cartItem">
                <img
                  src={cart.image}
                  alt="Immagine del prodotto"
                  className="profileCartImage"
                />
                <p className="profileCartTitle">
                  {cart.title || "Titolo non disponibile"}
                </p>
              </div>
            ))
          ) : (
            <p>Il carrello è vuoto</p>
          )}
        </div>
      </div>
    </>
  );
};

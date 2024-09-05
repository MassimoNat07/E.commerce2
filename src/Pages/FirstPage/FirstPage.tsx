import { Link } from "react-router-dom";
import "./FirstPage.css";

export function FirstPage() {
  return (
    <>
      <div className="firstPage">
        <h1 className="enterPageTitle"> Lightshop.com</h1>

        <button className="firstPageButton">
          <Link to="/sign-in">
            <p> Registrati</p>
          </Link>
        </button>

        <p className="oppure">o</p>

        <button className="firstPageButton">
          <Link to="/log-in">
            <p> Accedi </p>
          </Link>
        </button>
      </div>
    </>
  );
}

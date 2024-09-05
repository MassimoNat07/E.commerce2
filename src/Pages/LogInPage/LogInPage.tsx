import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUserContext";
import "./LogInPage.css";

export function LogInPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(CurrentUserContext);

  const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataLogIn = e.target as HTMLFormElement;
    const dataLogInEmail = dataLogIn.email.value;
    const dataLogInPassword = dataLogIn.password.value;

    const savedDataSignIn = localStorage.getItem("DataSignIn") ?? "";
    const savedData = JSON.parse(savedDataSignIn);

    if (
      savedData.email === dataLogInEmail &&
      savedData.password === dataLogInPassword
    ) {
      setUser(savedData);
      navigate("/");
    } else {
      alert("Credenziali errate");
    }
  };
  return (
    <>
      <h1 className="LogInTitle"> Lightshop.com</h1>
      <form onSubmit={handleLogIn} className="logInForm">
        <div>
          <label>
            <input type="text" name="email" placeholder="Email" required  className="loginInput"/>
          </label>
        </div>
        <div>
          <label>
            <input
              type="text"
              name="password"
              placeholder="Password"
              required
               className="loginInput"
            />
          </label>
        </div>

        <button type="submit" className="buttonLogIn">
          Invia
        </button>
      </form>
    </>
  );
}

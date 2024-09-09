// EditProfile.js
import { useState,ChangeEvent  } from "react";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const dataSignInProfile = localStorage.getItem("DataSignIn");
  const SignInProfile = dataSignInProfile
    ? JSON.parse(dataSignInProfile)
    : null;

  const [profileData, setProfileData] = useState({
    nome: SignInProfile?.nome || "",
    cognome: SignInProfile?.cognome || "",
    email: SignInProfile?.email || "",
    città: SignInProfile?.Città || "",
    CAP: SignInProfile?.CAP || "",
    indirizzo: SignInProfile?.Indirizzo || "",
    civico: SignInProfile?.Civico || "",
    numero: SignInProfile?.Numero || "",
    payment: SignInProfile?.Payment || "",
    numeroCarta: SignInProfile?.numeroCarta || "",
    creditOption: SignInProfile?.CreditOption || "",
  });

  const navigate = useNavigate();


  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

 
  const saveProfile = () => {
    localStorage.setItem("DataSignIn", JSON.stringify(profileData));
    alert("Dati salvati con successo!");
    navigate("/profile"); 
  };

  return (
    <div className="editProfile">
      <h2>Modifica il profilo</h2>
      <label>Nome:</label>
      <input
        type="text"
        name="nome"
        value={profileData.nome}
        onChange={handleChange}
      />

      <label>Cognome:</label>
      <input
        type="text"
        name="cognome"
        value={profileData.cognome}
        onChange={handleChange}
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={profileData.email}
        onChange={handleChange}
      />

      <label>Città:</label>
      <input
        type="text"
        name="città"
        value={profileData.città}
        onChange={handleChange}
      />

      <label>CAP:</label>
      <input
        type="text"
        name="CAP"
        value={profileData.CAP}
        onChange={handleChange}
      />

      <label>Indirizzo:</label>
      <input
        type="text"
        name="indirizzo"
        value={profileData.indirizzo}
        onChange={handleChange}
      />

      <label>Civico:</label>
      <input
        type="text"
        name="civico"
        value={profileData.civico}
        onChange={handleChange}
      />

      <label>Numero:</label>
      <input
        type="text"
        name="numero"
        value={profileData.numero}
        onChange={handleChange}
      />

      {/* Dati della carta di credito */}
      <label>Metodo di pagamento:</label>
      <input
        type="text"
        name="payment"
        value={profileData.payment}
        onChange={handleChange}
      />

      <label>Numero Carta:</label>
      <input
        type="text"
        name="numeroCarta"
        value={profileData.numeroCarta}
        onChange={handleChange}
      />

      <label>Opzione di Credito:</label>
      <input
        type="text"
        name="creditOption"
        value={profileData.creditOption}
        onChange={handleChange}
      />

      <button onClick={saveProfile}>Salva Modifiche</button>
    </div>
  );
};

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./SignInPage.css";
import axios from "axios";
import { NationsType } from "../../type/type";

const fetchPostsRegioni = async () => {
  const responseRegioni = await axios.get(
    `http://api.geonames.org/childrenJSON?geonameId=3175395&username=massimo276567`
  );

  return responseRegioni.data.geonames;
};

const fetchPostsProvince = async (region: string) => {
  const responseProvince = await axios.get(
    `http://api.geonames.org/childrenJSON?geonameId=${region}&username=massimo276567`
  );
  return responseProvince.data.geonames;
};

const fetchPostsCity = async (province: string) => {
  const responseCity = await axios.get(
    `http://api.geonames.org/childrenJSON?geonameId=${province}&username=massimo276567`
  );
  return responseCity.data.geonames;
};

export function SignInPage() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectPayament, setSelectPayament] = useState("");
  const [creditOption, setCreditOption] = useState("");

  const { data: regionsData } = useQuery({
    queryKey: ["regions"],
    queryFn: fetchPostsRegioni,
  });

  const { data: provinceData } = useQuery({
    queryKey: ["province", selectedRegion],
    queryFn: () => fetchPostsProvince(selectedRegion),
    enabled: !!selectedRegion,
  });

  const { data: cityData } = useQuery({
    queryKey: ["city", selectedProvince],
    queryFn: () => fetchPostsCity(selectedProvince),
    enabled: !!selectedProvince,
  });

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const DataSignIn = {
      nome: form.Nome.value,
      cognome: form.Cognome.value,
      email: form.Email.value,
      password: form.Password.value,
      regione: form.Regione.value,
      provincia: form.Provincia.value,
      Città: form.Città.value,
      CAP: form.CAP.value,
      indirizzo: form.Indirizzo.value,
      civico: form.Civico.value,
      numero: form.Numero.value,
      payment: form.Payment.value,
      numeroCarta: form.numeroCarta.value,
      cvc: form.cvc.value,
      creditOption: creditOption,
    };
    localStorage.setItem("DataSignIn", JSON.stringify(DataSignIn));
    navigate("/");
  };

  return (
    <>
      <h1 className="SignInTitle">Lightshop.com</h1>
      <form onSubmit={handleSubmit} className="formSignIn">
        <label>
          <input
            type="text"
            placeholder="Nome"
            name="Nome"
            required
            className="inputFormSignin"
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Cognome"
            name="Cognome"
            required
            className="inputFormSignin"
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Email"
            name="Email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
            className="inputFormSignin"
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            name="Password"
            className="inputFormSignin"
            required
          />
        </label>
        <label>
          <select
            name="Regione"
            id="Regione"
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="selectForm"
            required
          >
            <option value="">Seleziona la tua Regione</option>
            {regionsData?.map((region: NationsType) => (
              <option key={region.geonameId} value={region.geonameId}>
                {region.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <select
            name="Provincia"
            id="Provincia"
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="selectForm"
            required
          >
            <option value="">Seleziona la tua provincia</option>
            {provinceData?.map((province: NationsType) => (
              <option key={province.geonameId} value={province.geonameId}>
                {province.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <select name="Città" id="Città" className="selectForm" required>
            <option value="">Seleziona la Città</option>
            {cityData?.map((city: NationsType) => (
              <option key={city.geonameId} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <input
            type="text"
            placeholder="CAP"
            name="CAP"
            pattern="[0-9]{5}"
            required
            className="inputFormSignin"
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Via o piazza"
            name="Indirizzo"
            className="indirizzo"
            required
          />
          <input
            type="text"
            name="Civico"
            placeholder="Civico"
            className="civico"
            pattern="[0-9]{1,3}"
            required
          />
        </label>
        <label>
          <input
            type="tel"
            placeholder="Numero di telefono"
            name="Numero"
            pattern="[0-9]{10}"
            required
            className="inputFormSignin"
          />
        </label>
        <label>
          <select
            name="Payment"
            id="Pagamento"
            onChange={(e) => setSelectPayament(e.target.value)}
            className="selectForm"
            required
          >
            <option value="">Metodo di pagamento</option>
            <option value="Carta">Carta di credito</option>
          </select>
        </label>

        {selectPayament === "Carta" && (
          <div className="payment">
            <input
              type="text"
              name="numeroCarta"
              placeholder="numero carta"
              className="inputFormSignin"
              /*     pattern="^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|2(?:22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[01][0-9]|720)[0-9]{12}|3[47][0-9]{13})$" */
              required
            />
            <div className="radioPayment">
              <label className="mastercard">
                <p>Visa</p>
                <input
                  type="radio"
                  name="CreditOption"
                  value="Visa"
                  onChange={(e) => setCreditOption(e.target.value)}
                  className="radiocard"
                />
              </label>
              <label className="mastercard">
                <p>Mastercard</p>
                <input
                  type="radio"
                  name="CreditOption"
                  value="Mastercard"
                  className="radiocard"
                  onChange={(e) => setCreditOption(e.target.value)}
                />
              </label>

              <input
                type="text"
                name="cvc"
                placeholder="CVC"
                className="cvc"
                pattern="\d{3}"
                maxLength={3}
                minLength={3}
                required
              />
            </div>
          </div>
        )}

        <button type="submit" className="buttonSignIn">
          invia
        </button>
      </form>
    </>
  );
} // sistemare css del visa mastercard radio , Attualmente viene salvato nolo i l nome della città, mentre per le regioni e le provincie vengono salvate il numero id. bisogn fare un use state per ogni nome . Inserire anche la via e il numero civico*

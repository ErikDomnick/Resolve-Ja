import { useState } from "react";
import styles from "./FormAcompanhar.module.css";
import Aviso from "../../ui_components/aviso/Aviso";

// idInicial/emailInicial chegam pela URL (/acompanhar?id=1&email=...) ou vazios
function FormAcompanhar({ idInicial, emailInicial, carregando, aoConsultar }) {
  const [id, setId] = useState(idInicial);
  const [email, setEmail] = useState(emailInicial);
  const [erro, setErro] = useState("");

  const enviar = (e) => {
    e.preventDefault();

    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
      setErro("Informe o número da ocorrência.");
      return;
    }
    if (email.trim() === "") {
      setErro("Informe o e-mail usado no relato.");
      return;
    }

    setErro("");
    aoConsultar(Number(id), email.trim().toLowerCase());
  };

  return (
    <form onSubmit={enviar} noValidate className={styles["form-acompanhar"]}>
      <label>
        Número da ocorrência
        <input type="number" min="1" placeholder="Ex.: 12" value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <label>
        E-mail usado no relato
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <button type="submit" disabled={carregando}>
        {carregando ? "Consultando..." : "Consultar"}
      </button>

      {erro && <Aviso>{erro}</Aviso>}
    </form>
  );
}

export default FormAcompanhar;

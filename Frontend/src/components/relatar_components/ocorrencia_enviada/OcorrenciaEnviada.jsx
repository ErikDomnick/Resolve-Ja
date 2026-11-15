import { Link } from "react-router-dom";
import styles from "./OcorrenciaEnviada.module.css";

function OcorrenciaEnviada({ ocorrencia, aoNovaOcorrencia }) {
  return (
    <div className={styles["enviada"]}>
      <h2>Relato enviado!</h2>
      <p>Guarde o número da sua ocorrência:</p>
      <strong className={styles["numero"]}>#{ocorrencia.id}</strong>
      <p>
        Para acompanhar, use esse número e o e-mail <strong>{ocorrencia.user.email}</strong>. Ela também ficou salva neste aparelho.
      </p>

      <div className={styles["botoes"]}>
        <Link to={`/acompanhar?id=${ocorrencia.id}&email=${encodeURIComponent(ocorrencia.user.email)}`}>
          <button type="button">Acompanhar</button>
        </Link>
        <button type="button" className={styles["secundario"]} onClick={aoNovaOcorrencia}>
          Relatar outro problema
        </button>
      </div>
    </div>
  );
}

export default OcorrenciaEnviada;

import styles from "./ResultadoOcorrencia.module.css";
import Selo from "../../ui_components/selo/Selo";
import { formatarData } from "../../../utils/format";
import { STATUS } from "../../../utils/constantes";

// Etapas "normais" do atendimento. REJEITADA fica fora do caminho e aparece como aviso.
const ETAPAS = STATUS.filter((s) => s.valor !== "REJEITADA");

function ResultadoOcorrencia({ ocorrencia }) {
  const etapaAtual = ETAPAS.findIndex((e) => e.valor === ocorrencia.status);

  return (
    <div className={styles["resultado"]}>
      <div className={styles["cabecalho"]}>
        <h2>Ocorrência #{ocorrencia.id}</h2>
        <Selo tipo="status" valor={ocorrencia.status} />
        <Selo tipo="prioridade" valor={ocorrencia.prioridade} />
      </div>

      <p>
        <strong>{ocorrencia.categoria}</strong> - enviada em {formatarData(ocorrencia.createdAt)}
      </p>
      <p className={styles["descricao"]}>{ocorrencia.descricao}</p>

      {etapaAtual === -1 ? (
        <p className={styles["rejeitada"]}>Esta ocorrência foi rejeitada pela equipe.</p>
      ) : (
        <ol className={styles["etapas"]}>
          {ETAPAS.map((etapa, i) => (
            <li key={etapa.valor} className={i <= etapaAtual ? styles["feita"] : ""}>
              {etapa.rotulo}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default ResultadoOcorrencia;

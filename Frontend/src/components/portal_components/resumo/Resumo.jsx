import styles from "./Resumo.module.css";
import { STATUS } from "../../../utils/constantes";

// Barra horizontal: a largura é a proporção do valor em relação ao total
function Barra({ rotulo, valor, total }) {
  const porcentagem = total > 0 ? (valor / total) * 100 : 0;

  return (
    <li className={styles["barra"]}>
      <span className={styles["barra-rotulo"]}>{rotulo}</span>
      <div className={styles["barra-trilho"]}>
        <div className={styles["barra-preenchida"]} style={{ width: `${porcentagem}%` }} />
      </div>
      <span className={styles["barra-valor"]}>{valor}</span>
    </li>
  );
}

function Resumo({ resumo }) {
  const resolvidas = resumo.porStatus.RESOLVIDA;
  const taxa = resumo.total > 0 ? Math.round((resolvidas / resumo.total) * 100) : 0;

  const cartoes = [
    { rotulo: "Ocorrências", valor: resumo.total },
    { rotulo: "Últimos 30 dias", valor: resumo.ultimos30Dias },
    { rotulo: "Resolvidas", valor: `${taxa}%` },
    { rotulo: "Cidadãos", valor: resumo.usuarios },
  ];

  return (
    <div className={styles["resumo"]}>
      <div className={styles["cartoes"]}>
        {cartoes.map((c) => (
          <div key={c.rotulo} className={styles["cartao"]}>
            <strong>{c.valor}</strong>
            <span>{c.rotulo}</span>
          </div>
        ))}
      </div>

      <div className={styles["graficos"]}>
        <div>
          <h2>Por status</h2>
          <ul>
            {STATUS.map((s) => (
              <Barra key={s.valor} rotulo={s.rotulo} valor={resumo.porStatus[s.valor]} total={resumo.total} />
            ))}
          </ul>
        </div>

        <div>
          <h2>Por categoria</h2>
          {resumo.porCategoria.length === 0 ? (
            <p className={styles["vazio"]}>Sem dados ainda.</p>
          ) : (
            <ul>
              {resumo.porCategoria.slice(0, 6).map((c) => (
                <Barra key={c.categoria} rotulo={c.categoria} valor={c.total} total={resumo.total} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Resumo;

import styles from "./Selo.module.css";
import { rotuloStatus, rotuloPrioridade } from "../../../utils/format";

// tipo: "status" ou "prioridade". O valor (ex.: EM_ANDAMENTO) escolhe a cor.
function Selo({ tipo, valor }) {
  const rotulo = tipo === "status" ? rotuloStatus(valor) : rotuloPrioridade(valor);

  return <span className={`${styles["selo"]} ${styles[valor.toLowerCase()]}`}>{rotulo}</span>;
}

export default Selo;

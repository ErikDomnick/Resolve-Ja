import styles from "./ItemSalvo.module.css";
import { formatarData } from "../../../utils/format";

function ItemSalvo({ item, aoConsultar, aoRemover }) {
  return (
    <li className={styles["item"]}>
      <div className={styles["info"]}>
        <strong>
          #{item.id} - {item.categoria}
        </strong>
        <span className={styles["detalhe"]}>
          {formatarData(item.criadaEm)} - {item.email}
        </span>
      </div>

      <div className={styles["botoes"]}>
        <button onClick={() => aoConsultar(item.id, item.email)}>Consultar</button>
        <button className={styles["remover"]} onClick={() => aoRemover(item.id)}>
          Esquecer
        </button>
      </div>
    </li>
  );
}

export default ItemSalvo;

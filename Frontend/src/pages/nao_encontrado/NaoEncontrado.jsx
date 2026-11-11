import styles from "./NaoEncontrado.module.css";
import useTitulo from "../../hooks/useTitulo";

function NaoEncontrado() {
  useTitulo("Página não encontrada");

  return <h1 className={styles["deixar-centro"]}>404 (Not Found) - Página não encontrada</h1>;
}

export default NaoEncontrado;

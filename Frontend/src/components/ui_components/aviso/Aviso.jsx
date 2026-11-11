import styles from "./Aviso.module.css";

// tipo: "erro" (padrão) ou "sucesso"
function Aviso({ tipo = "erro", children }) {
  return (
    <p className={`${styles["aviso"]} ${styles[tipo]}`} role="alert">
      {children}
    </p>
  );
}

export default Aviso;

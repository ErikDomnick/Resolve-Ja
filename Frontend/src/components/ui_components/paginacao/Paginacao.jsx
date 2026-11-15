import styles from "./Paginacao.module.css";

function Paginacao({ pagina, totalPaginas, aoMudar }) {
  if (totalPaginas <= 1) return null;

  return (
    <div className={styles["paginacao"]}>
      <button disabled={pagina <= 1} onClick={() => aoMudar(pagina - 1)}>
        Anterior
      </button>
      <span>
        Página {pagina} de {totalPaginas}
      </span>
      <button disabled={pagina >= totalPaginas} onClick={() => aoMudar(pagina + 1)}>
        Próxima
      </button>
    </div>
  );
}

export default Paginacao;

import styles from "./ItemUsuario.module.css";

function ItemUsuario({ usuario, aoEditar, aoExcluir }) {
  const total = usuario._count.ocorrencias;

  return (
    <li className={styles["item"]}>
      <div className={styles["info"]}>
        <strong>{usuario.nome}</strong>
        <span className={styles["detalhe"]}>
          {usuario.email} - {usuario.telefone}
        </span>
        <span className={styles["detalhe"]}>
          {total} {total === 1 ? "ocorrência" : "ocorrências"}
        </span>
      </div>

      <div className={styles["botoes"]}>
        <button onClick={() => aoEditar(usuario)}>Editar</button>
        <button className={styles["excluir"]} onClick={() => aoExcluir(usuario)}>
          Excluir
        </button>
      </div>
    </li>
  );
}

export default ItemUsuario;

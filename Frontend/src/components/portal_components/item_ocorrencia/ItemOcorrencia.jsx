import { useState } from "react";
import styles from "./ItemOcorrencia.module.css";
import Selo from "../../ui_components/selo/Selo";
import { STATUS, PRIORIDADES } from "../../../utils/constantes";
import { formatarData, linkMapa } from "../../../utils/format";

// Quem guarda a lista é o painel; este item só avisa o que o usuário fez (aoAtualizar / aoExcluir)
function ItemOcorrencia({ ocorrencia, aoAtualizar, aoExcluir }) {
  const [aberto, setAberto] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const mudar = async (campo, valor) => {
    setSalvando(true);
    await aoAtualizar(ocorrencia.id, { [campo]: valor });
    setSalvando(false);
  };

  const excluir = () => {
    if (window.confirm(`Excluir a ocorrência #${ocorrencia.id}? Essa ação não pode ser desfeita.`)) {
      aoExcluir(ocorrencia.id);
    }
  };

  return (
    <li className={styles["item"]}>
      <div className={styles["topo"]}>
        <strong className={styles["titulo"]}>
          #{ocorrencia.id} - {ocorrencia.categoria}
        </strong>
        <Selo tipo="status" valor={ocorrencia.status} />
        <Selo tipo="prioridade" valor={ocorrencia.prioridade} />
      </div>

      <span className={styles["detalhe"]}>
        {formatarData(ocorrencia.createdAt)} - {ocorrencia.user.nome}
      </span>

      <div className={styles["controles"]}>
        <label>
          Status
          <select value={ocorrencia.status} disabled={salvando} onChange={(e) => mudar("status", e.target.value)}>
            {STATUS.map((s) => (
              <option key={s.valor} value={s.valor}>
                {s.rotulo}
              </option>
            ))}
          </select>
        </label>

        <label>
          Prioridade
          <select value={ocorrencia.prioridade} disabled={salvando} onChange={(e) => mudar("prioridade", e.target.value)}>
            {PRIORIDADES.map((p) => (
              <option key={p.valor} value={p.valor}>
                {p.rotulo}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className={styles["secundario"]} onClick={() => setAberto(!aberto)}>
          {aberto ? "Ocultar" : "Detalhes"}
        </button>
        <button type="button" className={styles["excluir"]} onClick={excluir}>
          Excluir
        </button>
      </div>

      {aberto && (
        <div className={styles["detalhes"]}>
          <p className={styles["descricao"]}>{ocorrencia.descricao}</p>
          <p>
            <strong>Contato:</strong> {ocorrencia.user.nome} - {ocorrencia.user.email} - {ocorrencia.user.telefone}
          </p>
          <p>
            <strong>Local:</strong>{" "}
            <a href={linkMapa(ocorrencia.latitude, ocorrencia.longitude)} target="_blank" rel="noreferrer">
              {ocorrencia.latitude}, {ocorrencia.longitude} (abrir no mapa)
            </a>
          </p>
          {ocorrencia.imagem && <img src={ocorrencia.imagem} alt={`Foto da ocorrência ${ocorrencia.id}`} className={styles["foto"]} />}
        </div>
      )}
    </li>
  );
}

export default ItemOcorrencia;

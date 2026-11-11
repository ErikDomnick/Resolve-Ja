import { useState } from "react";
import styles from "./Filtros.module.css";
import { STATUS, PRIORIDADES } from "../../../utils/constantes";

// Os filtros "moram" no painel (lifting state up): aqui só mostramos e avisamos por aoMudar
function Filtros({ filtros, aoMudar }) {
  const [busca, setBusca] = useState(filtros.search);

  const buscar = (e) => {
    e.preventDefault();
    aoMudar({ ...filtros, search: busca.trim(), page: 1 });
  };

  return (
    <div className={styles["filtros"]}>
      <label>
        Status
        <select value={filtros.status} onChange={(e) => aoMudar({ ...filtros, status: e.target.value, page: 1 })}>
          <option value="">Todos</option>
          {STATUS.map((s) => (
            <option key={s.valor} value={s.valor}>
              {s.rotulo}
            </option>
          ))}
        </select>
      </label>

      <label>
        Prioridade
        <select value={filtros.prioridade} onChange={(e) => aoMudar({ ...filtros, prioridade: e.target.value, page: 1 })}>
          <option value="">Todas</option>
          {PRIORIDADES.map((p) => (
            <option key={p.valor} value={p.valor}>
              {p.rotulo}
            </option>
          ))}
        </select>
      </label>

      <form onSubmit={buscar} className={styles["busca"]}>
        <label>
          Buscar na descrição
          <input type="text" value={busca} onChange={(e) => setBusca(e.target.value)} />
        </label>
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Filtros;

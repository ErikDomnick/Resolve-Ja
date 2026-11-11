import { useState, useEffect } from "react";
import styles from "./PortalPainel.module.css";
import Resumo from "../../components/portal_components/resumo/Resumo";
import Filtros from "../../components/portal_components/filtros/Filtros";
import ItemOcorrencia from "../../components/portal_components/item_ocorrencia/ItemOcorrencia";
import Paginacao from "../../components/ui_components/paginacao/Paginacao";
import Aviso from "../../components/ui_components/aviso/Aviso";
import useTitulo from "../../hooks/useTitulo";
import { getOcorrencias, updateOcorrencia, deleteOcorrencia } from "../../services/ocorrenciaService";
import { getResumo } from "../../services/adminService";

const FILTROS_INICIAIS = { status: "", prioridade: "", search: "", page: 1, limit: 10 };

function PortalPainel() {
  useTitulo("Painel");

  const [resumo, setResumo] = useState(null);
  const [ocorrencias, setOcorrencias] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1 });
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Busca a lista sempre que os filtros (ou a página) mudam
  useEffect(() => {
    let ativo = true;

    getOcorrencias(filtros)
      .then((res) => {
        if (!ativo) return;
        setOcorrencias(res.data);
        setMeta(res.meta);
        setErro("");
      })
      .catch((err) => ativo && setErro(err.message))
      .finally(() => ativo && setCarregando(false));

    return () => {
      ativo = false;
    };
  }, [filtros]);

  // Resumo (cartões e gráficos): carrega uma vez, e de novo depois de editar/excluir
  useEffect(() => {
    getResumo()
      .then(setResumo)
      .catch((err) => setErro(err.message));
  }, []);

  const atualizarResumo = () => {
    getResumo()
      .then(setResumo)
      .catch(() => {});
  };

  const mudarFiltros = (novos) => {
    setCarregando(true);
    setFiltros(novos);
  };

  // Chamada pelo ItemOcorrencia: troca só o item que mudou (map + spread)
  const atualizar = async (id, dados) => {
    try {
      const atualizada = await updateOcorrencia(id, dados);
      setOcorrencias((atual) => atual.map((o) => (o.id === id ? atualizada : o)));
      setErro("");
      atualizarResumo();
    } catch (err) {
      setErro(err.message);
    }
  };

  const excluir = async (id) => {
    try {
      await deleteOcorrencia(id);
      setOcorrencias((atual) => atual.filter((o) => o.id !== id));
      setMeta((atual) => ({ ...atual, total: atual.total - 1 }));
      setErro("");
      atualizarResumo();
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <>
      <section className={styles["section-resumo"]}>
        <h1>Resumo</h1>
        <hr />
        {resumo ? <Resumo resumo={resumo} /> : <p className={styles["vazio"]}>Carregando resumo...</p>}
      </section>

      <section className={styles["section-lista"]}>
        <h1>Ocorrências ({meta.total})</h1>
        <hr />
        <Filtros filtros={filtros} aoMudar={mudarFiltros} />
        {erro && <Aviso>{erro}</Aviso>}

        {carregando ? (
          <p className={styles["vazio"]}>Carregando...</p>
        ) : ocorrencias.length === 0 ? (
          <p className={styles["vazio"]}>Nenhuma ocorrência encontrada.</p>
        ) : (
          <ul>
            {ocorrencias.map((o) => (
              <ItemOcorrencia key={o.id} ocorrencia={o} aoAtualizar={atualizar} aoExcluir={excluir} />
            ))}
          </ul>
        )}

        <Paginacao pagina={meta.page} totalPaginas={meta.totalPages} aoMudar={(page) => mudarFiltros({ ...filtros, page })} />
      </section>
    </>
  );
}

export default PortalPainel;

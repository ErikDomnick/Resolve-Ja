import { useState } from "react";
import styles from "./Relatar.module.css";
import FormOcorrencia from "../../components/relatar_components/form_ocorrencia/FormOcorrencia";
import OcorrenciaEnviada from "../../components/relatar_components/ocorrencia_enviada/OcorrenciaEnviada";
import useTitulo from "../../hooks/useTitulo";
import useLocalStorage from "../../hooks/useLocalStorage";
import { createOcorrencia } from "../../services/ocorrenciaService";
import { CHAVE_MINHAS, CHAVE_CONTATO } from "../../utils/constantes";

function Relatar() {
  useTitulo("Relatar problema");

  // O que fica guardado neste aparelho: contato (para não digitar de novo) e as ocorrências já enviadas
  const [contato, setContato] = useLocalStorage(CHAVE_CONTATO, { nome: "", email: "", telefone: "" });
  const [minhas, setMinhas] = useLocalStorage(CHAVE_MINHAS, []);
  const [enviada, setEnviada] = useState(null);

  // Se der erro, o FormOcorrencia mostra a mensagem (ele captura o erro lançado aqui)
  const salvar = async (dados) => {
    const ocorrencia = await createOcorrencia(dados);

    setContato({ nome: dados.nome, email: dados.email, telefone: dados.telefone });
    setMinhas([{ id: ocorrencia.id, email: dados.email, categoria: ocorrencia.categoria, criadaEm: ocorrencia.createdAt }, ...minhas]);
    setEnviada(ocorrencia);
  };

  return (
    <section className={styles["section-relatar"]}>
      <h1>Relatar problema</h1>
      <hr />
      {enviada ? <OcorrenciaEnviada ocorrencia={enviada} aoNovaOcorrencia={() => setEnviada(null)} /> : <FormOcorrencia contatoSalvo={contato} aoSalvar={salvar} />}
    </section>
  );
}

export default Relatar;

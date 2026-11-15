import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Acompanhar.module.css";
import FormAcompanhar from "../../components/acompanhar_components/form_acompanhar/FormAcompanhar";
import ResultadoOcorrencia from "../../components/acompanhar_components/resultado_ocorrencia/ResultadoOcorrencia";
import ItemSalvo from "../../components/acompanhar_components/item_salvo/ItemSalvo";
import Aviso from "../../components/ui_components/aviso/Aviso";
import useTitulo from "../../hooks/useTitulo";
import useLocalStorage from "../../hooks/useLocalStorage";
import { acompanharOcorrencia } from "../../services/ocorrenciaService";
import { CHAVE_MINHAS } from "../../utils/constantes";

function Acompanhar() {
  useTitulo("Acompanhar");

  // /acompanhar?id=12&email=maria@email.com preenche o formulário (query params)
  const [params] = useSearchParams();
  const [minhas, setMinhas] = useLocalStorage(CHAVE_MINHAS, []);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const consultar = async (id, email) => {
    setCarregando(true);
    setErro("");
    setResultado(null);

    try {
      setResultado(await acompanharOcorrencia(id, email));
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  const esquecer = (id) => {
    setMinhas(minhas.filter((m) => m.id !== id));
  };

  return (
    <>
      <section className={styles["section-consulta"]}>
        <h1>Acompanhar ocorrência</h1>
        <hr />
        <FormAcompanhar idInicial={params.get("id") ?? ""} emailInicial={params.get("email") ?? ""} carregando={carregando} aoConsultar={consultar} />
        {erro && <Aviso>{erro}</Aviso>}
        {resultado && <ResultadoOcorrencia ocorrencia={resultado} />}
      </section>

      <section className={styles["section-salvas"]}>
        <h1>Enviadas neste aparelho</h1>
        <hr />
        {minhas.length === 0 ? (
          <p className={styles["vazio"]}>Nenhuma ocorrência enviada por aqui ainda.</p>
        ) : (
          <ul>
            {minhas.map((item) => (
              <ItemSalvo key={item.id} item={item} aoConsultar={consultar} aoRemover={esquecer} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default Acompanhar;

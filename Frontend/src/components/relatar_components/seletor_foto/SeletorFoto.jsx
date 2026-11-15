import { useState } from "react";
import styles from "./SeletorFoto.module.css";
import { arquivoParaDataUrl } from "../../../utils/imagem";
import Aviso from "../../ui_components/aviso/Aviso";

// A foto escolhida sobe para o formulário (lifting state up) por aoEscolher(dataUrl)
function SeletorFoto({ foto, aoEscolher, aoRemover }) {
  const [erro, setErro] = useState("");

  const escolher = async (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    try {
      setErro("");
      aoEscolher(await arquivoParaDataUrl(arquivo));
    } catch (err) {
      setErro(err.message);
    }
    e.target.value = "";
  };

  return (
    <div className={styles["seletor-foto"]}>
      <label>
        Foto do problema (opcional)
        <input type="file" accept="image/*" onChange={escolher} />
      </label>

      {foto && (
        <div className={styles["previa"]}>
          <img src={foto} alt="Prévia da foto escolhida" />
          <button type="button" onClick={aoRemover}>
            Remover foto
          </button>
        </div>
      )}

      {erro && <Aviso>{erro}</Aviso>}
    </div>
  );
}

export default SeletorFoto;

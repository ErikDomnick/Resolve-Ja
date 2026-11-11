/* FormOcorrencia é o formulário controlado do relato.
Ele valida os campos (as mesmas regras do back-end) antes de chamar aoSalvar. */

import { useState } from "react";
import styles from "./FormOcorrencia.module.css";
import SeletorFoto from "../seletor_foto/SeletorFoto";
import Aviso from "../../ui_components/aviso/Aviso";
import { CATEGORIAS_SUGERIDAS, COORDENADA_PADRAO } from "../../../utils/constantes";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// contatoSalvo: nome/e-mail/telefone usados no último relato (vêm do localStorage)
function FormOcorrencia({ contatoSalvo, aoSalvar }) {
  const [nome, setNome] = useState(contatoSalvo.nome);
  const [email, setEmail] = useState(contatoSalvo.email);
  const [telefone, setTelefone] = useState(contatoSalvo.telefone);
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [latitude, setLatitude] = useState(String(COORDENADA_PADRAO.latitude));
  const [longitude, setLongitude] = useState(String(COORDENADA_PADRAO.longitude));
  const [imagem, setImagem] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [buscandoLocal, setBuscandoLocal] = useState(false);

  const usarMinhaLocalizacao = () => {
    if (!navigator.geolocation) {
      setErro("Seu navegador não permite obter a localização.");
      return;
    }

    setBuscandoLocal(true);
    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        setLatitude(posicao.coords.latitude.toFixed(6));
        setLongitude(posicao.coords.longitude.toFixed(6));
        setErro("");
        setBuscandoLocal(false);
      },
      () => {
        setErro("Não consegui pegar sua localização. Digite a latitude e a longitude.");
        setBuscandoLocal(false);
      },
    );
  };

  const enviar = async (e) => {
    e.preventDefault();

    // 1) Campos de texto
    if (nome.trim().length < 2) return setErro("Informe seu nome.");
    if (!REGEX_EMAIL.test(email.trim())) return setErro("Informe um e-mail válido.");
    if (telefone.trim().length < 8) return setErro("Informe um telefone válido, com DDD.");
    if (categoria.trim().length < 2) return setErro("Informe a categoria do problema.");
    if (descricao.trim().length < 10) return setErro("Descreva melhor o problema (mínimo de 10 caracteres).");

    // 2) Coordenadas
    const lat = Number(latitude);
    const lng = Number(longitude);
    if (latitude.trim() === "" || Number.isNaN(lat) || lat < -90 || lat > 90) return setErro("A latitude deve ser um número entre -90 e 90.");
    if (longitude.trim() === "" || Number.isNaN(lng) || lng < -180 || lng > 180) return setErro("A longitude deve ser um número entre -180 e 180.");

    setErro("");
    setEnviando(true);

    try {
      await aoSalvar({
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        telefone: telefone.trim(),
        categoria: categoria.trim(),
        descricao: descricao.trim(),
        latitude: lat,
        longitude: lng,
        ...(imagem && { imagem }),
      });
    } catch (err) {
      setErro(err.message);
      setEnviando(false);
    }
  };

  return (
    // noValidate: desliga as mensagens automáticas do navegador para aparecer a nossa
    <form onSubmit={enviar} noValidate className={styles["form-ocorrencia"]}>
      <h2>Seus dados</h2>
      <label>
        Nome
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>

      <div className={styles["linha"]}>
        <label>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Telefone
          <input type="tel" placeholder="46999990000" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </label>
      </div>

      <h2>O problema</h2>
      <label>
        Categoria
        <input type="text" list="categorias" placeholder="Ex.: Buraco na via" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        <datalist id="categorias">
          {CATEGORIAS_SUGERIDAS.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </label>

      <label>
        Descrição
        <textarea rows="4" placeholder="Conte o que está acontecendo e onde fica" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </label>

      <div className={styles["linha"]}>
        <label>
          Latitude
          <input type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        </label>
        <label>
          Longitude
          <input type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        </label>
      </div>
      <button type="button" className={styles["botao-local"]} onClick={usarMinhaLocalizacao} disabled={buscandoLocal}>
        {buscandoLocal ? "Buscando..." : "Usar minha localização"}
      </button>

      <SeletorFoto foto={imagem} aoEscolher={setImagem} aoRemover={() => setImagem("")} />

      {erro && <Aviso>{erro}</Aviso>}

      <button type="submit" className={styles["botao-enviar"]} disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar relato"}
      </button>
    </form>
  );
}

export default FormOcorrencia;

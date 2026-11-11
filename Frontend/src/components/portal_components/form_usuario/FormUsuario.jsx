import { useState, useEffect, useRef } from "react";
import styles from "./FormUsuario.module.css";
import Aviso from "../../ui_components/aviso/Aviso";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Serve para criar e para editar: se usuarioEditando existir, os campos já vêm preenchidos
function FormUsuario({ usuarioEditando, aoSalvar, aoCancelar }) {
  const [nome, setNome] = useState(usuarioEditando ? usuarioEditando.nome : "");
  const [email, setEmail] = useState(usuarioEditando ? usuarioEditando.email : "");
  const [telefone, setTelefone] = useState(usuarioEditando ? usuarioEditando.telefone : "");
  const [erro, setErro] = useState("");

  const nomeRef = useRef(null);

  useEffect(() => {
    if (usuarioEditando) nomeRef.current.focus();
  }, [usuarioEditando]);

  const enviar = async (e) => {
    e.preventDefault();

    if (nome.trim().length < 2) return setErro("Informe o nome.");
    if (!REGEX_EMAIL.test(email.trim())) return setErro("Informe um e-mail válido.");
    if (telefone.trim().length < 8) return setErro("Informe um telefone válido.");

    try {
      await aoSalvar({ nome: nome.trim(), email: email.trim().toLowerCase(), telefone: telefone.trim() });
      setErro("");

      if (!usuarioEditando) {
        setNome("");
        setEmail("");
        setTelefone("");
      }
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <form onSubmit={enviar} noValidate className={styles["form-usuario"]}>
      <h2>{usuarioEditando ? "Editar cidadão" : "Novo cidadão"}</h2>

      <label>
        Nome
        <input ref={nomeRef} type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <label>
        E-mail
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Telefone
        <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      </label>

      <div className={styles["botoes-form"]}>
        <button type="submit">{usuarioEditando ? "Salvar" : "Cadastrar"}</button>
        {usuarioEditando && (
          <button type="button" onClick={aoCancelar}>
            Cancelar
          </button>
        )}
      </div>

      {erro && <Aviso>{erro}</Aviso>}
    </form>
  );
}

export default FormUsuario;

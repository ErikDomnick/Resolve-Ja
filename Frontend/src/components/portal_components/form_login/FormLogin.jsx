import { useState } from "react";
import styles from "./FormLogin.module.css";
import Aviso from "../../ui_components/aviso/Aviso";

function FormLogin({ aoEntrar }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [entrando, setEntrando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || senha === "") {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    setErro("");
    setEntrando(true);

    try {
      await aoEntrar(email.trim(), senha);
    } catch (err) {
      setErro(err.message);
      setEntrando(false);
    }
  };

  return (
    <form onSubmit={enviar} noValidate className={styles["form-login"]}>
      <label>
        E-mail
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Senha
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </label>

      <button type="submit" disabled={entrando}>
        {entrando ? "Entrando..." : "Entrar"}
      </button>

      {erro && <Aviso>{erro}</Aviso>}
    </form>
  );
}

export default FormLogin;

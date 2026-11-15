import { Navigate } from "react-router-dom";
import styles from "./PortalLogin.module.css";
import FormLogin from "../../components/portal_components/form_login/FormLogin";
import useTitulo from "../../hooks/useTitulo";
import { loginAdmin } from "../../services/adminService";
import { salvarToken } from "../../services/api";

// token e aoEntrar vêm do App (é lá que mora o estado de login)
function PortalLogin({ token, aoEntrar }) {
  useTitulo("Portal Restrito");

  // Já está logado? Vai direto para o painel
  if (token) return <Navigate to="/portal/painel" replace />;

  const entrar = async (email, senha) => {
    const { token: novoToken } = await loginAdmin(email, senha);
    salvarToken(novoToken);
    aoEntrar(novoToken);
  };

  return (
    <section className={styles["section-login"]}>
      <h1>Portal Restrito</h1>
      <hr />
      <p className={styles["texto"]}>Acesso exclusivo da equipe da prefeitura.</p>
      <FormLogin aoEntrar={entrar} />
    </section>
  );
}

export default PortalLogin;

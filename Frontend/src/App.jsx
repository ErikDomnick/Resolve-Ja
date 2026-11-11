import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";

//import css
import styles from "./App.module.css";

//imports pages
import Home from "./pages/home_page/Home";
import Relatar from "./pages/relatar/Relatar";
import Acompanhar from "./pages/acompanhar/Acompanhar";
import PortalLogin from "./pages/portal_login/PortalLogin";
import PortalPainel from "./pages/portal_painel/PortalPainel";
import PortalUsuarios from "./pages/portal_usuarios/PortalUsuarios";
import NaoEncontrado from "./pages/nao_encontrado/NaoEncontrado";

//imports services
import { lerToken, apagarToken, EVENTO_SESSAO_EXPIRADA } from "./services/api";

// NavLink recebe uma função no className: isActive diz se o link é a página atual
const classeLink = ({ isActive }) => (isActive ? `${styles["botoes-nav"]} ${styles["ativo"]}` : styles["botoes-nav"]);

function App() {
  // O login mora aqui no App porque o menu e as páginas do portal dependem dele (lifting state up)
  const [token, setToken] = useState(lerToken);

  // O api.js avisa por este evento quando a API responde 401 (token vencido)
  useEffect(() => {
    const sessaoExpirou = () => setToken(null);
    window.addEventListener(EVENTO_SESSAO_EXPIRADA, sessaoExpirou);
    return () => window.removeEventListener(EVENTO_SESSAO_EXPIRADA, sessaoExpirou);
  }, []);

  const sair = () => {
    apagarToken();
    setToken(null);
  };

  return (
    <>
      <BrowserRouter>
        <header>
          <h1>Resolve Já</h1>
          <p className={styles["slogan"]}>
            <em>Seu relato, nossa solução</em>
          </p>
          <nav>
            <NavLink to="/" className={classeLink} end>
              Início
            </NavLink>
            <NavLink to="/relatar" className={classeLink}>
              Relatar
            </NavLink>
            <NavLink to="/acompanhar" className={classeLink}>
              Acompanhar
            </NavLink>

            {token ? (
              <>
                <NavLink to="/portal/painel" className={classeLink}>
                  Painel
                </NavLink>
                <NavLink to="/portal/usuarios" className={classeLink}>
                  Cidadãos
                </NavLink>
                <button className={styles["botao-sair"]} onClick={sair}>
                  Sair
                </button>
              </>
            ) : (
              <NavLink to="/portal" className={classeLink}>
                Portal Restrito
              </NavLink>
            )}
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/relatar" element={<Relatar />} />
            <Route path="/acompanhar" element={<Acompanhar />} />
            <Route path="/portal" element={<PortalLogin token={token} aoEntrar={setToken} />} />
            {/* Rotas protegidas: sem token, volta para o login */}
            <Route path="/portal/painel" element={token ? <PortalPainel /> : <Navigate to="/portal" replace />} />
            <Route path="/portal/usuarios" element={token ? <PortalUsuarios /> : <Navigate to="/portal" replace />} />
            <Route path="*" element={<NaoEncontrado />} />
          </Routes>
        </main>

        <footer>
          <p className={styles["p-copyright"]}>&copy; Resolve Já&trade; 2026 - TCC Sudotec - Aprender e Crescer</p>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;

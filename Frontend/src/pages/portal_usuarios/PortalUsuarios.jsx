import { useState, useEffect } from "react";
import styles from "./PortalUsuarios.module.css";
import FormUsuario from "../../components/portal_components/form_usuario/FormUsuario";
import ItemUsuario from "../../components/portal_components/item_usuario/ItemUsuario";
import Aviso from "../../components/ui_components/aviso/Aviso";
import useTitulo from "../../hooks/useTitulo";
import { getUsers, createUser, updateUser, deleteUser } from "../../services/userService";

// CRUD de cidadãos: listar (GET), cadastrar (POST), editar (PUT) e excluir (DELETE)
function PortalUsuarios() {
  useTitulo("Cidadãos");

  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    getUsers()
      .then(setUsuarios)
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    if (editando) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [editando]);

  // Se a API recusar (e-mail repetido, por ex.), o erro sobe para o FormUsuario mostrar
  const salvar = async (dados) => {
    if (editando) {
      const atualizado = await updateUser(editando.id, dados);
      setUsuarios(usuarios.map((u) => (u.id === editando.id ? { ...u, ...atualizado } : u)));
      setEditando(null);
    } else {
      const criado = await createUser(dados);
      setUsuarios([{ ...criado, _count: { ocorrencias: 0 } }, ...usuarios]);
    }
    setErro("");
  };

  const excluir = async (usuario) => {
    if (!window.confirm(`Excluir ${usuario.nome}?`)) return;

    try {
      await deleteUser(usuario.id);
      setUsuarios(usuarios.filter((u) => u.id !== usuario.id));
      if (editando && editando.id === usuario.id) setEditando(null);
      setErro("");
    } catch (err) {
      // ex.: usuário que já tem ocorrências não pode ser excluído
      setErro(err.message);
    }
  };

  return (
    <>
      <section className={styles["section-form"]}>
        <h1>Cidadãos</h1>
        <hr />
        <FormUsuario key={editando ? editando.id : "novo"} usuarioEditando={editando} aoSalvar={salvar} aoCancelar={() => setEditando(null)} />
      </section>

      <section className={styles["section-lista"]}>
        <h1>Cadastrados ({usuarios.length})</h1>
        <hr />
        {erro && <Aviso>{erro}</Aviso>}

        {carregando ? (
          <p className={styles["vazio"]}>Carregando...</p>
        ) : usuarios.length === 0 ? (
          <p className={styles["vazio"]}>Nenhum cidadão cadastrado.</p>
        ) : (
          <ul>
            {usuarios.map((u) => (
              <ItemUsuario key={u.id} usuario={u} aoEditar={setEditando} aoExcluir={excluir} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default PortalUsuarios;

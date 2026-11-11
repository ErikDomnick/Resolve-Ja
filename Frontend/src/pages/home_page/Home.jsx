import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import useTitulo from "../../hooks/useTitulo";

const passos = [
  { id: 1, titulo: "Relate", texto: "Descreva o problema, marque o local e, se quiser, anexe uma foto." },
  { id: 2, titulo: "Guarde o número", texto: "Cada relato recebe um número. Ele fica salvo neste aparelho." },
  { id: 3, titulo: "Acompanhe", texto: "Com o número e o seu e-mail, veja em que etapa está a solução." },
];

function Home() {
  useTitulo("Início");

  return (
    <>
      <section className={styles["section-destaque"]}>
        <h1>Viu um problema na sua cidade?</h1>
        <p>Buracos, lâmpadas queimadas, lixo acumulado... conte para a prefeitura e acompanhe a resolução.</p>
        <div className={styles["botoes"]}>
          <Link to="/relatar">
            <button className={styles["botao-principal"]}>Relatar agora</button>
          </Link>
          <Link to="/acompanhar">
            <button className={styles["botao-secundario"]}>Acompanhar</button>
          </Link>
        </div>
      </section>

      <section className={styles["section-passos"]}>
        <h1>Como funciona</h1>
        <hr />
        <ul className={styles["lista-passos"]}>
          {passos.map((passo) => (
            <li key={passo.id} className={styles["passo"]}>
              <span className={styles["numero"]}>{passo.id}</span>
              <h2>{passo.titulo}</h2>
              <p>{passo.texto}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Home;

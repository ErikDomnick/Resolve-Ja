import { useEffect } from "react";

const NOME_SITE = "Resolve Já";

function useTitulo(titulo) {
  useEffect(() => {
    document.title = `${titulo} | ${NOME_SITE}`;
  }, [titulo]);
}

export default useTitulo;

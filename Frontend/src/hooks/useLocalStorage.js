import { useState, useEffect } from "react";

// Igual ao useState, mas guarda o valor no localStorage (e lê de volta ao abrir a página).
// O try/catch evita quebrar quando o navegador bloqueia o localStorage (modo privado, por ex.).
function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave);
      return salvo ? JSON.parse(salvo) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      // sem espaço ou bloqueado: o app continua funcionando, só não guarda
    }
  }, [chave, valor]);

  return [valor, setValor];
}

export default useLocalStorage;

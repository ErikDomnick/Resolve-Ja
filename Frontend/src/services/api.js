const API_URL = import.meta.env.VITE_API_URL;

export const CHAVE_TOKEN = "resolveja-token";
export const EVENTO_SESSAO_EXPIRADA = "resolveja:sessao-expirada";

export const lerToken = () => {
  try {
    return localStorage.getItem(CHAVE_TOKEN);
  } catch {
    return null;
  }
};

export const salvarToken = (token) => localStorage.setItem(CHAVE_TOKEN, token);
export const apagarToken = () => localStorage.removeItem(CHAVE_TOKEN);

// Monta "?a=1&b=2" ignorando valores vazios (query params)
export function montarQuery(params = {}) {
  const busca = new URLSearchParams();
  Object.entries(params).forEach(([chave, valor]) => {
    if (valor !== undefined && valor !== null && valor !== "") busca.set(chave, valor);
  });
  const texto = busca.toString();
  return texto ? `?${texto}` : "";
}

// auth: true  ->  envia o token do Portal Restrito no header Authorization
export async function request(path, { auth = false, ...options } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) headers.Authorization = `Bearer ${lerToken()}`;

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch {
    throw new Error("Não foi possível conectar ao servidor. Confira se o back-end está rodando.");
  }

  // 204 = sem corpo (DELETE)
  const dados = res.status === 204 ? null : await res.json().catch(() => null);

  if (!res.ok) {
    // token vencido ou inválido: avisa o App para voltar ao login
    if (res.status === 401 && auth) {
      apagarToken();
      window.dispatchEvent(new Event(EVENTO_SESSAO_EXPIRADA));
    }
    const detalhes = Array.isArray(dados?.details) ? dados.details.map((d) => d.mensagem).join(" ") : "";
    throw new Error([dados?.error || `Erro ${res.status} em ${path}`, detalhes].filter(Boolean).join(": "));
  }

  return dados;
}

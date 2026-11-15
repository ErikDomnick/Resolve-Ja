// Mesmos valores do back-end (Backend/src/lib/constants.js)
export const STATUS = [
  { valor: "ABERTA", rotulo: "Aberta" },
  { valor: "EM_ANALISE", rotulo: "Em análise" },
  { valor: "EM_ANDAMENTO", rotulo: "Em andamento" },
  { valor: "RESOLVIDA", rotulo: "Resolvida" },
  { valor: "REJEITADA", rotulo: "Rejeitada" },
];

export const PRIORIDADES = [
  { valor: "BAIXA", rotulo: "Baixa" },
  { valor: "MEDIA", rotulo: "Média" },
  { valor: "ALTA", rotulo: "Alta" },
];

// A categoria é texto livre no banco; estas são só sugestões para o formulário
export const CATEGORIAS_SUGERIDAS = ["Buraco na via", "Iluminação pública", "Coleta de lixo", "Vazamento de água", "Esgoto a céu aberto", "Árvore caída", "Sinalização", "Calçada danificada", "Outros"];

// Ponto de partida do mapa/coordenadas (Dois Vizinhos - PR)
export const COORDENADA_PADRAO = { latitude: -25.7447, longitude: -53.0596 };

export const CHAVE_MINHAS = "resolveja-minhas-ocorrencias";
export const CHAVE_CONTATO = "resolveja-contato";

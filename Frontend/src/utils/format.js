import { STATUS, PRIORIDADES } from "./constantes";

export const rotuloStatus = (valor) => STATUS.find((s) => s.valor === valor)?.rotulo ?? valor;

export const rotuloPrioridade = (valor) => PRIORIDADES.find((p) => p.valor === valor)?.rotulo ?? valor;

export function formatarData(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

export const linkMapa = (latitude, longitude) => `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}`;

import { request, montarQuery } from "./api";

// Público (não precisa de login)
export const createOcorrencia = (dados) => request("/api/ocorrencias", { method: "POST", body: JSON.stringify(dados) });

export const acompanharOcorrencia = (id, email) => request(`/api/ocorrencias/${id}/acompanhar${montarQuery({ email })}`);

// Portal Restrito (exigem token)
export const getOcorrencias = (filtros) => request(`/api/ocorrencias${montarQuery(filtros)}`, { auth: true });

export const updateOcorrencia = (id, dados) => request(`/api/ocorrencias/${id}`, { method: "PUT", body: JSON.stringify(dados), auth: true });

export const deleteOcorrencia = (id) => request(`/api/ocorrencias/${id}`, { method: "DELETE", auth: true });

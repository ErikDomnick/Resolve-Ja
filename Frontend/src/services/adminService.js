import { request } from "./api";

export const loginAdmin = (email, password) => request("/api/admin/login", { method: "POST", body: JSON.stringify({ email, password }) });

export const getResumo = () => request("/api/relatorios/resumo", { auth: true });

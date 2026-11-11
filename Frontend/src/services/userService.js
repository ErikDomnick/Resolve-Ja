import { request } from "./api";

export const getUsers = () => request("/api/users", { auth: true });

export const createUser = (data) => request("/api/users", { method: "POST", body: JSON.stringify(data), auth: true });

export const updateUser = (id, data) => request(`/api/users/${id}`, { method: "PUT", body: JSON.stringify(data), auth: true });

export const deleteUser = (id) => request(`/api/users/${id}`, { method: "DELETE", auth: true });

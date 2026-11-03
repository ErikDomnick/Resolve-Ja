import { request } from "./api";

export const getUsers = () => request("/api/users");

export const createUser = (data) =>
  request("/api/users", { method: "POST", body: JSON.stringify(data) });
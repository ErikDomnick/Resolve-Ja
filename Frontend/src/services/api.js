const API_URL = import.meta.env.VITE_API_URL;

export async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Erro ${res.status} em ${path}`);
  return res.json();
}
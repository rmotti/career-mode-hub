// src/services/authService.js
const API_URL = "http://localhost:5000/api/users";

export async function register(userName, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro ao registrar');

  // Salva token e usuário
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data; // 🔹 Retorna tudo (token + user)
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok && data.token) {
    // Salva token e usuário com os mesmos nomes usados no saveService
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data; // 🔹 Retorna { message, token, user }
  } else {
    throw new Error(data.message || 'Erro no login');
  }
}

export function getToken() {
  return localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

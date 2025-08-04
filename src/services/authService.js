// src/services/authService.js
export async function register(userName, email, password) {
  const res = await fetch('http://localhost:5000/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro ao registrar');

  return data.user;
}

export async function login(email, password) {
  const res = await fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok && data.token) {
    localStorage.setItem('authToken', data.token); // 🔹 Salva o token
    localStorage.setItem('user', JSON.stringify(data.user)); // 🔹 Salva o usuário
    return data.user;
  } else {
    throw new Error(data.message || 'Erro no login');
  }
}

export function getToken() {
  return localStorage.getItem('authToken');
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
}

// src/services/authService.js
import api from './api';

export async function register(userName, email, password) {
  const { data } = await api.post('/users/register', { userName, email, password });

  // Salva token e usuário
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data; // { message, token, user }
}

export async function login(email, password) {
  const { data } = await api.post('/users/login', { email, password });

  // Salva token e usuário
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data; // { message, token, user }
}

export function getToken() {
  return localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

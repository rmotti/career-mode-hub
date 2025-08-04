import axios from "axios";

const API_URL = "http://localhost:5000/api/saves"; //https://career-mode-hub-backend.onrender.com/api/saves

// Adiciona token automaticamente
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getSaves = () => axios.get(API_URL, authHeader());

export const createSave = (data) => axios.post(API_URL, data, authHeader());

export const updateSave = (id, data) => axios.put(`${API_URL}/${id}`, data, authHeader());

export const deleteSave = (id) => axios.delete(`${API_URL}/${id}`, authHeader());

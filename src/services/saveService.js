// src/services/saveService.js
import api from './api';

export const getSaves = () => api.get('/saves');

export const createSave = (data) => api.post('/saves', data);

export const updateSave = (id, data) => api.put(`/saves/${id}`, data);

export const deleteSave = (id) => api.delete(`/saves/${id}`);

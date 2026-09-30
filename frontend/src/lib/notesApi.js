import { api } from './api';

export async function fetchNotes(page = 1, limit = 12) {
  const response = await api.get('/notes', { page, limit });
  return {
    notes: response.data || [],
    pagination: response.pagination || {
      page: 1,
      limit,
      total: response.data?.length || 0,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },
  };
}

export async function fetchNoteById(id) {
  const response = await api.get(`/notes/${id}`);
  return response.data;
}

export async function createNote(data) {
  const response = await api.post('/notes', data);
  return response.data;
}

export async function updateNote(id, data) {
  const response = await api.put(`/notes/${id}`, data);
  return response.data;
}

export async function deleteNote(id) {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
}

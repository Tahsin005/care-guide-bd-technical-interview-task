import { api } from './api';

export async function fetchAdminUsers({ page = 1, limit = 10, role = '' } = {}) {
  const params = { page, limit };
  if (role && role !== 'all') {
    params.role = role;
  }
  const response = await api.get('/admin/users', params);
  return {
    users: response.data || [],
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

export async function fetchAdminUserById(id) {
  const response = await api.get(`/admin/users/${id}`);
  return response.data;
}

export async function createAdminUser(userData) {
  const response = await api.post('/admin/users', userData);
  return response.data;
}

export async function updateAdminUser(id, userData) {
  const response = await api.put(`/admin/users/${id}`, userData);
  return response.data;
}

export async function deleteAdminUser(id) {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAdminUsers,
  fetchAdminUserById,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from '../lib/adminApi';
import { toast } from 'react-hot-toast';

export function useAdminUsers({ page = 1, limit = 10, role = '' } = {}) {
  return useQuery({
    queryKey: ['admin-users', page, limit, role],
    queryFn: () => fetchAdminUsers({ page, limit, role }),
    placeholderData: (previousData) => previousData,
  });
}

export function useAdminUser(id) {
  return useQuery({
    queryKey: ['admin-user', id],
    queryFn: () => fetchAdminUserById(id),
    enabled: Boolean(id),
  });
}

export function useCreateAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => createAdminUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create user');
    },
  });
}

export function useUpdateAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateAdminUser(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-user', variables.id] });
      toast.success('User updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update user');
    },
  });
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteAdminUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete user');
    },
  });
}

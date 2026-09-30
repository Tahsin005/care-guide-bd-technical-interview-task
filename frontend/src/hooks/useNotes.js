import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchNotes,
  fetchNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../lib/notesApi';
import { toast } from 'react-hot-toast';

export function useNotes(page = 1, limit = 12) {
  return useQuery({
    queryKey: ['notes', page, limit],
    queryFn: () => fetchNotes(page, limit),
    placeholderData: (previousData) => previousData,
  });
}

export function useNote(id) {
  return useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create note');
    },
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateNote(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['note', variables.id] });
      toast.success('Note updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update note');
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete note');
    },
  });
}

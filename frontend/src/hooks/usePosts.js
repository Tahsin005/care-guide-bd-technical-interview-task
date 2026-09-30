import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost } from '../lib/postsApi';
import { toast } from 'react-hot-toast';

export function usePosts({ page = 1, limit = 10 } = {}) {
  return useQuery({
    queryKey: ['posts', page, limit],
    queryFn: () => fetchPosts({ page, limit }),
    placeholderData: (previousData) => previousData,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData) => createPost(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create post');
    },
  });
}

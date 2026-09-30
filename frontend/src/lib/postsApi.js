import { api } from './api';

export async function fetchPosts({ page = 1, limit = 10 } = {}) {
  const response = await api.get('/posts', { page, limit });
  return {
    posts: response.data || [],
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

export async function createPost(postData) {
  const response = await api.post('/posts', postData);
  return response.data;
}

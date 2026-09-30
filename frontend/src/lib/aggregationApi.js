import { api } from './api';

export async function fetchUsersGroupedByInterests() {
  const response = await api.get('/aggregations/users/grouped-by-interests');
  return response.data || [];
}

export async function fetchUserPosts(userId) {
  const response = await api.get(`/aggregations/users/${userId}/posts`);
  return response.data;
}

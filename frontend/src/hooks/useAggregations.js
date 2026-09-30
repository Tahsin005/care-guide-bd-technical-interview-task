import { useQuery } from '@tanstack/react-query';
import {
  fetchUsersGroupedByInterests,
  fetchUserPosts,
} from '../lib/aggregationApi';

export function useUsersGroupedByInterests(enabled = true) {
  return useQuery({
    queryKey: ['aggregations', 'grouped-by-interests'],
    queryFn: fetchUsersGroupedByInterests,
    enabled,
  });
}

export function useUserPosts(userId, enabled = true) {
  return useQuery({
    queryKey: ['aggregations', 'user-posts', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: Boolean(userId) && enabled,
  });
}

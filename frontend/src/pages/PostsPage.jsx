import { useState, useMemo } from 'react';
import { Navbar } from '../components/common/Navbar';
import { usePosts, useCreatePost } from '../hooks/usePosts';
import { PostModal } from '../components/posts/PostModal';
import { Blobatar } from '@blobatar/react';
import {
  Plus,
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

function formatDate(dateString) {
  if (!dateString) return '—';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

export function PostsPage() {
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, isError, refetch } = usePosts({ page, limit });
  const createMutation = useCreatePost();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const posts = useMemo(() => data?.posts || [], [data?.posts]);
  const pagination = data?.pagination || {
    page: 1,
    limit,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const handleOpenCreate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSavePost = async ({ title, content }) => {
    await createMutation.mutateAsync({ title, content });
    handleCloseModal();
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f6f8] text-[#1e293b] flex flex-col selection:bg-[#3d6157] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 space-y-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1e293b]">
              Community Posts
            </h1>
            <p className="mt-1 text-sm text-[#59766e]">
              Explore, discuss, and publish posts with other members.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3d6157] hover:bg-[#34534a] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div>


        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#e6e9ed] shadow-xs space-y-4 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f4f6f8]" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 bg-[#f4f6f8] rounded-md w-32" />
                    <div className="h-3 bg-[#f4f6f8] rounded-md w-44" />
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-5 bg-[#f4f6f8] rounded-md w-2/3" />
                  <div className="h-3.5 bg-[#f4f6f8] rounded-md w-full" />
                  <div className="h-3.5 bg-[#f4f6f8] rounded-md w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="bg-white rounded-3xl p-10 border border-[#e6e9ed] text-center space-y-4 max-w-md mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1e293b]">
                Failed to load posts
              </h3>
              <p className="mt-1 text-xs text-[#59766e]">
                An error occurred while fetching posts from the server.
              </p>
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-4 py-2 bg-[#3d6157] hover:bg-[#34534a] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center space-y-5 border border-[#e6e9ed] shadow-xs max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-[#3d6157]/10 text-[#3d6157] flex items-center justify-center mx-auto">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-[#1e293b]">No posts yet</h3>
              <p className="text-sm text-[#59766e] max-w-sm mx-auto leading-relaxed">
                Be the first to share an insight, story, or article with the community.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3d6157] hover:bg-[#34534a] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Post</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {posts.map((post) => {
                const authorName = post.author?.name || 'Community Member';
                const authorEmail = post.author?.email || '';
                const seed = authorEmail || authorName;

                return (
                  <article
                    key={post._id}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e6e9ed] shadow-xs hover:shadow-md transition-all space-y-4"
                  >

                    <div className="flex items-center justify-between gap-3 border-b border-[#f1f5f9] pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#e6e9ed] shadow-xs">
                          <Blobatar
                            name={seed}
                            size={32}
                            animate="hover"
                            title={authorName}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-xs text-[#1e293b]">
                            {authorName}
                          </p>
                          {authorEmail && (
                            <p className="text-[11px] text-[#59766e]">
                              {authorEmail}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f4f6f8] rounded-full border border-[#e6e9ed] text-[11px] font-medium text-[#59766e]">
                        <Calendar className="w-3 h-3 text-[#59766e]" />
                        {formatDate(post.createdAt)}
                      </span>
                    </div>


                    <div className="space-y-2">
                      <h2 className="text-lg sm:text-xl font-bold text-[#1e293b]">
                        {post.title}
                      </h2>
                      <div
                        className="tiptap text-xs sm:text-sm text-[#334155] leading-relaxed max-w-none pt-1"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    </div>
                  </article>
                );
              })}
            </div>


            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-[#e6e9ed]">
                <p className="text-xs text-[#59766e]">
                  Page {pagination.page} of {pagination.totalPages} ({pagination.total} total posts)
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={!pagination.hasPrevPage}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-[#e6e9ed] rounded-xl text-xs font-semibold text-[#1e293b] hover:bg-[#f4f6f8] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!pagination.hasNextPage}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-[#e6e9ed] rounded-xl text-xs font-semibold text-[#1e293b] hover:bg-[#f4f6f8] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <PostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePost}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}

export default PostsPage;

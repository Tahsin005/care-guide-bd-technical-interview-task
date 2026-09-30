import { X, Calendar, FileText, Loader2 } from 'lucide-react';
import { useUserPosts } from '../../hooks/useAggregations';

function stripHtml(html) {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

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

export function UserPostsModal({ isOpen, onClose, user }) {
  const userId = user?._id;
  const { data, isLoading, isError } = useUserPosts(userId, isOpen);

  if (!isOpen) return null;

  const posts = data?.posts || [];
  const totalPosts = data?.totalPosts ?? posts.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#e6e9ed] flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e6e9ed]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3d6157]/10 text-[#3d6157] flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#1e293b]">
                  {user?.name}'s Posts
                </h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#3d6157]/10 text-[#3d6157] rounded-full">
                  $lookup Aggregation
                </span>
              </div>
              <p className="text-xs text-[#59766e]">
                {user?.email} · {totalPosts} {totalPosts === 1 ? 'post' : 'posts'} found
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#59766e] hover:text-[#1e293b] hover:bg-[#f4f6f8] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        <div className="p-6 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-7 h-7 text-[#3d6157] animate-spin" />
              <p className="text-xs text-[#59766e]">
                Fetching user posts via MongoDB $lookup...
              </p>
            </div>
          ) : isError ? (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center space-y-2">
              <p className="text-xs font-semibold text-red-700">
                Failed to load posts for this user
              </p>
              <p className="text-[11px] text-red-500">
                Ensure the user ID is valid and that you have administrator permissions.
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f4f6f8] text-[#94a3b8] flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#1e293b]">
                No posts published yet
              </p>
              <p className="text-xs text-[#59766e]">
                This user has not created any public posts on the platform.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => {
                const plainText = stripHtml(post.content || '');

                return (
                  <div
                    key={post._id}
                    className="p-4 rounded-2xl border border-[#e6e9ed] bg-[#f8fafc]/50 hover:bg-[#f8fafc] transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-sm text-[#1e293b]">
                        {post.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#59766e] shrink-0 bg-white px-2 py-0.5 rounded-md border border-[#e6e9ed]">
                        <Calendar className="w-3 h-3 text-[#59766e]" />
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-[#59766e] line-clamp-3 leading-relaxed">
                      {plainText || 'No content...'}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>


        <div className="flex items-center justify-end px-6 py-4 border-t border-[#e6e9ed] bg-[#f8fafc]/50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#3d6157] hover:bg-[#34534a] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPostsModal;

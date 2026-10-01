import { Blobatar } from '@blobatar/react';
import { FileText, Calendar, Pencil, Trash2 } from 'lucide-react';

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

export function NotesTable({
  notes = [],
  isAdmin = false,
  currentUserId = null,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-3xl border border-[#e6e9ed] shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e6e9ed] bg-[#f8fafc]/80 text-[#59766e] text-[11px] font-semibold uppercase tracking-wider">
              <th scope="col" className="py-4 pl-6 pr-4">
                Title
              </th>
              {isAdmin && (
                <th scope="col" className="py-4 px-4 whitespace-nowrap">
                  User
                </th>
              )}
              <th scope="col" className="py-4 px-4">
                Preview
              </th>
              <th scope="col" className="py-4 px-4 whitespace-nowrap">
                Last Modified
              </th>
              <th
                scope="col"
                className="py-4 px-4 whitespace-nowrap hidden sm:table-cell"
              >
                Length
              </th>
              <th scope="col" className="py-4 pl-4 pr-6 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9] text-xs">
            {notes.map((note) => {
              const plainText = stripHtml(note?.content || '');
              const displayDate = formatDate(note?.updatedAt || note?.createdAt);
              const owner =
                note?.owner && typeof note.owner === 'object' ? note.owner : null;
              const authorName =
                owner?.name ||
                (typeof note?.owner === 'string' ? 'User' : 'Unknown');
              const authorEmail = owner?.email || '';
              const seed = authorEmail || authorName || 'NoteUser';
              const isSelf = Boolean(
                currentUserId &&
                  (owner?._id === currentUserId ||
                    note?.owner === currentUserId ||
                    owner?.id === currentUserId)
              );

              return (
                <tr
                  key={note._id}
                  onClick={() => onEdit(note)}
                  className="group hover:bg-[#f8fafc] transition-colors cursor-pointer"
                >

                  <td className="py-4 pl-6 pr-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#3d6157]/10 text-[#3d6157] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-[#1e293b] group-hover:text-[#3d6157] transition-colors line-clamp-1 max-w-[180px] sm:max-w-[220px]">
                        {note?.title || 'Untitled Note'}
                      </span>
                    </div>
                  </td>

                  {isAdmin && (
                    <td className="py-4 px-4 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#e6e9ed] shadow-xs">
                          <Blobatar
                            name={seed}
                            size={28}
                            animate="hover"
                            title={authorName}
                          />
                        </div>
                        <div className="min-w-0 max-w-[170px]">
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-xs text-[#1e293b] truncate">
                              {authorName}
                            </p>
                            {isSelf && (
                              <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-[#3d6157]/10 text-[#3d6157] rounded-md shrink-0">
                                You
                              </span>
                            )}
                          </div>
                          {authorEmail && (
                            <p className="text-[10px] text-[#59766e] truncate">
                              {authorEmail}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                  )}

                  <td className="py-4 px-4 align-middle text-[#59766e] max-w-xs md:max-w-md">
                    <p className="line-clamp-2 leading-relaxed">
                      {plainText || <span className="italic text-[#94a3b8]">No content...</span>}
                    </p>
                  </td>


                  <td className="py-4 px-4 align-middle whitespace-nowrap text-[#59766e]">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f4f6f8] rounded-full border border-[#e6e9ed] text-[11px] font-medium">
                      <Calendar className="w-3 h-3 text-[#59766e]" />
                      {displayDate}
                    </span>
                  </td>


                  <td className="py-4 px-4 align-middle whitespace-nowrap text-[#94a3b8] hidden sm:table-cell">
                    <span>{plainText.length} chars</span>
                  </td>


                  <td className="py-4 pl-4 pr-6 align-middle text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(note);
                        }}
                        aria-label="Edit note"
                        className="p-1.5 text-[#59766e] hover:text-[#3d6157] hover:bg-[#3d6157]/10 rounded-xl transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(note);
                        }}
                        aria-label="Delete note"
                        className="p-1.5 text-[#59766e] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NotesTable;

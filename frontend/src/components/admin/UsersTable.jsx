import { Blobatar } from '@blobatar/react';
import { Shield, ShieldAlert, Pencil, Trash2, Calendar } from 'lucide-react';

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

export function UsersTable({ users = [], currentUserId, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-3xl border border-[#e6e9ed] shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e6e9ed] bg-[#f8fafc]/80 text-[#59766e] text-[11px] font-semibold tracking-wider">
              <th scope="col" className="py-4 pl-6 pr-4">
                User
              </th>
              <th scope="col" className="py-4 px-4 whitespace-nowrap">
                Role
              </th>
              <th scope="col" className="py-4 px-4">
                Interests
              </th>
              <th scope="col" className="py-4 px-4 whitespace-nowrap">
                Joined Date
              </th>
              <th scope="col" className="py-4 pl-4 pr-6 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9] text-xs">
            {users.map((u) => {
              const isSelf = u._id === currentUserId;
              const seed = u.email || u.name || 'User';

              return (
                <tr
                  key={u._id}
                  className="hover:bg-[#f8fafc] transition-colors"
                >

                  <td className="py-4 pl-6 pr-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#e6e9ed] shadow-xs">
                        <Blobatar
                          name={seed}
                          size={32}
                          animate="hover"
                          title={u.name}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-[#1e293b] truncate">
                            {u.name}
                          </p>
                          {isSelf && (
                            <span className="px-2 py-0.5 text-[10px] font-medium bg-[#3d6157]/10 text-[#3d6157] rounded-md">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#59766e] truncate">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>


                  <td className="py-4 px-4 align-middle whitespace-nowrap">
                    {u.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-[11px] font-semibold">
                        <ShieldAlert className="w-3 h-3 text-emerald-600" />
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200/80 rounded-full text-[11px] font-semibold">
                        <Shield className="w-3 h-3 text-slate-500" />
                        User
                      </span>
                    )}
                  </td>


                  <td className="py-4 px-4 align-middle max-w-xs">
                    {Array.isArray(u.interests) && u.interests.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {u.interests.map((interest, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 bg-[#f4f6f8] text-[#59766e] rounded-md text-[10px] font-medium border border-[#e6e9ed]"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[#94a3b8] italic text-[11px]">
                        No interests set
                      </span>
                    )}
                  </td>


                  <td className="py-4 px-4 align-middle whitespace-nowrap text-[#59766e]">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f4f6f8] rounded-full border border-[#e6e9ed] text-[11px] font-medium">
                      <Calendar className="w-3 h-3 text-[#59766e]" />
                      {formatDate(u.createdAt)}
                    </span>
                  </td>


                  <td className="py-4 pl-4 pr-6 align-middle text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(u)}
                        aria-label="Edit user"
                        className="p-1.5 text-[#59766e] hover:text-[#3d6157] hover:bg-[#3d6157]/10 rounded-xl transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(u)}
                        disabled={isSelf}
                        title={isSelf ? 'Cannot delete your own account' : 'Delete user'}
                        aria-label="Delete user"
                        className={`p-1.5 rounded-xl transition-colors ${isSelf
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'text-[#59766e] hover:text-red-600 hover:bg-red-50 cursor-pointer'
                          }`}
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

export default UsersTable;

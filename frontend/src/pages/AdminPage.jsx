import { useState, useMemo, useRef, useEffect } from 'react';
import { Navbar } from '../components/common/Navbar';
import { useAuthStore } from '../store/authStore';
import {
  useAdminUsers,
  useCreateAdminUser,
  useUpdateAdminUser,
  useDeleteAdminUser,
} from '../hooks/useAdminUsers';
import { UsersTable } from '../components/admin/UsersTable';
import { UserModal } from '../components/admin/UserModal';
import { UserPostsModal } from '../components/admin/UserPostsModal';
import { InterestsAggregation } from '../components/admin/InterestsAggregation';
import { DeleteConfirmModal } from '../components/notes/DeleteConfirmModal';
import {
  UserPlus,
  Users,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Filter,
  ChevronDown,
  Check,
  Tag,
} from 'lucide-react';

const ROLE_OPTIONS = [
  { value: '', label: 'All Roles' },
  { value: 'admin', label: 'Admins only' },
  { value: 'user', label: 'Regular Users' },
];

export function AdminPage() {
  const { user: currentUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('users');
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const roleDropdownRef = useRef(null);
  const limit = 10;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target)
      ) {
        setIsRoleDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { data, isLoading, isError, refetch } = useAdminUsers({
    page,
    limit,
    role: roleFilter,
  });

  const createMutation = useCreateAdminUser();
  const updateMutation = useUpdateAdminUser();
  const deleteMutation = useDeleteAdminUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [postsUser, setPostsUser] = useState(null);

  const users = useMemo(() => data?.users || [], [data?.users]);
  const pagination = data?.pagination || {
    page: 1,
    limit,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const handleOpenCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (userData) => {
    if (selectedUser && selectedUser._id) {
      await updateMutation.mutateAsync({
        id: selectedUser._id,
        data: userData,
      });
    } else {
      await createMutation.mutateAsync(userData);
    }
    handleCloseModal();
  };

  const handleDeleteRequest = (user) => {
    setUserToDelete(user);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    await deleteMutation.mutateAsync(userToDelete._id);
    setUserToDelete(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f6f8] text-[#1e293b] flex flex-col selection:bg-[#3d6157] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1e293b]">
                Admin Dashboard
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-[#3d6157]/10 text-[#3d6157] rounded-full border border-[#3d6157]/20">
                Admin
              </span>
            </div>
            <p className="mt-1 text-sm text-[#59766e]">
              Manage user accounts, roles, and view MongoDB aggregation analytics.
            </p>
          </div>

          {activeTab === 'users' && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative" ref={roleDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsRoleDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center justify-between gap-2.5 px-5 py-2.5 bg-white hover:bg-[#f8fafc] text-xs font-semibold text-[#1e293b] rounded-xl border border-[#e6e9ed] hover:border-[#3d6157]/40 shadow-xs hover:shadow-md transition-all cursor-pointer min-w-[130px]"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-[#59766e]" />
                    <span>
                      {ROLE_OPTIONS.find((opt) => opt.value === roleFilter)?.label ||
                        'All Roles'}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#59766e] transition-transform duration-200 ${isRoleDropdownOpen ? 'rotate-180 text-[#3d6157]' : ''
                      }`}
                  />
                </button>

                {isRoleDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl border border-[#e6e9ed] shadow-xl p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#94a3b8]">
                      Filter by Role
                    </div>
                    {ROLE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setRoleFilter(opt.value);
                          setPage(1);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${roleFilter === opt.value
                            ? 'bg-[#3d6157]/10 text-[#3d6157]'
                            : 'text-[#1e293b] hover:bg-[#f4f6f8]'
                          }`}
                      >
                        <span>{opt.label}</span>
                        {roleFilter === opt.value && (
                          <Check className="w-3.5 h-3.5 text-[#3d6157]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3d6157] hover:bg-[#34534a] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>New User</span>
              </button>
            </div>
          )}
        </div>


        <div className="flex items-center gap-2 border-b border-[#e6e9ed] pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${activeTab === 'users'
                ? 'bg-[#3d6157] text-white shadow-xs'
                : 'text-[#59766e] hover:text-[#1e293b] hover:bg-white'
              }`}
          >
            User Accounts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('interests')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${activeTab === 'interests'
                ? 'bg-[#3d6157] text-white shadow-xs'
                : 'text-[#59766e] hover:text-[#1e293b] hover:bg-white'
              }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Interests Aggregation</span>
          </button>
        </div>


        {activeTab === 'interests' ? (
          <InterestsAggregation />
        ) : isLoading ? (
          <div className="bg-white rounded-3xl border border-[#e6e9ed] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#e6e9ed] bg-[#f8fafc]/80 text-[#59766e] text-[11px] font-semibold tracking-wider">
                    <th className="py-4 pl-6 pr-4">User</th>
                    <th className="py-4 px-4">Role</th>
                    <th className="py-4 px-4">Interests</th>
                    <th className="py-4 px-4">Joined Date</th>
                    <th className="py-4 pl-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <td className="py-4 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#f4f6f8]" />
                          <div className="space-y-1.5">
                            <div className="h-3.5 bg-[#f4f6f8] rounded-md w-28" />
                            <div className="h-3 bg-[#f4f6f8] rounded-md w-36" />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-6 bg-[#f4f6f8] rounded-full w-18" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-5 bg-[#f4f6f8] rounded-md w-32" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-6 bg-[#f4f6f8] rounded-full w-24" />
                      </td>
                      <td className="py-4 pl-4 pr-6 text-right">
                        <div className="h-6 bg-[#f4f6f8] rounded-md w-14 ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : isError ? (
          <div className="p-10 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1e293b]">
                Failed to load users
              </h3>
              <p className="mt-1 text-xs text-[#59766e]">
                An error occurred while fetching users from the admin API.
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
        ) : users.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center space-y-5 border border-[#e6e9ed] shadow-xs max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-[#3d6157]/10 text-[#3d6157] flex items-center justify-center mx-auto">
              <Users className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-[#1e293b]">No users found</h3>
              <p className="text-sm text-[#59766e] max-w-sm mx-auto leading-relaxed">
                {roleFilter
                  ? `No users match the "${roleFilter}" role filter.`
                  : 'Get started by creating the first user account.'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3d6157] hover:bg-[#34534a] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create User</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <UsersTable
              users={users}
              currentUserId={currentUser?._id}
              onEdit={handleOpenEdit}
              onDelete={handleDeleteRequest}
              onViewPosts={(u) => setPostsUser(u)}
            />

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-[#e6e9ed]">
                <p className="text-xs text-[#59766e]">
                  Page {pagination.page} of {pagination.totalPages} ({pagination.total} total users)
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

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        onSave={handleSaveUser}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <UserPostsModal
        isOpen={Boolean(postsUser)}
        onClose={() => setPostsUser(null)}
        user={postsUser}
      />

      <DeleteConfirmModal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={
          userToDelete
            ? `Are you sure you want to permanently delete user "${userToDelete.name}" (${userToDelete.email})? This action cannot be undone.`
            : ''
        }
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

export default AdminPage;

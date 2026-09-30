import { useState, useRef, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  X,
  Save,
  UserPlus,
  UserCheck,
  Shield,
  ShieldAlert,
  ChevronDown,
  Check,
} from 'lucide-react';
import {
  createAdminUserSchema,
  updateAdminUserSchema,
} from '../../lib/validations/adminUser.schema';

const ROLE_OPTIONS = [
  {
    value: 'user',
    label: 'User',
    description: 'Regular member with standard access',
  },
  {
    value: 'admin',
    label: 'Admin',
    description: 'Full administrative privileges',
  },
];

function UserModalDialog({
  onClose,
  user,
  onSave,
  isLoading,
}) {
  const isEditing = Boolean(user && user._id);
  const [serverError, setServerError] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const roleDropdownRef = useRef(null);

  const schema = isEditing ? updateAdminUserSchema : createAdminUserSchema;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      role: user?.role || 'user',
      interests: Array.isArray(user?.interests) ? user.interests.join(', ') : '',
    },
  });

  const currentRole = useWatch({
    control,
    name: 'role',
    defaultValue: user?.role || 'user',
  });

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

  const onSubmit = async (data) => {
    setServerError('');

    const interests = (data.interests || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      role: data.role,
      interests,
    };

    if (data.password) {
      payload.password = data.password;
    }

    try {
      await onSave(payload);
    } catch (err) {
      setServerError(err?.message || 'Failed to save user');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#e6e9ed] flex flex-col animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e6e9ed]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3d6157]/10 text-[#3d6157] flex items-center justify-center shrink-0">
              {isEditing ? (
                <UserCheck className="w-5 h-5" />
              ) : (
                <UserPlus className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1e293b]">
                {isEditing ? 'Edit User' : 'Create New User'}
              </h2>
              <p className="text-xs text-[#59766e]">
                {isEditing
                  ? 'Update user account information and roles'
                  : 'Add a new member or administrator to the platform'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 text-[#59766e] hover:text-[#1e293b] hover:bg-[#f4f6f8] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {serverError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
              {serverError}
            </div>
          )}


          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1e293b]">
              Full Name
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="e.g. John Doe"
              disabled={isLoading}
              className={`w-full px-3.5 py-2.5 bg-[#f8fafc] rounded-xl border text-xs text-[#1e293b] placeholder:text-[#94a3b8] focus:bg-white outline-hidden transition-all ${errors.name
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-[#e6e9ed] focus:border-[#3d6157] focus:ring-2 focus:ring-[#3d6157]/10'
                }`}
            />
            {errors.name && (
              <p className="text-[11px] text-red-600 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>


          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1e293b]">
              Email Address
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="e.g. john@example.com"
              disabled={isLoading}
              className={`w-full px-3.5 py-2.5 bg-[#f8fafc] rounded-xl border text-xs text-[#1e293b] placeholder:text-[#94a3b8] focus:bg-white outline-hidden transition-all ${errors.email
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-[#e6e9ed] focus:border-[#3d6157] focus:ring-2 focus:ring-[#3d6157]/10'
                }`}
            />
            {errors.email && (
              <p className="text-[11px] text-red-600 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>


          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1e293b]">
              Password {isEditing && <span className="text-[#94a3b8] font-normal">(Leave blank to keep unchanged)</span>}
            </label>
            <input
              type="password"
              {...register('password')}
              placeholder={isEditing ? '••••••••' : 'At least 6 characters'}
              disabled={isLoading}
              className={`w-full px-3.5 py-2.5 bg-[#f8fafc] rounded-xl border text-xs text-[#1e293b] placeholder:text-[#94a3b8] focus:bg-white outline-hidden transition-all ${errors.password
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-[#e6e9ed] focus:border-[#3d6157] focus:ring-2 focus:ring-[#3d6157]/10'
                }`}
            />
            {errors.password && (
              <p className="text-[11px] text-red-600 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>


          <div className="space-y-1.5" ref={roleDropdownRef}>
            <label className="text-xs font-semibold text-[#1e293b] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#59766e]" />
              Role
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen((prev) => !prev)}
                disabled={isLoading}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#f8fafc] hover:bg-white rounded-xl border border-[#e6e9ed] hover:border-[#3d6157]/40 text-xs text-[#1e293b] focus:bg-white focus:border-[#3d6157] focus:ring-2 focus:ring-[#3d6157]/10 outline-hidden transition-all cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  {currentRole === 'admin' ? (
                    <ShieldAlert className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Shield className="w-4 h-4 text-[#59766e]" />
                  )}
                  <span className="font-semibold">
                    {currentRole === 'admin'
                      ? 'Admin (Full administrative privileges)'
                      : 'User (Regular member)'}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#59766e] transition-transform duration-200 ${isRoleDropdownOpen ? 'rotate-180 text-[#3d6157]' : ''
                    }`}
                />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl border border-[#e6e9ed] shadow-xl p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                  {ROLE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setValue('role', opt.value, { shouldValidate: true });
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 text-left rounded-xl transition-all cursor-pointer ${currentRole === opt.value
                          ? 'bg-[#3d6157]/10 text-[#3d6157]'
                          : 'text-[#1e293b] hover:bg-[#f4f6f8]'
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div>
                          <div className="text-xs font-semibold text-[#1e293b]">
                            {opt.label}
                          </div>
                          <p className="text-[11px] text-[#59766e]">
                            {opt.description}
                          </p>
                        </div>
                      </div>
                      {currentRole === opt.value && (
                        <Check className="w-4 h-4 text-[#3d6157] shrink-0 mr-1" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.role && (
              <p className="text-[11px] text-red-600 font-medium">
                {errors.role.message}
              </p>
            )}
          </div>


          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1e293b]">
              Interests <span className="text-[#94a3b8] font-normal">(Comma-separated)</span>
            </label>
            <input
              type="text"
              {...register('interests')}
              placeholder="e.g. Technology, Design, AI, Writing"
              disabled={isLoading}
              className="w-full px-3.5 py-2.5 bg-[#f8fafc] rounded-xl border border-[#e6e9ed] text-xs text-[#1e293b] placeholder:text-[#94a3b8] focus:bg-white focus:border-[#3d6157] focus:ring-2 focus:ring-[#3d6157]/10 outline-hidden transition-all"
            />
          </div>


          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e6e9ed]">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 text-xs font-semibold text-[#59766e] hover:text-[#1e293b] hover:bg-[#f4f6f8] rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#3d6157] hover:bg-[#34534a] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function UserModal({
  isOpen,
  onClose,
  user = null,
  onSave,
  isLoading = false,
}) {
  if (!isOpen) return null;

  return (
    <UserModalDialog
      key={user?._id || 'new-user'}
      onClose={onClose}
      user={user}
      onSave={onSave}
      isLoading={isLoading}
    />
  );
}

export default UserModal;

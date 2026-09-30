import { Trash2, X } from 'lucide-react';

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Note',
  message = 'Are you sure you want to delete this note? This action cannot be undone.',
  isLoading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-[#e6e9ed] space-y-5"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <Trash2 className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 text-[#59766e] hover:text-[#1e293b] hover:bg-[#f4f6f8] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-[#1e293b]">{title}</h3>
          <p className="text-sm text-[#59766e] leading-relaxed">{message}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 text-xs font-semibold text-[#59766e] hover:text-[#1e293b] hover:bg-[#f4f6f8] rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-sm transition-all disabled:opacity-50"
          >
            {isLoading ? 'Deleting...' : 'Delete Note'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;

import { Pencil, Trash2, Calendar } from 'lucide-react';

function stripHtml(html) {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export function NoteCard({ note, onClick, onEdit, onDelete }) {
  const plainText = stripHtml(note?.content || '');
  const displayDate = formatDate(note?.updatedAt || note?.createdAt);

  const handleCardClick = () => {
    if (onClick) onClick(note);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(note);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(note);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-3xl p-6 border border-[#e6e9ed] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[220px]"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-base text-[#1e293b] group-hover:text-[#3d6157] transition-colors line-clamp-1">
            {note?.title || 'Untitled Note'}
          </h3>
          {displayDate && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#59766e] shrink-0 bg-[#f4f6f8] px-2.5 py-1 rounded-full border border-[#e6e9ed]">
              <Calendar className="w-3 h-3 text-[#59766e]" />
              {displayDate}
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-[#59766e] leading-relaxed line-clamp-4 break-words">
          {plainText || 'No content...'}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-[#f1f5f9] flex items-center justify-between">
        <span className="text-[11px] text-[#94a3b8]">
          {plainText.length} characters
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleEditClick}
            aria-label="Edit note"
            className="p-1.5 text-[#59766e] hover:text-[#3d6157] hover:bg-[#3d6157]/10 rounded-xl transition-colors cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            aria-label="Delete note"
            className="p-1.5 text-[#59766e] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
